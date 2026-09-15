/**
 * Slack /code-research slash command relay.
 *
 * Slack requires a response within 3 seconds, and the actual research run takes far
 * longer than that -- so this worker's only job is: verify the request really came from
 * Slack, ack it immediately, and fire a GitHub `repository_dispatch` event that kicks off
 * .github/workflows/code-research.yml in the background. That workflow does the real work
 * and posts the finished report to Slack itself via an Incoming Webhook when done -- this
 * worker is not involved in that second step at all, so there is nothing here that can
 * block waiting on a long-running task.
 *
 * Required secrets (see slack-integration/README.md for how to set these):
 *   SLACK_SIGNING_SECRET  - from the Slack app's "Basic Information" page
 *   GITHUB_TOKEN          - fine-grained PAT, scoped to just this one repo,
 *                           Contents: Read and write (and Actions: Read and write if
 *                           Contents alone gets a 403 from the dispatches endpoint)
 *   GITHUB_REPO           - "owner/repo", e.g. "Unite-Ideas/Code_Researcher"
 */

const MAX_CLOCK_SKEW_SECONDS = 60 * 5;

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const rawBody = await request.text();

    const verified = await verifySlackSignature(request, rawBody, env.SLACK_SIGNING_SECRET);
    if (!verified) {
      return new Response("Signature verification failed", { status: 401 });
    }

    const params = new URLSearchParams(rawBody);
    const text = (params.get("text") || "").trim();
    const userName = params.get("user_name") || "someone";
    const responseUrl = params.get("response_url") || "";

    if (!text) {
      return json({
        response_type: "ephemeral",
        text: "Give me a Google Doc link (shared as \"anyone with the link can view\") or a short description of the project. Example: `/code-research https://docs.google.com/document/d/.../edit`",
      });
    }

    // Fire the dispatch in the background; don't make Slack wait on it.
    ctx.waitUntil(
      dispatchToGitHub(env, { text, user_name: userName, response_url: responseUrl }).catch(
        async (err) => {
          if (responseUrl) {
            await fetch(responseUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                response_type: "ephemeral",
                text: `Could not start the research run: ${err.message}`,
              }),
            });
          }
        }
      )
    );

    return json({
      response_type: "ephemeral",
      text: "On it. Researching applicable codes now -- this usually takes several minutes since it's pulling real code text, not summarizing from memory. I'll post the report in this channel when it's done.",
    });
  },
};

async function verifySlackSignature(request, rawBody, signingSecret) {
  const timestamp = request.headers.get("X-Slack-Request-Timestamp");
  const slackSignature = request.headers.get("X-Slack-Signature");
  if (!timestamp || !slackSignature || !signingSecret) return false;

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > MAX_CLOCK_SKEW_SECONDS) return false;

  const baseString = `v0:${timestamp}:${rawBody}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(signingSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(baseString));
  const computed = "v0=" + [...new Uint8Array(signatureBuffer)].map((b) => b.toString(16).padStart(2, "0")).join("");

  return timingSafeEqual(computed, slackSignature);
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

async function dispatchToGitHub(env, clientPayload) {
  const resp = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/dispatches`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "code-researcher-slack-relay",
    },
    body: JSON.stringify({
      event_type: "code-research",
      client_payload: clientPayload,
    }),
  });

  if (!resp.ok) {
    const detail = await resp.text().catch(() => "");
    throw new Error(`GitHub dispatch failed (${resp.status}): ${detail.slice(0, 300)}`);
  }
}

function json(body) {
  return new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json" },
  });
}
