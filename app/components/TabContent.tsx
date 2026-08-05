interface TabContentProps {
  children: React.ReactNode
  isActive: boolean
}

export default function TabContent({ children, isActive }: TabContentProps) {
  return <div className={`${isActive ? 'h-full' : 'hidden'} text-text-dark`}>
    {children}
  </div>
}