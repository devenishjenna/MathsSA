interface TabContentProps {
  children: React.ReactNode
  isActive: boolean
}

export default function TabContent({ children, isActive }: TabContentProps) {
  return <div className={`${isActive ? '' : 'hidden'} text-text-dark`}>
    {children}
  </div>
}