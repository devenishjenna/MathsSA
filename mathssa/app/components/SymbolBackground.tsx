interface Sym {
  sym: string
  size: number
  x: number
  y: number
  rotation: number
  opa: number
}

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
  
  const symbols = generateSymbols(18, 33) // TODO: this needs to change depending on the screen size
  // TODO: only generate the first row of symbols when onlyTopbar = true and maybe the size and frequency will change
  
  return <div className="absolute inset-0" 
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