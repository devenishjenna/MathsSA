import Topbar from "./components/Topbar"
import SymbolBackground from "./components/SymbolBackground"
import Hero from "./components/Hero"

export default function Home() {
  return <>
    <main className="min-h-screen bg-navy-deep relative overflow-hidden">
       
        <Topbar />
        <SymbolBackground onlyTopbar={false}/>
        <Hero />
   
    </main>
  </>
}