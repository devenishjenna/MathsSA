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

  // Scene 4: worked example y = 2x + 4 (20s-30s), starts on a blank page
  const earlyScenesOpacity = 1 - segmentProgress(progress, 20, 20.5)
  const formula2Reveal     = segmentProgress(progress, 21, 22.5)
  const axesReveal         = segmentProgress(progress, 22.5, 24)
  const lineReveal2        = segmentProgress(progress, 24, 26.5)
  const dotsReveal2        = segmentProgress(progress, 26.5, 27.5)
  const interceptLabelRev  = segmentProgress(progress, 27.5, 29)

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

  // Scene 4 geometry (origin at (150,220), 20px per unit)
  const formula2_xy = { x: 150, y: 8 }
  const xAxis = { x1: 50, y1: 220, x2: 320, y2: 220 }
  const yAxis = { x1: 150, y1: 270, x2: 150, y2: 60 }
  const line2_p1 = { x: 90, y: 260 }    // (-3, -2)
  const line2_p2 = { x: 190, y: 60 }    // (2, 8)
  const line2Len = Math.hypot(line2_p2.x - line2_p1.x, line2_p2.y - line2_p1.y)
  const yIntercept2 = { x: 150, y: 140 } // (0, 4)
  const xIntercept2 = { x: 110, y: 220 } // (-2, 0)

  return (
    <svg viewBox="0 0 500 300" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">

      <g opacity={earlyScenesOpacity}>
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
      </g>

      {/* ===================== Scene 4: y = 2x + 4 worked example ===================== */}
      <Reveal x={formula2_xy.x} y={formula2_xy.y} width={200} height={50} reveal={formula2Reveal}>
        <MathsTextFO x={formula2_xy.x} y={formula2_xy.y} width={200} height={50} styling="text-3xl text-center">
          $y = 2x + 4$
        </MathsTextFO>
      </Reveal>

      <Arrow x1={xAxis.x1} y1={xAxis.y1} x2={xAxis.x2} y2={xAxis.y2}
            reveal={axesReveal} styling="stroke-slate-400 stroke-2" />
      <Arrow x1={yAxis.x1} y1={yAxis.y1} x2={yAxis.x2} y2={yAxis.y2}
            reveal={axesReveal} styling="stroke-slate-400 stroke-2" />

      <line
        x1={line2_p1.x} y1={line2_p1.y} x2={line2_p2.x} y2={line2_p2.y}
        stroke="#378ADD" strokeWidth={3} strokeLinecap="round"
        strokeDasharray={line2Len}
        strokeDashoffset={line2Len * (1 - lineReveal2)}
      />

      <circle cx={yIntercept2.x} cy={yIntercept2.y} r={5 * Math.min(1, dotsReveal2 * 1.4)} fill="#0C447C" opacity={dotsReveal2} />
      <circle cx={xIntercept2.x} cy={xIntercept2.y} r={5 * Math.min(1, dotsReveal2 * 1.4)} fill="#0C447C" opacity={dotsReveal2} />

      <text x={yIntercept2.x + 8} y={yIntercept2.y - 8} className="text-sm fill-slate-600" opacity={interceptLabelRev}>(0, 4)</text>
      <text x={xIntercept2.x - 40} y={xIntercept2.y + 20} className="text-sm fill-slate-600" opacity={interceptLabelRev}>(-2, 0)</text>

    </svg>
  )
}