'use client';
import Link from "next/link";
import { useState } from "react";

const earningsData = {
    totalEarnings: 15420.50,
    currentMonth: 2850.00,
    lastMonth: 3200.00,
    pendingPayouts: 850.00,
    availableBalance: 2000.50,
    sessionsThisMonth: 28,
    averageSessionRate: 125.00
};

// Sample session history
const sessionHistory = [
    {
        id: 1,
        coacheeName: "John Smith",
        coacheeAvatar: "JS",
        sessionType: "Career Coaching",
        date: "2025-07-20",
        time: "10:00 AM",
        duration: "1 hour",
        status: "Completed",
        earnings: 125.00,
        paymentStatus: "Paid"
    },
    {
        id: 2,
        coacheeName: "Sarah Johnson",
        coacheeAvatar: "SJ",
        sessionType: "Resume Review",
        date: "2025-07-19",
        time: "2:00 PM",
        duration: "45 minutes",
        status: "Completed",
        earnings: 95.00,
        paymentStatus: "Pending"
    },
    {
        id: 3,
        coacheeName: "Mike Chen",
        coacheeAvatar: "MC",
        sessionType: "Interview Preparation",
        date: "2025-07-18",
        time: "11:30 AM",
        duration: "1.5 hours",
        status: "Completed",
        earnings: 180.00,
        paymentStatus: "Paid"
    },
    {
        id: 4,
        coacheeName: "Emily Davis",
        coacheeAvatar: "ED",
        sessionType: "Goal Setting",
        date: "2025-07-17",
        time: "9:00 AM",
        duration: "1 hour",
        status: "Completed",
        earnings: 125.00,
        paymentStatus: "Paid"
    },
    {
        id: 5,
        coacheeName: "David Wilson",
        coacheeAvatar: "DW",
        sessionType: "Career Coaching",
        date: "2025-07-16",
        time: "3:30 PM",
        duration: "1 hour",
        status: "Cancelled",
        earnings: 0.00,
        paymentStatus: "N/A"
    }
];

