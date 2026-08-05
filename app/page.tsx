import Topbar from "./components/Topbar"
import Hero from "./components/Hero"

export default function Home() {
  return <>
    <main className="min-h-screen relative overflow-hidden">

        <Topbar />
        <div className="absolute inset-0"
          style={{
            background: 'rgb(13, 27, 42)',
            maskImage: 'radial-gradient(ellipse 60% 70% at 50% 55%, black 30%, transparent 50%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 50%)'
          }}>
        </div>
        <Hero />

    </main>
  </>
}