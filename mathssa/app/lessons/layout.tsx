import Topbar from "../components/Topbar"
import Sidebar from "./components/Sidebar"

export default function LessonLayout(
  { children }: {children: React.ReactNode}
) {

  return <>
    <Topbar grade={10} />
    <div className="flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  </>
}