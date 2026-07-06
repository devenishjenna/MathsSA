interface Sym {
  sym: string
  size: number
  x: number
  y: number
  rotation: number
  opa: number
}

const symbols: Sym[] = [
{ sym: '∑',  size: 80, x:  -1,  y: 15, rotation: -4, opa: 0.18 },
{ sym: 'π',  size: 70, x:  8,  y:   4, rotation:  3, opa: 0.19 },
{ sym: '∫',  size: 80, x: 17,  y: -10, rotation: -5, opa: 0.17 },
{ sym: 'θ',  size: 90, x: 26,  y:   5, rotation:  4, opa: 0.18 },
{ sym: '√',  size: 70, x: 62,  y: -12, rotation: -3, opa: 0.17 },
{ sym: 'Δ',  size: 80, x: 71,  y:   4, rotation:  5, opa: 0.18 },
{ sym: '∞',  size: 90, x: 81,  y: -10, rotation: -4, opa: 0.17 },
{ sym: '≠',  size: 70, x: 91,  y:   4, rotation:  3, opa: 0.18 },

// // ── HERO ONLY (y >= 56) — left column ──
// { sym: '+',  size: 70, x:  3,  y:  70, rotation:  4, opa: 0.17 },
// { sym: '=',  size: 80, x: 13,  y:  80, rotation: -3, opa: 0.16 },
// { sym: '~',  size: 70, x:  5,  y: 155, rotation:  5, opa: 0.17 },
// { sym: '÷',  size: 80, x: 15,  y: 165, rotation: -4, opa: 0.16 },
// { sym: '×',  size: 90, x:  2,  y: 240, rotation:  3, opa: 0.17 },
// { sym: '⁒',  size: 80, x: 13,  y: 250, rotation: -5, opa: 0.16 },
// { sym: '∴',  size: 80, x:  6,  y: 320, rotation:  4, opa: 0.17 },
// { sym: '≤',  size: 90, x: 16,  y: 330, rotation: -3, opa: 0.16 },
// { sym: 'ℕ',  size: 70, x:  4,  y: 400, rotation:  5, opa: 0.17 },
// { sym: '𝛺',  size: 80, x: 14,  y: 410, rotation: -4, opa: 0.16 },
// { sym: '𝜆',  size: 90, x:  7,  y: 480, rotation:  3, opa: 0.17 },
// { sym: '𝛽',  size: 80, x: 17,  y: 490, rotation: -5, opa: 0.16 },

// // ── HERO ONLY (y >= 56) — right column ──
// { sym: '𝛼',  size: 80, x: 66,  y:  70, rotation:  5, opa: 0.17 },
// { sym: '𝜎',  size: 90, x: 76,  y:  80, rotation: -3, opa: 0.16 },
// { sym: '𝜑',  size: 80, x: 86,  y:  72, rotation:  4, opa: 0.17 },
]
const SYMBOL_LIST = ['∑','π','∫','θ','√','Δ','∞','≠','+','=','~','÷','×','∴','≤','Ω','λ','β','α','σ','φ','ℕ']

function generateSymbols(cols: number, rows: number): Sym[] {
  const symbolArray: Sym[] = []
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const i = row * cols + col // turning 2D array into 1D
      symbolArray.push({
        sym: SYMBOL_LIST[i % SYMBOL_LIST.length],
        size: 100,
        x: col * (100 / cols) + (col * 1) - 0.5,
        y: row * (100 / rows)  + (row * 2) + (col % 2 * 10) - 15,
        rotation: (row % 2 * 20) - 10,
        opa: 0.10
      })
    }
  } 
  return symbolArray
}

interface SymbolBackgroundProps {
  onlyTopbar?: boolean
}

export default function SymbolBackground({ onlyTopbar }: SymbolBackgroundProps) {
  
  const symbols = generateSymbols(18, 7)
  
  return <div className="absolute inset-0 z-20" 
              style={{
                maskImage: 'radial-gradient(ellipse 30% 40% at 50% 50%, transparent 70%, black 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 30% 40% at 50% 50%, transparent 70%, black 100%)'
              }}>
    {symbols.map((sym, i) => (
      <div key={i}
        style={{
          position: 'absolute',
          top: `${sym.y}%`,
          left: `${sym.x}%`,
          fontSize: `${sym.size}px`,
          opacity: sym.opa,
          transform: `rotate(${sym.rotation}deg)`,
          fontFamily: '"Georgia", serif',
          color: "var(--color-brand-blue)"
        }}>
        {sym.sym}
      </div>
    )
    )}
  </div>
}