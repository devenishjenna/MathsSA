import Link from "next/link"

interface TopbarProps {
    grade?: number
}

export default function Topbar({ grade }: TopbarProps) {

    return (
        <div className="sticky top-0 h-14 border-b border-navy-mid px-6 flex items-center justify-between z-10">
            
            {/* logo with link to home */}
            <Link href="/" className="text-lg font-bold text-text-primary">
                <span className="text-brand-blue">Maths</span>SA
            </Link>
            
            {/* grade pill */}
            <div className="flex items-center gap-3">
                {grade && (
                <div className="text-l px-3 py-1 bg-navy-mid border border-navy-light rounded-full text-text-muted">
                    Grade {grade}
                </div>
                )}
            </div>

            {/* sign up or log in links */}
            <div className="flex items-center gap-3">
                {/* TODO: Replace with user name/avatar once auth is added */}
                <Link href="/login" className="text-sm text-text-muted hover:text-text-primary">
                Log in
                </Link>
                <Link href="/signup" className="text-sm px-3 py-1 bg-brand-blue text-white rounded-lg">
                Sign up
                </Link>
            </div>
        </div>
    )
}