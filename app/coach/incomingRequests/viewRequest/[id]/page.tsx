'use client';
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

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

export default function ViewRequest() {
    const router = useRouter();
    const params = useParams();
    const id = parseInt(params.id as string);

    // Find the specific request by ID
    const request = requestList.find(req => req.id === id);

    if (!request) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-red-100 border border-red-400 text-red-300 px-4 py-3 rounded">
                        <p>Request not found.</p>
                        <Link href="/coach/incomingRequests/list" className="text-blue-600 hover:text-blue-900">
                            Back to Requests
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleAccept = () => {
        // Handle accept logic here
        console.log('Accepting request:', id);
        router.push('/coach/incomingRequests/list');
    };

    const handleDecline = () => {
        // Handle decline logic here
        console.log('Declining request:', id);
        router.push('/coach/incomingRequests/list');
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-white text-2xl font-bold mb-6">Request Details</h1>

                <div className="bg-black/10 backdrop-blur-lg shadow-md rounded-lg p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Request ID</label>
                            <p className="mt-1 text-lg text-white">{request.id}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">Status</label>
                            <span className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-medium ${request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                request.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                {request.status}
                            </span>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">Session Type</label>
                            <p className="mt-1 text-lg text-white">{request.session}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">Requested Date</label>
                            <p className="mt-1 text-lg text-white">{new Date(request.requestedDate).toLocaleDateString()}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">Service Type</label>
                            <p className="mt-1 text-lg text-white">{request.requestedService}</p>
                        </div>
                    </div>
                </div>

                {/* Action buttons */}
                {request.status === 'Pending' && (
                    <div className="bg-black/10 backdrop-blur-lg shadow-md rounded-lg p-6 mb-6">
                        <h2 className="text-lg font-medium text-white mb-4">Actions</h2>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleAccept}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-300 transition-colors"
                            >
                                Accept Request
                            </button>
                            <button
                                onClick={handleDecline}
                                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-300 transition-colors"
                            >
                                Decline Request
                            </button>
                        </div>
                    </div>
                )}

                <div className="bg-black/10 backdrop-blur-lg shadow-md rounded-lg p-6">
                    <Link href="/coach/incomingRequests/list" className="text-blue-600 hover:text-blue-900">
                        ← Back to Requests
                    </Link>
                </div>
            </div>
        </div>
    );
}