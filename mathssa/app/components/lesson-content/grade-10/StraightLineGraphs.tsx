import { LessonProps } from '../registry'
import MathsText from '../../MathsText'
import { segmentProgress } from '@/app/lib/animationUtils'
import { Reveal, MathsTextFO, Arrow } from '../animationPrimitives'

function tailFade(reveal: number, from = 0.7) {
  return Math.min(1, Math.max(0, (reveal - from) / (1 - from)))
}

export default function StraightLineGraphs({ progress, totalLessonTime }: LessonProps) {
  const T = totalLessonTime

  // ---------- TIMELINE ----------
  // Scene 1: main line + two points being plotted
  const dotReveal       = segmentProgress(progress, 0, 1)
  const mainLineReveal  = segmentProgress(progress, 1, 3)
  const formulaReveal   = segmentProgress(progress, 3, 5)

  // Scene 2: y = mx + c, gradient + y-intercept labels
  const gradientArrowRev  = segmentProgress(progress, 5, 5.5)
  const gradientLabelRev  = segmentProgress(progress, 5.5, 6)
  const yIntArrowRev      = segmentProgress(progress, 10, 10.5)
  const yIntLabelRev      = segmentProgress(progress, 10.5, 11)

  // // Scene 3: "m: gradient" + m+ / m- mini diagrams
  const mBoxRev           = segmentProgress(progress, 11, 13)
  const mPlusLabelRev     = segmentProgress(progress, 13, 15)
  const mMinusLabelRev    = segmentProgress(progress, 15, 17)
  const yBoxRev           = segmentProgress(progress, 17, 18)
  const yRev              = segmentProgress(progress, 18, 20)

  // ---------- GEOMETRY ----------
  // Scene 1 line
  const p1_dot = { x: 40, y: 168 }
  const p2_dot = { x: 220, y: 55 }
  const p1_line = { x: 20, y: 180 }
  const p2_line = { x: 240, y: 42 }
  const mainLen = Math.hypot(p2_line.x - p1_line.x, p2_line.y - p1_line.y)

  // Scene 2
  const formula_xy = { x: 280, y: 80 }

  // // Scene 3 mini gradient icons
  const mPlus = { x1: 270, y1: 140, x2: 360, y2: 130 }
  const mMinus = { x1: 400, y1: 140, x2: 360, y2: 130 }
  const yInter = { x: 270 , y: 220 }

  const mPlusLen = Math.hypot(mPlus.x2 - mPlus.x1, mPlus.y2 - mPlus.y1)
  const mMinusLen = Math.hypot(mMinus.x2 - mMinus.x1, mMinus.y2 - mMinus.y1)

  return (
    <svg viewBox="0 0 500 300" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">

      {/* ===================== Scene 1: the line itself ===================== */}
      <line
        x1={p1_line.x} y1={p1_line.y} x2={p2_line.x} y2={p2_line.y}
        stroke="#378ADD" strokeWidth={3} strokeLinecap="round"
        strokeDasharray={mainLen}
        strokeDashoffset={mainLen * (1 - mainLineReveal)}
      />
      <circle cx={p1_dot.x} cy={p1_dot.y} r={5 * Math.min(1, dotReveal * 1.4)} fill="#0C447C" opacity={dotReveal}/>
      <circle cx={p2_dot.x} cy={p2_dot.y} r={5 * Math.min(1, dotReveal * 1.4)} fill="#0C447C" opacity={dotReveal} />

      {/* ===================== Scene 2: y = mx + c + labels ===================== */}
      <Reveal x={formula_xy.x} y={formula_xy.y} width={300} height={100} reveal={formulaReveal}>
        <MathsTextFO x={formula_xy.x} y={formula_xy.y} width={300} height={100} styling="text-3xl"// TODO: this could probably be inheritted from reveal? 
          >$y = mx + c$
        </MathsTextFO>
      </Reveal>

      <Arrow x1={formula_xy.x + 100} y1={formula_xy.y - 40} x2={formula_xy.x + 85} y2={formula_xy.y + 10}
            reveal={gradientArrowRev} styling="stroke-orange-500 stroke-[3px]" label="gradient" labelReveal={gradientLabelRev} labelOffset={{x: -30, y: -10}} labelStyling="text-lg fill-orange-500"/>
      <Arrow x1={formula_xy.x + 200} y1={formula_xy.y - 40} x2={formula_xy.x + 180} y2={formula_xy.y + 10}
            reveal={yIntArrowRev} styling="stroke-green-500 stroke-[3px]" label="y-intercept" labelOffset={{x: -30, y: -10}} labelReveal={yIntLabelRev} labelStyling="text-lg fill-green-500"/>

      {/* ===================== Scene 3: gradient sign explainer ===================== */}
      <rect
        x={mPlus.x1 - 10}
        y={mPlus.y1 - 10}
        width={Math.abs(mMinus.x1 - mPlus.x1) + 130}
        height={Math.abs(mMinus.y1 - mPlus.y1) + 60}
        fill="none"
        strokeDasharray="5"
        className="stroke-orange-500 stroke-2"
        opacity={mBoxRev}
      />


      <Reveal x={mPlus.x1} y={mPlus.y1} width={100} height={100} reveal={mPlusLabelRev}>
        <MathsTextFO x={mPlus.x1} y={mPlus.y1} width={100} height={100} styling="text-orange-500 text-xl">$m +$</MathsTextFO>
      </Reveal>

      <Reveal x={mMinus.x1} y={mMinus.y1} width={100} height={100} reveal={mMinusLabelRev}>
        <MathsTextFO x={mMinus.x1} y={mMinus.y1} width={100} height={100} styling="text-orange-500 text-xl">$m -$</MathsTextFO>
      </Reveal>

    <rect
      x={yInter.x - 10}
      y={yInter.y - 5}
      width={Math.abs(mMinus.x1 - mPlus.x1) + 130}
      height={50}
      fill="none"
      strokeDasharray="5"
      className="stroke-green-500 stroke-2"
      opacity={yBoxRev}
    />
    <Reveal x={yInter.x} y={yInter.y} width={100} height={100} reveal={yRev}>
      <MathsTextFO x={yInter.x} y={yInter.y} width={100} height={100} styling="text-green-500 text-2xl">$c$</MathsTextFO>
    </Reveal>

    </svg>
  )
}