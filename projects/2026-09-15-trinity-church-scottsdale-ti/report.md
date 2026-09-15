# Code Research Report: The Trinity Church, West and East Phase T.I.

**Date:** September 15, 2026
**Source document:** [Trinity_Plan_Change_Summary - Site visit 9/8-9/2026](https://docs.google.com/document/d/1Nzy45ZA10OHw7-YreeEDlCr-gT54ObGhrmxDqMVnds0/edit)
**Site:** 10001 North 92nd Street, Scottsdale, AZ 85258

This report speeds up finding the right question and the right code for decisions already
in motion on this project. It does not replace review and sign-off by the project's
licensed architect (James A. Godwin, AZ Lic. 58860), the structural and MEP engineers of
record, or the City of Scottsdale / Maricopa County plan reviewers. Every finding below
states its confidence and what still needs verification.

**A note on citation links:** the first pass of this report included three citation links
(findings 2, 3, and 6 below) generated from a bare aggregator URL that, on manual re-check,
actually opened a different state's copy of the code (Illinois in two cases, a Texas agency
in one) rather than Arizona's. The section numbers and requirement text were still correct,
but the links themselves were not. Those three are corrected below, each replaced with
either the City of Scottsdale's own ordinance or a neutral industry-commentary source that
does not misrepresent its jurisdiction. See `findings.json` in this project folder for the
full `link_status`/`link_note` on every citation, including the ones that were already
correct.

## Project and jurisdiction

- **Project:** Tenant improvement across two floors, 97,910 SF total (Phase I West 56,966
  SF, Phase II East 40,944 SF), changing Use Group from Business to Assembly (A-3, place of
  worship).
- **Jurisdiction stack:** State of Arizona -> Maricopa County -> City of Scottsdale.
- **Adopted codes:** 2021 IBC / 2021 IEBC / 2021 IPC (City of Scottsdale, Ordinance 4550 /
  Resolution 12498, effective 1/1/2023). Food service: Maricopa County Environmental Health
  Code, adopting the FDA Food Code 2017 Edition by reference. See
  `library/jurisdictions/arizona/maricopa-county/scottsdale/_overview.md` for the full
  adopted-code reference table.

## Findings, most consequential first

### 1. Cafe hand wash sink cannot be replaced with a hand sanitizer station — SIGNIFICANT

**The question:** Can the specialty coffee cafe's hand wash sink, ruled cost-prohibitive,
be replaced with a hand sanitizer station?

