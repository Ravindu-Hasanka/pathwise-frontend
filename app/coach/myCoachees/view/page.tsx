'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";

const coacheesList = [
    {
        id: 1,
        name: "John Smith",
        email: "john.smith@email.com",
        avatar: "JS",
        joinDate: "2025-01-15",
        sessionsCompleted: 8,
        nextSession: "2025-07-22",
        careerPath: "Software Development",
        currentStatus: "Active",
        progress: 75,
        lastActivity: "2025-07-18"
    },
    {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        avatar: "SJ",
        joinDate: "2025-02-10",
        sessionsCompleted: 12,
        nextSession: "2025-07-25",
        careerPath: "Data Science",
        currentStatus: "Active",
        progress: 85,
        lastActivity: "2025-07-19"
    },
    {
        id: 3,
        name: "Mike Chen",
        email: "mike.chen@email.com",
        avatar: "MC",
        joinDate: "2024-12-01",
        sessionsCompleted: 15,
        nextSession: "2025-07-21",
        careerPath: "Product Management",
        currentStatus: "Active",
        progress: 90,
        lastActivity: "2025-07-17"
    }
];

export default function MyCoachees() {
    const router = useRouter();

    const handleViewProfile = (coacheeId: number) => {
        router.push(`/coach/myCoachees/profile/${coacheeId}`);
    };

    const getProgressColor = (progress: number) => {
        if (progress >= 80) return 'bg-green-500';
        if (progress >= 60) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <nav className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">P</span>
                            </div>
                            <span className="text-white font-bold text-xl">Pathwise</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/coach/dashboard" className="text-gray-300 hover:text-white transition-colors">
                                Dashboard
                            </Link>
                            <Link
                                href="/coach/myCoachees/view"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                My Coachees
                            </Link>
                            <Link
                                href="/coach/myCoachees/schedule"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                Schedule
                            </Link>
                            <Link
                                href="/coach/incomingRequests/list"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                Requests
                            </Link>
                            <Link href="/coach/earnings" className="text-gray-300 hover:text-white transition-colors">
                                Earnings
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-white font-medium">Alex Thompson</p>
                                <p className="text-gray-400 text-sm">Career Coach</p>
                            </div>
                            <Link href="/coach/profile">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer">
                                    <span className="text-white font-bold">AT</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">My Coachees</h1>
                    <div className="text-sm text-gray-300">
                        Active Coachees: <span className="font-semibold text-white">{coacheesList.length}</span>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-black/10 backdrop-blur-lg rounded-lg p-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-400">
                                {coacheesList.reduce((sum, coachee) => sum + coachee.sessionsCompleted, 0)}
                            </div>
                            <div className="text-gray-300 text-sm">Total Sessions</div>
                        </div>
                    </div>
                    <div className="bg-black/10 backdrop-blur-lg rounded-lg p-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-400">{coacheesList.length}</div>
                            <div className="text-gray-300 text-sm">Active Coachees</div>
                        </div>
                    </div>
                    <div className="bg-black/10 backdrop-blur-lg rounded-lg p-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-400">
                                {Math.round(coacheesList.reduce((sum, coachee) => sum + coachee.progress, 0) / coacheesList.length)}%
                            </div>
                            <div className="text-gray-300 text-sm">Average Progress</div>
                        </div>
                    </div>
                </div>

                {/* Coachees List */}
                <div className="bg-black/10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/10">
                        <h2 className="text-xl font-semibold text-white">Active Coachees</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-600">
                            <thead className="bg-black/20">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Coachee
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Career Path
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Progress
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Sessions
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Next Session
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-600">
                                {coacheesList.map((coachee) => (
                                    <tr key={coachee.id} className="hover:bg-black/20">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                                                    <span className="text-white font-bold text-sm">{coachee.avatar}</span>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-white">{coachee.name}</div>
                                                    <div className="text-sm text-gray-400">{coachee.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-white">{coachee.careerPath}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-full bg-gray-600 rounded-full h-2 mr-2">
                                                    <div
                                                        className={`h-2 rounded-full ${getProgressColor(coachee.progress)}`}
                                                        style={{ width: `${coachee.progress}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm text-white">{coachee.progress}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                            {coachee.sessionsCompleted}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                            {new Date(coachee.nextSession).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleViewProfile(coachee.id)}
                                                    className="text-blue-400 hover:text-blue-300"
                                                >
                                                    View Profile
                                                </button>
                                                <Link className="text-green-400 hover:text-green-300" href={`/coach/myCoachees/schedule?coacheeId=${coachee.id}`} >
                                                    Schedule
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}