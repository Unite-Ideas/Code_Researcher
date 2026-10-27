# Code Researcher

Code Researcher reads project documents (site visit summaries, meeting transcripts, plan
change memos) and figures out which state, county, city, health, and building codes apply
to what is being proposed. It researches the actual current code text online (not just the
code's name), flags problems or restrictions with what is proposed, and proposes solutions
or workarounds. It always flags anything that still needs verification by a licensed
architect, engineer, or the local authority having jurisdiction (AHJ) — this tool speeds up
finding the right question and the right code, it does not replace sign-off.

## Phase 1 (now): Claude Code skill

Run it in Claude Code with the `/code-research` invocation (see
`.claude/skills/code-researcher/SKILL.md`). Feed it:

- Pasted text (transcript, meeting notes, email thread), and/or
- A Google Doc link or title (e.g. `Trinity_Plan_Change_Summary - Site visit 9/8-9/2026`),
  and/or
- Uploaded files.

It produces:

- A Google Doc report: point-by-point findings, the codes that apply, the actual rule,
  problems identified, and proposed solutions, with links to the real code sections.
- A Claude Artifact: a linked-card site with the same findings, plus a jurisdiction/contacts
  panel (fire marshal, planning & zoning, building permits, health department, etc.) and
  other codes likely to matter later for the same project.
- An update to the persistent code library in `library/` so the next project in the same
  jurisdiction starts from what we already know instead of researching from zero.
- An entry in `projects/index.md` so every research run stays discoverable.

## Phase 2 (in progress): Slack `/code-research`

Anyone in the office will be able to run `/code-research <Google Doc link or short
description>` in Slack and get a published report back a few minutes later, with nobody
watching the run. This is wired up through **unite-ops** (`Unite-Ideas/unite-ops`), the
team's shared control room for every unattended Claude routine, rather than through
anything bespoke living in this repo:

- A Make.com scenario receives the Slack slash command, logs the request, and fires the
  `code-research` Claude Code Routine via the Anthropic API.
- The routine (`routines/code-research.md` in unite-ops) runs this repo's
  `/code-research` skill unattended: it clones this repo, does the research, posts
  progress directly to Slack via its own Slack connector, and commits the report and
  library updates straight to this repo's `main` — full tool access, no approval prompts,
  because it's a connector-scoped cloud routine, not an open-ended agent.
- unite-ops holds the routine definition and the run receipts (started/finished, so a
  stalled run gets caught); it never holds this project's code, library, or project data
  — that all stays here, the same way `Client_Research` stays its own repo even though
  its `project-brief` routine is defined in unite-ops.

Since there's no claude.ai chat session behind an automated run (no Artifact tool, no
personal Google Drive connector unless the routine's own Drive connector is attached), the
automated path publishes a self-contained HTML report to `docs/reports/<slug>/` instead,
served over GitHub Pages at `https://unite-ideas.github.io/Code_Researcher/`, and reads
input Google Docs via their public link-shared export when no Drive connector is present.
Everything else — the research depth, the persistent library, the citation-verification
rules — is identical to running it interactively in Claude Code; see the "headless run"
notes throughout `.claude/skills/code-researcher/SKILL.md`.

An earlier version of this automation (a GitHub Actions workflow plus a Cloudflare Worker
relay, living in this repo) has been retired in favor of the unite-ops pattern above, to
avoid building a second one-off automation system alongside the one the rest of the office
already uses.

### Still planned

- Standing up the actual `code-research` routine, Make scenario, and Slack channel (see
  `routines/code-research.md` and `prompts/routine-launcher-code-research.md` in
  unite-ops).
- A WordPress page as an alternate front door (text box + file upload) for anyone who'd
  rather not use Slack.
- Feeding private (not just link-shared) Google Docs into the automated path via a Drive
  connector or service account.

## Repository layout

```
.claude/skills/code-researcher/SKILL.md   the research pipeline the skill follows
docs/                                     GitHub Pages site (published reports)
  index.md / index.html                   master listing of every published report
  reports/<slug>/                         one static HTML report per project
library/                                   persistent jurisdiction + code knowledge base
  jurisdictions/<state>/<county>/<city>/   codes, adoption chains, contacts per place
  topics/                                  cross-jurisdiction reference notes (e.g. ADA
                                            20% rule, food code adoption chains)
projects/                                  one folder per research run (source of truth)
  index.md                                 master list of all projects run so far
templates/
  findings-schema.json                     the data contract for a project's findings.json
```
