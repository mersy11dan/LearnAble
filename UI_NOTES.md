# UI Notes

## Amharic that needs native-speaker review

- `summaryAm` on each job in `src/content/jobs.ts`.

## Needs a human

- Confirm the Amharic job summaries with a native speaker before anyone treats them as public copy.
- A real Ethiopian Sign Language recording is not in the repo. Add one with `sign` and `sign-lang="ethiopian"` only after a Deaf ESL signer approves it. See `docs/SIGN-LANGUAGE.md`.

Visual and UX observations that require functional changes (not addressed in the styling polish).

## Player

- The sign window position is initialized relative to the stage element, but if the page scrolls before the sign window opens, the window may appear in an unexpected position. The logic calculates position based on `getBoundingClientRect()` which is viewport-relative.

- The progress slider does not show a filled track segment (progress indicator) on the left side of the thumb. This would require either JavaScript to update a CSS custom property, or using the non-standard `::-moz-range-progress` pseudo-element (which is Firefox-only). WebKit/Chrome would need JS.

## Embed

- The embed player's control layout differs from the React player (it has flat rows rather than the grouped control bar). Making them visually identical would require restructuring the embed's DOM in `player.ts`.

## General

- At very narrow widths (below 320px), some button text may truncate. This is at the edge of WCAG's minimum viewport requirement and may be acceptable.

- The high-contrast mode uses pure black (#000000) and white (#ffffff), which may cause eye strain for some users who prefer slightly off-white backgrounds. This is a design decision that could be revisited.
