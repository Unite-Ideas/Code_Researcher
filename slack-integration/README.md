# Slack `/code-research` setup

This wires a Slack slash command straight into the automated pipeline with **no human
approving anything mid-run**. The chain is:

```
Slack /code-research  ->  Cloudflare Worker (worker.js)  ->  GitHub repository_dispatch
      -> .github/workflows/code-research.yml runs the skill headlessly (Claude has no
         Bash/git access at all -- see "How this stays safe" below)
      -> opens a pull request with the results + posts the PR link to Slack
      -> a human reviews and merges it, which publishes the report to GitHub Pages
```

The Worker's only job is proving the request really came from Slack and handing it to
GitHub within Slack's 3-second window. Everything slow (the actual research) happens
afterward in GitHub Actions, which is not time-limited the way a Slack response is, and
posts back to Slack itself when it's done -- so nothing is ever sitting there waiting on a
person to click "allow" mid-run. The one deliberate human checkpoint is at the end: merging
the PR, the same kind of sanity check an architect or engineer would do on this work
anyway.

## 1. Create the Slack app

1. Go to <https://api.slack.com/apps> -> **Create New App** -> From scratch.
2. **Slash Commands** -> Create New Command:
   - Command: `/code-research`
   - Request URL: the Worker URL from step 3 below (you'll circle back and fill this in
     after deploying).
   - Short description: "Research applicable codes for a project"
   - Usage hint: `[Google Doc link or short project description]`
3. **Incoming Webhooks** -> turn on -> **Add New Webhook to Workspace** -> pick the
   channel reports should land in. Copy the webhook URL (`https://hooks.slack.com/...`) --
   this becomes the `SLACK_WEBHOOK_URL` GitHub Actions secret in step 4.
4. **Basic Information** -> copy the **Signing Secret** -- this becomes the Worker's
   `SLACK_SIGNING_SECRET`.
5. Install the app to your workspace.

## 2. Create a scoped GitHub token

Create a **fine-grained personal access token** (Settings -> Developer settings ->
Personal access tokens -> Fine-grained tokens) scoped to **only this repository**:

- Repository access: only `Unite-Ideas/Code_Researcher`
- Permissions: **Contents: Read and write**. If the dispatch call comes back with a 403
  once this is live, also grant **Actions: Read and write** -- GitHub has changed which
  permission covers the dispatches endpoint across API versions.

Scoping it to one repo means this token cannot touch anything else in the org even if it
leaked.

## 3. Deploy the Worker

Requires a Cloudflare account (free tier is enough) and the `wrangler` CLI
(`npm install -g wrangler`).

```bash
cd slack-integration
wrangler login
wrangler secret put SLACK_SIGNING_SECRET   # paste the value from step 1.4
wrangler secret put GITHUB_TOKEN           # paste the token from step 2
wrangler secret put GITHUB_REPO            # literally: Unite-Ideas/Code_Researcher
wrangler deploy
```

`wrangler deploy` prints the Worker's URL (`https://code-research-slack-relay.<your
subdomain>.workers.dev`). Go back to the Slack app's Slash Command config and paste that
in as the Request URL.

## 4. Add GitHub Actions secrets

In the `Unite-Ideas/Code_Researcher` repo settings -> Secrets and variables -> Actions,
add:

- `ANTHROPIC_API_KEY` -- a Claude API key from <https://platform.claude.com>, or use
  `CLAUDE_CODE_OAUTH_TOKEN` instead (generate with `claude setup-token` locally) and
  update `.github/workflows/code-research.yml` to pass `claude_code_oauth_token:` instead
  of `anthropic_api_key:` in the `with:` block.
- `SLACK_WEBHOOK_URL` -- the Incoming Webhook URL from step 1.3.

## 5. Enable GitHub Pages

One-time manual step (there is no API-driven way around this the first time):
repo Settings -> Pages -> Source: **Deploy from a branch** -> Branch: `main`, folder:
`/docs`. Save. Reports will then be live at
`https://unite-ideas.github.io/Code_Researcher/reports/<slug>/`.

## 6. Try it

In Slack: `/code-research https://docs.google.com/document/d/<id>/edit` (the doc must be
shared as "anyone with the link can view" -- the automated run has no Google account of
its own to authenticate as). You should get an immediate ephemeral "on it" reply, and a
message posted to the channel a few minutes later with a link to a **pull request** ready
for review, plus where the report will live on GitHub Pages once that PR is merged.

## How this stays safe to trigger from Slack

Two separate controls, not one:

- **Claude never touches git.** The `claude-code-action` step runs with a scoped
  `--allowedTools` list (`Read,Write,Edit,Glob,Grep,WebFetch,Task`) -- no `Bash`, no git
  credentials of its own. It can only read and write files inside the checkout; it cannot
  run shell commands, call `git`, or reach anything outside that working tree. All git
  work (branching, committing, pushing, opening the PR) happens in the workflow's own
  fixed steps afterward, driven by the repo's own `GITHUB_TOKEN`, never by Claude.
- **Nothing reaches `main` or GitHub Pages without a human merging it.** The workflow
  opens a PR on a throwaway `automation/code-research-<run id>` branch and stops there.
  Someone on the team reviews the findings and citations (the same review an
  architect/engineer would need to do anyway per the skill's own ground rules) and merges
  it when it looks right. Pages only serves what's on `main`, so a bad or incomplete run
  never goes live on its own.

## What's deliberately not here

- **No Google Drive service account.** Feeding it a plain link-shared Google Doc avoids
  needing to provision and rotate a service account credential for a first version. If the
  office wants to paste private docs, that's the next thing to add (a Drive service
  account, shared into a dedicated folder, configured as an MCP server via `--mcp-config`
  in the workflow).
- **Review is a merge, not a re-run.** If a reviewer wants changes, the current setup means
  re-running `/code-research` rather than editing the PR in place -- there's no "revise
  this" loop yet. Fine for a first version; worth adding once the team has a sense of what
  kinds of tweaks actually come up.
