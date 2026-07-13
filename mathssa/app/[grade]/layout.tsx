import Topbar from "../components/Topbar"
import Sidebar from "../components/Sidebar"

export default function LessonLayout(
  { children }: {children: React.ReactNode}
) {

  return <div className="relative min-h-screen">
    <div className="relative z-10">
      <Topbar activeGrade={10} />
      <div className="flex">
        <Sidebar activeGrade={10}/>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  </div>
}