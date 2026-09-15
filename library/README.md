# Code library

Persistent, cross-project knowledge base of jurisdictions, adopted codes, adoption-by-
reference chains, and agency contacts. The goal is that the second project in a
jurisdiction is faster and more consistent than the first, not that it skips verification.

## Layout

```
jurisdictions/<state>/<county>/<city>/
  _overview.md   jurisdiction stack, adopted code editions (building, fire, plumbing,
                 mechanical, electrical, health, zoning/land use), each with a source link
                 and last_verified date
  contacts.md    fire marshal, planning & zoning, building permits/inspections, health
                 department — accumulated over time, never overwritten wholesale
topics/
  <topic-slug>.md   cross-jurisdiction reference notes that recur across projects, e.g.
                     an adoption-by-reference chain from a county health code to the FDA
                     Food Code, or the ADA "percent of assessed value" remodel trigger
```

State-level and county-level files (`jurisdictions/<state>/_overview.md`,
`jurisdictions/<state>/<county>/_overview.md`) are also valid — not every project needs a
city-level entry, and some rules apply at the state or county level only.

## Staleness policy

- Every entry carries `last_verified: YYYY-MM-DD` and a `source:` link.
- Entries older than 180 days are a starting point for research, not a final answer —
  re-check before relying on them.
- A number that a problem/solution decision hinges on (occupant load tables, fixture
  counts, ADA remodel thresholds) always gets spot-checked against the live source
  regardless of cache age.
- Code editions change (e.g. IBC 2021 vs 2018, FDA Food Code 2017 vs 2022). Note the
  edition explicitly; do not assume the cached edition is still the adopted one.

## Contacts

`contacts.md` files accumulate. When a later project turns up a contact not already
recorded (or a corrected phone number/address), add it — do not remove existing entries
just because they were not needed this time.
