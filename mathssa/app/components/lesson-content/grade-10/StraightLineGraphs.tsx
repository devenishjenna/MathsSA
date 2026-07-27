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
  // Frame 1: main line + two points being plotted
  const dotReveal     = segmentProgress(progress, 0, 1)
  const mainLineReveal = segmentProgress(progress, 1, 2)

  // Frame 2: y = mx + c, gradient + y-intercept labels
  const gradientArrowRev  = segmentProgress(progress, 2, 2.5)
  const gradientLabelRev  = segmentProgress(progress, T * 0.30, T * 0.37)
  const yIntArrowRev      = segmentProgress(progress, T * 0.38, T * 0.44)
  const yIntLabelRev      = segmentProgress(progress, T * 0.40, T * 0.47)

  // // Frame 3: "m: gradient" + m+ / m- mini diagrams
  // const mHeadingRev       = segmentProgress(progress, T * 0.48, T * 0.53)
  // const mUnderlineRev     = segmentProgress(progress, T * 0.53, T * 0.57)
  // const mPlusLabelRev     = segmentProgress(progress, T * 0.58, T * 0.61)
  // const mPlusLineRev      = segmentProgress(progress, T * 0.61, T * 0.67)
  // const mMinusLabelRev    = segmentProgress(progress, T * 0.68, T * 0.71)
  // const mMinusLineRev     = segmentProgress(progress, T * 0.71, T * 0.77)

  // // Frame 4: worked example y = 2x + 4
  // const axesReveal        = segmentProgress(progress, T * 0.79, T * 0.84)
  // const exampleLineRev     = segmentProgress(progress, T * 0.84, T * 0.91)
  // const exampleDotsRev     = segmentProgress(progress, T * 0.89, T * 0.93)
  // const exampleFormulaRev  = segmentProgress(progress, T * 0.94, T)

  // ---------- GEOMETRY ----------
  // Frame 1 line
  const p1_dot = { x: 40, y: 168 }
  const p2_dot = { x: 220, y: 55 }
  const p1_line = { x: 20, y: 180 }
  const p2_line = { x: 240, y: 42 }
  const mainLen = Math.hypot(p2_line.x - p1_line.x, p2_line.y - p1_line.y)

  // Frame 2
  const formula_xy = { x: 280, y: 80 }

  // // Frame 3 mini gradient icons
  // const mPlus = { x1: 360, y1: 130, x2: 420, y2: 90 }
  // const mPlusLen = Math.hypot(mPlus.x2 - mPlus.x1, mPlus.y2 - mPlus.y1)
  // const mMinus = { x1: 360, y1: 150, x2: 420, y2: 190 }
  // const mMinusLen = Math.hypot(mMinus.x2 - mMinus.x1, mMinus.y2 - mMinus.y1)
  // const underline = { x1: 300, y1: 38, x2: 420, y2: 42 }
  // const underlineLen = Math.hypot(underline.x2 - underline.x1, underline.y2 - underline.y1)

  // // Frame 4 axes + line (y = 2x + 4), origin at (330,240), 15px per unit
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
      <defs>

        {/* clip rects grow left-to-right to simulate handwriting */}
        {/* <clipPath id="clipGradientLabel">
          <rect x="130" y="35" width={90 * gradientLabelRev} height="30" />
        </clipPath>
        <clipPath id="clipYIntLabel">
          <rect x="0" y="150" width={100 * yIntLabelRev} height="30" />
        </clipPath>
        <clipPath id="clipMHeading">
          <rect x="300" y="15" width={130 * mHeadingRev} height="30" />
        </clipPath>
        <clipPath id="clipMPlusLabel">
          <rect x="305" y="115" width={45 * mPlusLabelRev} height="25" />
        </clipPath>
        <clipPath id="clipMMinusLabel">
          <rect x="305" y="175" width={45 * mMinusLabelRev} height="25" />
        </clipPath>
        <clipPath id="clipExFormula">
          <rect x="300" y="80" width={150 * exampleFormulaRev} height="45" />
        </clipPath> */}
      </defs>

      {/* ===================== FRAME 1: the line itself ===================== */}
      <line
        x1={p1_line.x} y1={p1_line.y} x2={p2_line.x} y2={p2_line.y}
        stroke="#378ADD" strokeWidth={3} strokeLinecap="round"
        strokeDasharray={mainLen}
        strokeDashoffset={mainLen * (1 - mainLineReveal)}
      />
      <circle cx={p1_dot.x} cy={p1_dot.y} r={5 * Math.min(1, dotReveal * 1.4)} fill="#0C447C" opacity={dotReveal}/>
      <circle cx={p2_dot.x} cy={p2_dot.y} r={5 * Math.min(1, dotReveal * 1.4)} fill="#0C447C" opacity={dotReveal} />

      {/* ===================== FRAME 2: y = mx + c + labels ===================== */}
      <Reveal x={formula_xy.x} y={formula_xy.y} width={300} height={100} reveal={segmentProgress(progress, 2, 3)}>
        <MathsTextFO x={formula_xy.x} y={formula_xy.y} width={300} height={100} styling="text-3xl"// TODO: this could probably be inheritted from reveal? 
          >$y = mx + c$
        </MathsTextFO>
      </Reveal>

      <Arrow x1={formula_xy.x + 100} y1={formula_xy.y - 40} x2={formula_xy.x + 90} y2={formula_xy.y} reveal={gradientArrowRev} styling="stroke-indigo-500 stroke-[3px]" label="gradient"/>

     {/* gradient arrow, pointing at the slope of the line */}
  {/* <line
      //   x1={155} y1={100} x2={165} y2={120}
      //   stroke="#132B90" strokeWidth={1.5}
      //   markerEnd="url(#arrowhead)"
      //   strokeDasharray={Math.hypot(10, 55)}
      //   strokeDashoffset={Math.hypot(10, 55) * (1 - gradientArrowRev)}
      //   opacity={tailFade(gradientArrowRev, 0.4)}
      // />
      <g clipPath="url(#clipGradientLabel)">
        <text x="130" y="30" fontSize="14" fontFamily="sans-serif" fill="#E07B39">
          gradient
        </text>
      </g> */}

      {/* y-intercept arrow, pointing at the start point */}
      {/* <line
        x1={20} y1={160} x2={p1_line.x - 8} y2={p1_line.y - 5}
        stroke="#4CAF50" strokeWidth={1.5} filter="url(#rough)"
        markerEnd="url(#arrowhead)"
        strokeDasharray={Math.hypot(42, 45)}
        strokeDashoffset={Math.hypot(42, 45) * (1 - yIntArrowRev)}
        opacity={tailFade(yIntArrowRev, 0.4)}
      />
      <g clipPath="url(#clipYIntLabel)">
        <text x="0" y="150" fontSize="14" fontFamily="sans-serif" fill="#4CAF50">
          y-intercept
        </text>
      </g> */}

      {/* ===================== FRAME 3: gradient sign explainer ===================== */}
      {/* <g clipPath="url(#clipMHeading)">
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

      {/* ===================== FRAME 4: worked example y = 2x + 4 ===================== */}
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