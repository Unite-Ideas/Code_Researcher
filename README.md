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

## Phase 2 (planned): WordPress + Slack front end

The pipeline is being built so the "brain" (extract → research → synthesize → persist →
report) is not glued to any one front end. Planned surfaces, once Phase 1 is proven out:

- A WordPress page: text box + file upload, submits a request, emails/Slacks the requester
  the finished Google Doc and Artifact links when done.
- A WordPress index page listing every past research project (title, requester, date) with
  a table of contents linking into each project's findings.
- A Slack command: `/code-research <plain text context>` with attached files or Google Doc
  links.

## Repository layout

```
.claude/skills/code-researcher/SKILL.md   the research pipeline the skill follows
library/                                   persistent jurisdiction + code knowledge base
  jurisdictions/<state>/<county>/<city>/   codes, adoption chains, contacts per place
  topics/                                  cross-jurisdiction reference notes (e.g. ADA
                                            20% rule, food code adoption chains)
projects/                                  one folder per research run
  index.md                                 master list of all projects run so far
templates/
  findings-schema.json                     the data contract for a project's findings.json
```
