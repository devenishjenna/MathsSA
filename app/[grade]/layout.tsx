import Topbar from "../components/Topbar"
import Sidebar from "../components/Sidebar"

interface LessonLayoutProps {
  children: React.ReactNode,
  params: Promise<{ grade:string }>
}

export default async function LessonLayout({ children, params}: LessonLayoutProps) {

  const { grade:gradeSlug } = await params
  const activeGrade = parseInt(gradeSlug.split('-').pop() ?? "", 10)

  return <div className="relative min-h-screen">
    <div className="relative z-10">
      <Topbar activeGrade={activeGrade} />
      <div className="flex">
        <Sidebar activeGrade={activeGrade}/>
        <div className="flex-1">{children}</div>
      </div>
    </div>  
  </div>
}