export default function Earnings() {
    const [filterPeriod, setFilterPeriod] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Paid': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Processing': return 'bg-blue-100 text-blue-800';
            case 'N/A': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getSessionStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            case 'No-show': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredSessions = sessionHistory.filter(session => {
        if (filterStatus !== 'all' && session.paymentStatus !== filterStatus) return false;
        // Add date filtering logic here based on filterPeriod
        return true;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navigation */}
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
                            <Link href="/coach/myCoachees/view" className="text-gray-300 hover:text-white transition-colors">
                                My Coachees
                            </Link>
                            <Link href="/coach/myCoachees/schedule" className="text-gray-300 hover:text-white transition-colors">
                                Schedule
                            </Link>
                            <Link href="/coach/incomingRequests/list" className="text-gray-300 hover:text-white transition-colors">
                                Requests
                            </Link>
                            <Link href="/coach/earnings" className="text-white font-medium">
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
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Earnings & Session History</h1>
                    <p className="text-gray-300">Track your coaching earnings and session performance</p>
                </div>

                {/* Earnings Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-black/10 backdrop-blur-lg rounded-lg p-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-400">
                                ${earningsData.totalEarnings.toLocaleString()}
                            </div>
                            <div className="text-gray-300 text-sm">Total Earnings</div>
                        </div>
                    </div>

                    <div className="bg-black/10 backdrop-blur-lg rounded-lg p-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-400">
                                ${earningsData.currentMonth.toLocaleString()}
                            </div>
                            <div className="text-gray-300 text-sm">This Month</div>
                        </div>
                    </div>

                    <div className="bg-black/10 backdrop-blur-lg rounded-lg p-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-400">
                                ${earningsData.availableBalance.toLocaleString()}
                            </div>
                            <div className="text-gray-300 text-sm">Available Balance</div>
                        </div>
                    </div>

                    <div className="bg-black/10 backdrop-blur-lg rounded-lg p-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-400">
                                ${earningsData.pendingPayouts.toLocaleString()}
                            </div>
                            <div className="text-gray-300 text-sm">Pending Payouts</div>
                        </div>
                    </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-black/10 backdrop-blur-lg rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-medium text-white">Sessions This Month</h3>
                                <p className="text-3xl font-bold text-white">{earningsData.sessionsThisMonth}</p>
                            </div>
                            <div className="text-green-400 text-sm">
                                +12% from last month
                            </div>
                        </div>
                    </div>

                    <div className="bg-black/10 backdrop-blur-lg rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-medium text-white">Average Session Rate</h3>
                                <p className="text-3xl font-bold text-white">${earningsData.averageSessionRate}</p>
                            </div>
                            <div className="text-green-400 text-sm">
                                +5% from last month
                            </div>
                        </div>
                    </div>

                    <div className="bg-black/10 backdrop-blur-lg rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-medium text-white">Monthly Growth</h3>
                                <p className="text-3xl font-bold text-white">
                                    {earningsData.currentMonth > earningsData.lastMonth ? '+' : ''}
                                    {(((earningsData.currentMonth - earningsData.lastMonth) / earningsData.lastMonth) * 100).toFixed(1)}%
                                </p>
                            </div>
                            <div className={`text-sm ${earningsData.currentMonth > earningsData.lastMonth ? 'text-green-400' : 'text-red-400'}`}>
                                vs last month
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payout Section */}
                <div className="bg-black/10 backdrop-blur-lg rounded-lg p-6 mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold text-white mb-2">Payout Settings</h2>
                            <p className="text-gray-300">Manage your payment preferences and schedule</p>
                        </div>
                        <div className="flex space-x-3">
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                Request Payout
                            </button>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Payment Settings
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-black/10 backdrop-blur-lg rounded-lg p-6 mb-6">
                    <div className="flex flex-wrap items-center gap-4">
                        <div>
                            <label className="text-white font-medium mr-2">Period:</label>
                            <select
                                value={filterPeriod}
                                onChange={(e) => setFilterPeriod(e.target.value)}
                                className="bg-black/20 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                            >
                                <option value="all">All Time</option>
                                <option value="thisMonth">This Month</option>
                                <option value="lastMonth">Last Month</option>
                                <option value="last3Months">Last 3 Months</option>
                                <option value="thisYear">This Year</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-white font-medium mr-2">Payment Status:</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="bg-black/20 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                            >
                                <option value="all">All Status</option>
                                <option value="Paid">Paid</option>
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                            </select>
                        </div>

                        <div className="text-gray-300 text-sm ml-auto">
                            {filteredSessions.length} session(s) found
                        </div>
                    </div>
                </div>

                {/* Session History Table */}
                <div className="bg-black/10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/10">
                        <h2 className="text-xl font-semibold text-white">Session History</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-600">
                            <thead className="bg-black/20">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Session Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Date & Time
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Duration
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Earnings
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Payment
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-600">
                                {filteredSessions.map((session) => (
                                    <tr key={session.id} className="hover:bg-black/20">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                                                    <span className="text-white font-bold text-sm">{session.coacheeAvatar}</span>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-white">{session.coacheeName}</div>
                                                    <div className="text-sm text-gray-400">{session.sessionType}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-white">{new Date(session.date).toLocaleDateString()}</div>
                                            <div className="text-sm text-gray-400">{session.time}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                            {session.duration}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSessionStatusColor(session.status)}`}>
                                                {session.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                            {session.earnings > 0 ? `$${session.earnings.toFixed(2)}` : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.paymentStatus)}`}>
                                                {session.paymentStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Footer */}
                <div className="bg-black/10 backdrop-blur-lg rounded-lg p-6 mt-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-medium text-white">Export Options</h3>
                            <p className="text-gray-300 text-sm">Download your earnings data for tax purposes</p>
                        </div>
                        <div className="flex space-x-3">
                            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                Export CSV
                            </button>
                            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                Generate Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}