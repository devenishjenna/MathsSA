import Topbar from "./lessons/components/Topbar"
import SymbolBackground from "./lessons/components/SymbolBackground"
import Link from "next/link"

export default function Home() {
  return <>
    <Topbar />

    <main className="min-h-screen bg-navy-deep flex flex-col items-center justify-center relative overflow-hidden px-6">
        <SymbolBackground />

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-xl flex flex-col items-center gap-5">

          <div className="text-xs font-medium text-brand-blue uppercase tracking-widest">
            CAPS aligned · South Africa
          </div>

          <h1 className="text-4xl font-bold text-text-primary leading-tight">
            Master maths.<br />Actually understand it.
          </h1>

          <p className="text-text-muted text-base leading-relaxed max-w-sm">
            Interactive lessons, real explanations, and practice built for South African students. Low data. No fluff.
          </p>

          <Link
            href="/lessons"
            className="bg-brand-blue text-white px-8 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Start learning!
          </Link>

          <p className="text-xs text-text-muted">
            Explore the first topic for free!
          </p>

        </div>

    </main>
  </>
}