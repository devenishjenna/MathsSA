@AGENTS.md

# Lesson Animation Conventions

## File structure
Each lesson is a component in `../registry`, typed with `LessonProps`
(`{ progress, totalLessonTime }`). Import shared primitives from
`../animationPrimitives`: `Reveal`, `MathsTextFO`, `Arrow`.
Timeline helper `segmentProgress` comes from `@/app/lib/animationUtils`.

## Canvas
- `<svg viewBox="0 0 500 300" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">`
- All coordinates are authored in this 500x300 space.

## Timeline pattern
- `progress` is a single value across the whole lesson (0 to `totalLessonTime`).
- Break it into named "scenes" via `segmentProgress(progress, start, end)`,
  each returning a 0-1 reveal value for that window.
- Name reveal constants descriptively: `dotReveal`, `mainLineReveal`,
  `formulaReveal`, `gradientArrowRev`, etc. — `<name><What>Rev(eal)`.
- Comment each scene block with `// Scene N: <what it shows>` above its
  timeline constants, and mirror that with a
  `{/* ===== Scene N: <what it shows> ===== */}` comment above the matching JSX.
- Scenes run sequentially with no gaps unless intentionally staggering
  (e.g. arrow appears, then its label 0.5s later).

## Drawing lines (draw-on effect)
Always animate lines being drawn with `strokeDasharray` / `strokeDashoffset`,
not opacity or width:
```jsx
const len = Math.hypot(p2.x - p1.x, p2.y - p1.y)
...
<line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
  stroke="#378ADD" strokeWidth={3} strokeLinecap="round"
  strokeDasharray={len}
  strokeDashoffset={len * (1 - reveal)}
/>
```
Compute `len` once in the GEOMETRY section, never inline in JSX.

## Points
`<circle>` with radius eased in via reveal:
```jsx
<circle cx={p.x} cy={p.y} r={5 * Math.min(1, reveal * 1.4)}
  fill="#0C447C" opacity={reveal} />
```

## Text / maths
- Any LaTeX-style text goes through `<MathsTextFO>` inside a `<Reveal>`
  wrapper, both given matching `x`, `y`, `width`, `height`.
- Plain (non-maths) styling notes go in the `styling` prop using Tailwind
  classes, e.g. `"text-orange-500 text-xl"`.

## Arrows
Use the `<Arrow>` primitive for pointer/label call-outs:
```jsx
<Arrow x1={} y1={} x2={} y2={}
  reveal={arrowRev} styling="stroke-orange-500 stroke-[3px]"
  label="gradient" labelReveal={labelRev}
  labelOffset={{x: -30, y: -10}} labelStyling="text-lg fill-orange-500"/>
```

## Color convention
- Blue `#378ADD` / `#0C447C` — primary graph lines and points
- Orange (`stroke-orange-500` / `fill-orange-500` / `text-orange-500`) —
  gradient (`m`) related elements
- Green (`stroke-green-500` / `fill-green-500` / `text-green-500`) —
  y-intercept (`c`) related elements
- Dashed boxes (`strokeDasharray="5"`, `stroke-2`, `fill="none"`) are used
  to group/highlight a concept area, revealed via its own scene's reveal value

## Geometry section
Keep ALL coordinates as named objects (`{ x, y }` or `{ x1, y1, x2, y2 }`)
in a `GEOMETRY` block above the return statement — never hardcode numbers
directly in JSX. Group with comments matching scene numbers.

## General rules
- One `<line>`/`<circle>`/`<Reveal>` per concept; don't combine multiple
  reveals into one element's opacity unless they're genuinely simultaneous.
- Prefer editing/extending an existing scene's pattern over inventing a new
  animation technique — check this file and existing lesson files first.
- Leave commented-out exploratory code at the bottom of the file if unsure
  it should be deleted (matches existing style), but flag it for review
  rather than assuming it's fine.