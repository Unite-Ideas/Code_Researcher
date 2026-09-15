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

## Phase 2 (live): Slack `/code-research`

Anyone in the office can run `/code-research <Google Doc link or short description>` in
Slack. It kicks off the same skill fully automated in GitHub Actions — no one has to sit in
a Claude Code chat approving tool calls — and posts the finished report link back to the
channel a few minutes later. See `slack-integration/README.md` for setup and
`.github/workflows/code-research.yml` for what actually runs.

Since there's no claude.ai chat session behind this (no Artifact tool, no personal Google
Drive connector), the automated path publishes a self-contained HTML report to
`docs/reports/<slug>/` instead, served over GitHub Pages at
`https://unite-ideas.github.io/Code_Researcher/`, and reads input Google Docs via their
public link-shared export rather than an OAuth connector. Everything else — the research
depth, the persistent library, the citation-verification rules — is identical to running it
interactively in Claude Code; see the "headless run" notes throughout
`.claude/skills/code-researcher/SKILL.md`.

### Still planned

- A WordPress page as an alternate front door (text box + file upload) for anyone who'd
  rather not use Slack, posting into the same `repository_dispatch` pipeline.
- Feeding private (not just link-shared) Google Docs into the automated path via a Drive
  service account.

## Repository layout

```
.claude/skills/code-researcher/SKILL.md   the research pipeline the skill follows
.github/workflows/code-research.yml       runs the skill headlessly, triggered by Slack
slack-integration/                        Cloudflare Worker relay + setup README
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