**The code:** Maricopa County Environmental Health Code Ch. VIII Sec. 2, adopting the FDA
Food Code 2017 Edition (§2-301.12, 2-301.14, 2-301.16(A)(3), 5-203.11, 5-204.11, 5-205.11).
Source: [Maricopa County ordinance](https://www.maricopa.gov/DocumentCenter/View/5477/Chapter-8-Section-2---Food-Establishments-PDF)
and [FDA Food Code 2017 text](https://teamhcso.com/getattachment/f70a54e6-43e7-4983-abe2-843a578bbe2d/attachment-3-applicable-fda-food-code.pdf)
(a county-hosted mirror -- fda.gov's own page blocks automated verification, so this is the
copy actually read for this research).

**The rule:** A dedicated hand sink is required at any bar preparing TCS food or drinks
(espresso, steamed milk qualifies). Hand sanitizer is only ever a supplement applied after
washing at a sink — never a substitute. Maricopa County's plan-review guide explicitly
requires a hand sink "centrally located, visible, and directly accessible... including all
bars" for an Open Food Service and Beverage Establishment, which this cafe is.

**The problem:** High probability of rejection at Maricopa County Environmental Services
plan review. This is not a gray area under the adopted code.

**Proposed solutions:**
- Compact plumbed ADA hand sink (9x9 to 15 inch wall-mount or corner unit) at the end of
  the counter run — smallest footprint, fully compliant.
- Point-of-use tankless electric water heater dedicated to that sink, avoiding a long hot
  water run from the building's main heater.
- Reconfigure the counter layout to free 12-18 inches for the sink, often cheaper than
  moving walls.
- A self-contained portable hand-wash cart is recognized by the county mainly for
  catering/mobile use and is not recommended as a permanent, final solution.

**Verify:** Call Maricopa County Environmental Services Plan Review (602-506-6824) to
confirm the establishment classification in writing before finalizing the cafe layout.

### 2. Permit strategy: implementing scope changes as field revisions carries real risk — SIGNIFICANT

**The question:** Can the site-visit changes (playland reconfiguration, egress/security
door changes, restroom stall increase, baptistry plumbing, MEP changes) go in as field
revisions after permit issuance, without resubmitting to the City of Scottsdale?

**The code:** 2021 IBC §107.4, Amended Construction Documents.
Source: [Scottsdale's 2021 IBC amendment ordinance](https://www.scottsdaleaz.gov/docs/default-source/scottsdaleaz/codes---ordinances/building-codes/2021-international-building-code-(ibc)-amendments.pdf).
This is an amendment-only document: it was read page by page, and Sec. 31-6 amends
Section 107 only at 107.2, 107.2.1.1/.1.2, 107.2.2, 107.2.6.1, 107.2.9/.10, and 107.3.1,
then jumps straight to Section 109 -- §107.4 is not mentioned anywhere, which is how such a
document shows "we left this exactly as the model code wrote it." There is no line to click
through to for that reason; the full rule is quoted below instead, so no further link is
needed to get the actual text -- this citation exists only as a paper trail for the
"not locally amended" claim.

**The rule:** IBC §107.4 reads: "Work shall be installed in accordance with the approved
construction documents, and any changes made during construction that are not in
compliance with the approved construction documents shall be resubmitted for approval as
an amended set of construction documents." No Scottsdale-specific written "field revision"
threshold exists — the Building Official's judgment on the scope of the change governs.
Egress door changes, security/lockdown door hardware, converting classroom space to
lobby/assembly space, new restroom fixtures, and new baptistry plumbing and water heaters
are all plan-reviewed items under standard code administration.

*Note:* this project separately involves a change of occupancy (Business to Assembly),
which is a different topic governed by 2021 IEBC Chapter 10 (specifically §§1011.4-1011.6)
— see "Codes that may matter later" below for that citation with its specific sections. It
does not answer this field-revision question and was removed from here after review; the
sprinkler, fire alarm, and fixture-count consequences it triggers are already their own
line items elsewhere in this report.

**The problem:** This is a real process risk, not routine field-revision practice. If
caught, likely outcomes include a stop-work order, a required retroactive amended-document
submittal, re-inspection of completed work at the contractor's cost and delay, and a
delayed certificate of occupancy.

**Proposed solutions:**
- Proactively disclose the site-visit changes to the assigned plan reviewer now and get
  their determination in writing, even while pursuing permit issuance on the original
  drawings.
- Selectively resubmit only the highest-risk items — egress door location/hardware, the
  security door, and the lobby/playland reconfiguration — as a formal plan revision.
- Route the restroom stall increase and baptistry plumbing/water heater additions through
  at least a plumbing plan revision.
- Request a pre-application meeting with Scottsdale Building Safety given the compounded
  occupancy change.

**Verify:** Confirm directly with Scottsdale Building Safety / One Stop Shop (480-312-2500)
before proceeding on the current field-revision strategy.

### 3. Kids ministry lockdown door plus dedicated egress door — MODERATE, needs AHJ sign-off

**The question:** Is it compliant to keep both a dedicated egress-only door and a separate
lockable security door on the kids ministry hallway, given the reduced number of secure
doors?

**The code:** 2021 IBC §1010.2.8, Locking Arrangements in Educational Occupancies.
Source: [iDigHardware -- classroom door lock requirements](https://idighardware.com/2023/03/decoded-current-requirements-of-the-i-codes-for-classroom-door-locks/)
(neutral industry commentary; confirmed to load and discuss this exact section).

**The rule:** A door may be locked to keep intruders out, provided it is unlockable from
outside with a key or approved means, the interior egress hardware remains fully
code-compliant, and panic hardware/fire door hardware/closers are not modified. The two-door
approach (a hardware-clean egress-only door separate from the lockdown security door) is a
sound, commonly used strategy that avoids stacking locks on one leaf.

**The problem:** Three items are not resolved by document research alone: the final
occupancy classification of the kids ministry space (which determines which locking section
applies), whether the reduced secure-door count still meets required exit access doorway
counts and common path of travel for the child occupant load, and confirmation that the
security door stays secondary to the dedicated egress door.

**Proposed solutions:**
- Confirm the kids ministry space's occupancy classification with the plan reviewer.
- Have the architect verify exit access doorway count and common path of travel against
  IBC Table 1006.2.1 using the actual child occupant load.

**Verify:** Needs Scottsdale Fire Prevention/Building plan review sign-off on the specific
room layout and occupant load — not resolvable by research alone.

### 4. Accessible path-of-travel spend: budget for it now, per phase — MODERATE

**The question:** How much of the budget may be required for accessible path-of-travel
upgrades, and is it based on alteration cost or building assessed value?

**The code:** 28 CFR 36.403 (federal ADA/DOJ), 2010 ADA Standards §202.4, Arizona
Administrative Code R10-3-401 through 412.
Source: [eCFR 36.403](https://www.ecfr.gov/current/title-28/chapter-I/part-36/subpart-D/section-36.403)
(federal, read directly) and [Arizona R10-3-401](https://regulations.justia.com/states/arizona/title-10/chapter-3/article-4/r10-3-401/)
(could not be re-verified by automated fetch just now -- cross-check against the Arizona
Secretary of State's own PDF if relying on this citation).

**The rule:** This is commonly misunderstood as a percentage of the building's assessed
value — it is not. The cap is 20% of the cost of the specific alteration to the primary
function area, and the required path-of-travel work is prioritized (accessible entrance,
then route, then a restroom, then phones/fountains) if the cap is reached.

**The problem:** For a project of this scale and scope (occupancy change touching large
portions of the building across two phases), the obligation very likely applies broadly and
repeatedly, phase by phase. This is a budgeting/scoping issue, not a blocker, but needs
planning rather than late discovery.

**Proposed solutions:**
- Document existing accessible-route deficiencies now as a baseline.
- Budget a per-phase contingency up to 20% of that phase's construction cost.

### 5. Access-controlled doors: confirm hardware topology door by door — MINOR

**The question:** Do the roughly 90 doors receiving key card/fob readers need special
egress hardware?

**The code:** 2021 IBC §1010.2.10, Access-Controlled Egress Doors.
Source: [iDigHardware -- access-controlled egress doors](https://idighardware.com/2022/08/2021-ibc-commentary-on-egress-doors-with-access-control/)
(neutral industry commentary; confirmed to load).

**The rule:** Where a reader controls the egress-side hardware of a required exit door, the
code requires an approach sensor that unlocks the door, fail-safe unlocking on power loss,
and a marked manual push-button override. This only applies where the reader affects the
egress side — if the interior lever/panic hardware always operates freely regardless of the
reader, ordinary hardware rules apply instead.

**The problem:** Not a blocker, but a verification item across ~90 doors, best resolved
before installation.

**Proposed solution:** Have the electrical engineer/hardware consultant confirm, door by
door, which locking topology is used.

### 6. Restroom door swing direction — likely not an issue

**The question:** Do the expanding restroom doors need to swing in the direction of egress
travel under the IBC 50-person threshold?

**The code:** 2021 IBC §1010.1.2.1, Direction of swing.
Source: [iDigHardware -- door swing & occupant load](https://idighardware.com/2012/10/door-swing-and-encroachment/)
(neutral industry commentary; confirmed to load and quote this exact requirement).

**The rule:** This applies where a door serves a room or area with an occupant load of 50
or more. A 15-stall women's restroom and similarly expanded men's restroom each have a room
occupant load well under 50, so on the plain text of this section the restroom doors
themselves are likely not required to swing in the direction of travel — that requirement
clearly applies to the main assembly space's own exit doors instead.

**Verify:** Confirm this room-vs-space interpretation with the Scottsdale plans examiner in
writing, since AHJ interpretation of "area served" can vary.

## Codes that may matter later for this project

- **2021 IEBC Ch. 10, §§1011.4-1011.6** (Change of Occupancy) — the code that actually
  requires the egress/occupant-load recalculation, height-and-area check, and
  fire-protection threshold check triggered by the Business-to-Assembly conversion. This
  is the umbrella citation; its specific consequences (sprinkler trigger, fire alarm
  trigger, fixture-count table) are the next three items below, and are not a separate
  action item.
- **IBC §903.2.1.3** (sprinkler trigger for Group A-3: fire area over 12,000 SF, or
  occupant load 300+) — at 97,910 SF, this project will almost certainly need to meet
  Group A sprinkler thresholds a Business occupancy of similar size would not have.
- **IBC §907.2.1** (fire alarm trigger for Group A) — relevant to the fire alarm scope for
  the converted occupancy.
- **IPC Table 403.1** (plumbing fixture counts for places of worship) — verify the planned
  restroom stall counts against this table with a licensed code source.
- **Baptistry cross-connection / backflow prevention** — not yet researched; the localized
  water heaters, cold water fill lines, and trench drains at three baptistry locations may
  trigger backflow prevention requirements that should be checked before rough-in.

## Agency contacts

| Office | Level | Phone | Website |
|---|---|---|---|
| City of Scottsdale Building Safety Division / One Stop Shop | City | (480) 312-2500 | scottsdaleaz.gov/planning-development |
| Maricopa County Environmental Services Department, Plan Review | County | (602) 506-6824 | esd.maricopa.gov |
| City of Scottsdale Fire Prevention | City | needs verification | scottsdaleaz.gov |

---

*This report is a research aid, not a compliance sign-off. Every finding above should be
confirmed with the project's licensed architect and engineers, and where noted, directly
with the City of Scottsdale or Maricopa County before being relied on for construction or
permitting decisions.*
