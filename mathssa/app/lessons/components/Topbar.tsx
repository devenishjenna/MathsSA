export default function Topbar({ xp }: { xp: number }) {

    return (
        <div className="sticky top-0 h-13 bg-white border-b border-blue-200 px-6 flex items-center justify-between">
            <div className="text-lg font-bold text-blue-950"><span className="text-blue-500">Maths</span>SA</div>
            <div className="text-base py-0.75 px-2.5 bg-blue-400 border-2 border-blue-900 rounded-[10px] text-blue-950">Grade 10</div>
            <div className="text-xl text-green-800 flex gap-1">⭐<span className="font-bold text-green-700">{xp}</span>XP</div>
        </div>
    )
}