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
  const dotReveal     = segmentProgress(progress, 0, 1)
  const mainLineReveal = segmentProgress(progress, 1, 3)
  const formulaReveal = segmentProgress(progress, 3, 5)

  // Scene 2: y = mx + c, gradient + y-intercept labels
  const gradientArrowRev  = segmentProgress(progress, 5, 5.5)
  const gradientLabelRev  = segmentProgress(progress, 5.5, 6)
  const yIntArrowRev      = segmentProgress(progress, 10, 10.5)
  const yIntLabelRev      = segmentProgress(progress, 10.5, 11)

  // // Scene 3: "m: gradient" + m+ / m- mini diagrams
  const mHeadingRev       = segmentProgress(progress, T * 0.48, T * 0.53)
  const mUnderlineRev     = segmentProgress(progress, T * 0.53, T * 0.57)
  const mPlusLabelRev     = segmentProgress(progress, 1, 2)
  const mPlusLineRev      = segmentProgress(progress, T * 0.61, T * 0.67)
  const mMinusLabelRev    = segmentProgress(progress, T * 0.68, T * 0.71)
  const mMinusLineRev     = segmentProgress(progress, T * 0.71, T * 0.77)

  // // Scene 4: worked example y = 2x + 4
  // const axesReveal        = segmentProgress(progress, T * 0.79, T * 0.84)
  // const exampleLineRev     = segmentProgress(progress, T * 0.84, T * 0.91)
  // const exampleDotsRev     = segmentProgress(progress, T * 0.89, T * 0.93)
  // const exampleFormulaRev  = segmentProgress(progress, T * 0.94, T)

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
  const mPlusLen = Math.hypot(mPlus.x2 - mPlus.x1, mPlus.y2 - mPlus.y1)
  const mMinus = { x1: 270, y1: 180, x2: 360, y2: 130 }
  const mMinusLen = Math.hypot(mMinus.x2 - mMinus.x1, mMinus.y2 - mMinus.y1)
  const underline = { x1: 300, y1: 38, x2: 420, y2: 42 }
  const underlineLen = Math.hypot(underline.x2 - underline.x1, underline.y2 - underline.y1)
  const yInter = { x: 270 , y: 240 }

  // // Scene 4 axes + line (y = 2x + 4), origin at (330,240), 15px per unit
  // const originX = 330
  // const originY = 240
  // const scale = 15
  // const xAxis = { x1: 300, y1: originY, x2: 470, y2: originY }
  // const yAxis = { x1: originX, y1: 180, x2: originX, y2: 270 }
  // const exLine = { x1: 285, y1: 270, x2: 352, y2: 135 } // roughly x=-3..1.5
  // const exLineLen = Math.hypot(exLine.x2 - exLine.x1, exLine.y2 - exLine.y1)
  // const yIntPoint = { x: originX, y: originY - 4 * scale }        // (0,4)
  // const xIntPoint = { x: originX - 2 * scale, y: originY }         // (-2,0)

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
        y={mPlus.y1 - 5}
        width={Math.abs(mMinus.x1 - mPlus.x1) + 250}
        height={Math.abs(mMinus.y1 - mPlus.y1) + 45}
        fill="none"
        stroke-dasharray="5"
        className="stroke-orange-500 stroke-2"
      />
      <Reveal x={mPlus.x1} y={mPlus.y1} width={100} height={100} reveal={1}>
        <MathsTextFO x={mPlus.x1} y={mPlus.y1} width={100} height={100} styling="text-orange-500 text-xl">$m +$</MathsTextFO>
      </Reveal>

      <Reveal x={mMinus.x1} y={mMinus.y1} width={100} height={100} reveal={1}>
        <MathsTextFO x={mMinus.x1} y={mMinus.y1} width={100} height={100} styling="text-orange-500 text-xl">$m -$</MathsTextFO>
      </Reveal>

    <rect
      x={yInter.x - 10}
      y={yInter.y - 5}
      width={Math.abs(mMinus.x1 - mPlus.x1) + 250}
      height={50}
      fill="none"
      stroke-dasharray="5"
      className="stroke-green-500 stroke-2"
    />
    <Reveal x={yInter.x} y={yInter.y} width={100} height={100} reveal={1}>
      <MathsTextFO x={yInter.x} y={yInter.y} width={100} height={100} styling="text-green-500 text-xl">$c$</MathsTextFO>
    </Reveal>

