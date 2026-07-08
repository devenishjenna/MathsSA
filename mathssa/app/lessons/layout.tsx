import Topbar from "../components/Topbar"
import Sidebar from "./components/Sidebar"
import SymbolBackground from "../components/SymbolBackground"

export default function LessonLayout(
  { children }: {children: React.ReactNode}
) {

  return <div className="relative bg-navy-deep min-h-screen">
    <SymbolBackground onlyTopbar={false}/>
    <div className="relative z-10">
      <Topbar grade={10} />
      <div className="flex">
        <Sidebar grade={10}/>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  </div>
}