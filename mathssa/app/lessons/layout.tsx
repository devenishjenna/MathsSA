import Topbar from "./components/Topbar"
import Sidebar from "./components/Sidebar"

export default function LessonLayout(
  { children }: {children: React.ReactNode}
) {

  return <>
    <Topbar xp={0} />
    <div className="flex bg-amber-600">
      <Sidebar />
      <div className="bg-amber-200 flex-1">{children}</div>
    </div>
  </>
}