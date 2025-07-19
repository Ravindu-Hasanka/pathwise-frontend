'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";

const requestList = [
    {
        id: 1,
        session: "Career Coaching",
        requestedDate: "2025-10-01",
        requestedService: "Remote",
        status: "Pending"

    },
    {
        id: 2,
        session: "Resume Review",
        requestedDate: "2025-10-02",
        requestedService: "In-person",
        status: "Accepted"
    },
    {
        id: 3,
        session: "Interview Preparation",
        requestedDate: "2025-10-03",
        requestedService: "Remote",
        status: "Declined"
    }
];
export default function IncomingRequests() {
    const router = useRouter();
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
                            <Link href="/dashboard" className="text-white font-medium">
                                Dashboard
                            </Link>
                            <Link
                                href="/career-path"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                Career Path
                            </Link>
                            <Link
                                href="/skills"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                Skills
                            </Link>
                            <Link
                                href="/jobs"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                Jobs
                            </Link>
                            <Link
                                href="/community"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                Community
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-white font-medium">Alex Thompson</p>
                                <p className="text-gray-400 text-sm">Software Developer</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">AT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-white mb-6">Incoming Requests</h1>
                    <div className="bg-black/10 backdrop-blur-lg rounded-lg shadow-lg p-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Session</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Requested Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Requested Service</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-black/10 backdrop-blur-lg divide-y divide-gray-200">
                                {requestList.map((request) => (
                                    <tr key={request.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{request.session}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{request.requestedDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{request.requestedService}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{request.status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link href={`/coach/incomingRequests/viewRequest/${request.id}`} className="text-blue-600 hover:text-blue-900 flex items-center">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </Link>
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