{/*       
      <g clipPath="url(#clipMHeading)">
        <text x="300" y="30" fontSize="18" fontFamily="sans-serif" fill="#333">
          <tspan fontWeight="bold">m:</tspan> gradient
        </text>
      </g>
      <line
        x1={underline.x1} y1={underline.y1} x2={underline.x2} y2={underline.y2}
        stroke="#333" strokeWidth={1.5} filter="url(#rough)"
        strokeDasharray={underlineLen}
        strokeDashoffset={underlineLen * (1 - mUnderlineRev)}
      />

      <g clipPath="url(#clipMPlusLabel)">
        <text x="305" y="135" fontSize="14" fontFamily="sans-serif" fill="#378ADD">m +</text>
      </g>
      <line
        x1={mPlus.x1} y1={mPlus.y1} x2={mPlus.x2} y2={mPlus.y2}
        stroke="#378ADD" strokeWidth={2.5} strokeLinecap="round" filter="url(#rough)"
        strokeDasharray={mPlusLen}
        strokeDashoffset={mPlusLen * (1 - mPlusLineRev)}
      />

      <g clipPath="url(#clipMMinusLabel)">
        <text x="305" y="195" fontSize="14" fontFamily="sans-serif" fill="#378ADD">m -</text>
      </g>
      <line
        x1={mMinus.x1} y1={mMinus.y1} x2={mMinus.x2} y2={mMinus.y2}
        stroke="#378ADD" strokeWidth={2.5} strokeLinecap="round" filter="url(#rough)"
        strokeDasharray={mMinusLen}
        strokeDashoffset={mMinusLen * (1 - mMinusLineRev)}
      /> */}

      {/* ===================== Scene 4: worked example y = 2x + 4 ===================== */}
      {/* <line
        x1={xAxis.x1} y1={xAxis.y1} x2={xAxis.x2} y2={xAxis.y2}
        stroke="#333" strokeWidth={2}
        strokeDasharray={170}
        strokeDashoffset={170 * (1 - axesReveal)}
      />
      <line
        x1={yAxis.x1} y1={yAxis.y1} x2={yAxis.x2} y2={yAxis.y2}
        stroke="#333" strokeWidth={2}
        strokeDasharray={90}
        strokeDashoffset={90 * (1 - axesReveal)}
      />

      <line
        x1={exLine.x1} y1={exLine.y1} x2={exLine.x2} y2={exLine.y2}
        stroke="#4CAF50" strokeWidth={3} strokeLinecap="round" filter="url(#rough)"
        strokeDasharray={exLineLen}
        strokeDashoffset={exLineLen * (1 - exampleLineRev)}
      />
      <circle cx={yIntPoint.x} cy={yIntPoint.y} r={5 * Math.min(1, exampleDotsRev * 1.4)}
        fill="#4CAF50" opacity={exampleDotsRev} filter="url(#rough)" />
      <circle cx={xIntPoint.x} cy={xIntPoint.y} r={5 * Math.min(1, exampleDotsRev * 1.4)}
        fill="#4CAF50" opacity={exampleDotsRev} filter="url(#rough)" />
      <text x={yIntPoint.x + 8} y={yIntPoint.y + 4} fontSize="12" fill="#333"
        opacity={exampleDotsRev}>4</text>
      <text x={xIntPoint.x - 15} y={xIntPoint.y + 15} fontSize="12" fill="#333"
        opacity={exampleDotsRev}>-2</text>

      <g clipPath="url(#clipExFormula)">
        <foreignObject x="300" y="85" width="150" height="40">
          <div style={{ fontSize: '20px', color: '#333' }} className="font-bold">
            <MathsText text="$y = 2x + 4$" />
          </div>
        </foreignObject>
        <text x="335" y="80" fontSize="12" fill="#E07B39">m</text>
        <text x="405" y="80" fontSize="12" fill="#4CAF50">c</text>
        <text x="390" y="70" fontSize="14" fontFamily="sans-serif" fill="#4CAF50">
          y = mx + c
        </text>
      </g> */}
    </svg>
  )
}