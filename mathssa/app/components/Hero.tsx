"use client"

import { useState } from "react"
import { InlineMath } from "react-katex"
import { GradeSelector } from "./GradeSelectionModal"

export default function Hero() {

    const [modalOpen, setModalOpen] = useState(false)

    return <>
        <div className="relative flex flex-col items-center justify-center px-6"
          style={{ minHeight: 'calc(100vh - 56px)' }}>
          <div className="relative z-10 text-center max-w-xl flex flex-col items-center gap-5">

            <div className="text-xs font-medium text-brand-blue uppercase tracking-widest">
              CAPS aligned · South Africa
              <InlineMath math="x"/>
            </div>

            <h1 className="text-4xl font-bold text-text-primary leading-tight">
              Master maths.<br />Actually understand it.
            </h1>

            <p className="text-text-muted text-base leading-relaxed max-w-sm">
              Interactive lessons, real explanations, and practice built for South African students. Low data. No fluff.
            </p>

            <button
              onClick={() => setModalOpen(true)}
              className="bg-brand-blue text-white px-8 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
            >
              Start learning!
            </button>

            <p className="text-xs text-text-muted">
              Explore the first topic for free!
            </p>

          </div>
        </div>

        <GradeSelector
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
    </>
}