'use client';
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const scheduleData = [
    {
        id: 1,
        coacheeId: 1,
        coacheeName: "John Smith",
        coacheeAvatar: "JS",
        sessionType: "Career Coaching",
        date: "2025-07-22",
        time: "10:00 AM",
        duration: "1 hour",
        status: "Confirmed",
        sessionMode: "Remote",
        notes: "Focus on career transition planning"
    },
    {
        id: 2,
        coacheeId: 2,
        coacheeName: "Sarah Johnson",
        coacheeAvatar: "SJ",
        sessionType: "Resume Review",
        date: "2025-07-22",
        time: "2:00 PM",
        duration: "45 minutes",
        status: "Pending",
        sessionMode: "In-person",
        notes: "Final resume review before job applications"
    },
    {
        id: 3,
        coacheeId: 3,
        coacheeName: "Mike Chen",
        coacheeAvatar: "MC",
        sessionType: "Interview Preparation",
        date: "2025-07-23",
        time: "11:30 AM",
        duration: "1.5 hours",
        status: "Confirmed",
        sessionMode: "Remote",
        notes: "Mock interview for senior PM role"
    },
    {
        id: 4,
        coacheeId: 4,
        coacheeName: "Emily Davis",
        coacheeAvatar: "ED",
        sessionType: "Goal Setting",
        date: "2025-07-24",
        time: "9:00 AM",
        duration: "1 hour",
        status: "Confirmed",
        sessionMode: "Remote",
        notes: "Q3 goal setting and review"
    }
];

const coacheesList = [
    { id: 1, name: "John Smith", avatar: "JS" },
    { id: 2, name: "Sarah Johnson", avatar: "SJ" },
    { id: 3, name: "Mike Chen", avatar: "MC" },
    { id: 4, name: "Emily Davis", avatar: "ED" }
];

const timeSlots = [
    "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM"
];

export default function Schedule() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const coacheeId = searchParams.get('coacheeId');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [showNewSession, setShowNewSession] = useState(false);
    const [sessions, setSessions] = useState(scheduleData);
    const [newSession, setNewSession] = useState({
        coacheeId: coacheeId || '',
        sessionType: '',
        date: selectedDate,
        time: '',
        duration: '1 hour',
        sessionMode: 'Remote',
        notes: ''
    });

    // Filter sessions by date and coachee
    let filteredSessions = sessions.filter(session =>
        session.date === selectedDate
    );

    if (coacheeId) {
        filteredSessions = filteredSessions.filter(session =>
            session.coacheeId === parseInt(coacheeId)
        );
    }

    const selectedCoachee = coacheeId ?
        coacheesList.find(c => c.id === parseInt(coacheeId)) : null;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleScheduleSession = () => {
        // Validation
        if (!newSession.coacheeId || !newSession.sessionType || !newSession.date || !newSession.time) {
            alert('Please fill in all required fields');
            return;
        }
        const coachee = coacheesList.find(c => c.id === parseInt(newSession.coacheeId));
        if (!coachee) {
            alert('Selected coachee not found');
            return;
        }
        const sessionToAdd = {
            id: sessions.length + 1, // Simple ID generation
            coacheeId: parseInt(newSession.coacheeId),
            coacheeName: coachee?.name || 'Unknown',
            coacheeAvatar: coachee?.avatar || 'UK',
            sessionType: newSession.sessionType,
            date: newSession.date,
            time: newSession.time,
            duration: newSession.duration,
            status: 'Confirmed',
            sessionMode: newSession.sessionMode,
            notes: newSession.notes
        };

        setSessions(prevSessions => [...prevSessions, sessionToAdd]);

        alert(`Session scheduled successfully for ${coachee?.name} on ${new Date(newSession.date).toLocaleDateString()} at ${newSession.time}`);

        setShowNewSession(false);
        setNewSession({
            coacheeId: coacheeId || '',
            sessionType: '',
            date: selectedDate,
            time: '',
            duration: '1 hour',
            sessionMode: 'Remote',
            notes: ''
        });

        if (newSession.date !== selectedDate) {
            setSelectedDate(newSession.date);
        }
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
                            <Link href="/coach/myCoachees/view" className="text-gray-300 hover:text-white transition-colors">
                                My Coachees
                            </Link>
                            <Link href="/coach/myCoachees/schedule" className="text-white font-medium">
                                Schedule
                            </Link>
                            <Link href="/coach/incomingRequests/list" className="text-gray-300 hover:text-white transition-colors">
                                Requests
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            {selectedCoachee ? `Schedule for ${selectedCoachee.name}` : 'My Schedule'}
                        </h1>
                        {selectedCoachee && (
                            <Link
                                href="/coach/myCoachees/view"
                                className="text-blue-400 hover:text-blue-300 text-sm"
                            >
                                ← Back to All Coachees
                            </Link>
                        )}
                    </div>
                    <button
                        onClick={() => setShowNewSession(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        + Schedule Session
                    </button>
                </div>

                {/* Date Filter */}
                <div className="bg-black/10 backdrop-blur-lg rounded-lg p-6 mb-6">
                    <div className="flex items-center space-x-4">
                        <label className="text-white font-medium">Select Date:</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="bg-black/20 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                        />
                        <div className="text-gray-300 text-sm">
                            {filteredSessions.length} session(s) scheduled
                            {selectedCoachee && ` for ${selectedCoachee.name}`}
                        </div>
                    </div>
                </div>

                {/* Sessions List */}
                <div className="bg-black/10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden mb-6">
                    <div className="px-6 py-4 border-b border-white/10">
                        <h2 className="text-xl font-semibold text-white">
                            Sessions for {new Date(selectedDate).toLocaleDateString()}
                            {selectedCoachee && ` - ${selectedCoachee.name}`}
                        </h2>
                    </div>

                    {filteredSessions.length === 0 ? (
                        <div className="p-8 text-center">
                            <div className="text-gray-400 text-lg">
                                No sessions scheduled for this date
                                {selectedCoachee && ` with ${selectedCoachee.name}`}
                            </div>
                            <button
                                onClick={() => setShowNewSession(true)}
                                className="mt-4 text-blue-400 hover:text-blue-300"
                            >
                                Schedule a session
                            </button>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-600">
                            {filteredSessions.map((session) => (
                                <div key={session.id} className="p-6 hover:bg-black/20">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold">{session.coacheeAvatar}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-medium text-white">{session.coacheeName}</h3>
                                                <p className="text-gray-300">{session.sessionType}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-white font-medium">{session.time}</div>
                                            <div className="text-gray-400 text-sm">{session.duration}</div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                                                {session.status}
                                            </span>
                                            <span className="text-gray-300 text-sm">
                                                {session.sessionMode}
                                            </span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="text-blue-400 hover:text-blue-300 text-sm">
                                                Edit
                                            </button>
                                            <button className="text-green-400 hover:text-green-300 text-sm">
                                                Join
                                            </button>
                                            <button className="text-red-400 hover:text-red-300 text-sm">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>

                                    {session.notes && (
                                        <div className="mt-3 p-3 bg-black/20 rounded-lg">
                                            <p className="text-gray-300 text-sm">{session.notes}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* New Session Modal */}
                {showNewSession && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
                            <h3 className="text-xl font-bold text-white mb-4">
                                Schedule New Session
                                {selectedCoachee && ` for ${selectedCoachee.name}`}
                            </h3>

                            <div className="space-y-4">
                                {!coacheeId && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Select Coachee
                                        </label>
                                        <select
                                            value={newSession.coacheeId}
                                            onChange={(e) => setNewSession({ ...newSession, coacheeId: e.target.value })}
                                            className="w-full bg-black/20 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                                        >
                                            <option value="">Select coachee</option>
                                            {coacheesList.map(coachee => (
                                                <option key={coachee.id} value={coachee.id}>{coachee.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Session Type
                                    </label>
                                    <select
                                        value={newSession.sessionType}
                                        onChange={(e) => setNewSession({ ...newSession, sessionType: e.target.value })}
                                        className="w-full bg-black/20 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="">Select session type</option>
                                        <option value="Career Coaching">Career Coaching</option>
                                        <option value="Resume Review">Resume Review</option>
                                        <option value="Interview Preparation">Interview Preparation</option>
                                        <option value="Goal Setting">Goal Setting</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={newSession.date}
                                        onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                                        className="w-full bg-black/20 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Time
                                    </label>
                                    <select
                                        value={newSession.time}
                                        onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                                        className="w-full bg-black/20 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="">Select time</option>
                                        {timeSlots.map(time => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Duration
                                    </label>
                                    <select
                                        value={newSession.duration}
                                        onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
                                        className="w-full bg-black/20 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="30 minutes">30 minutes</option>
                                        <option value="45 minutes">45 minutes</option>
                                        <option value="1 hour">1 hour</option>
                                        <option value="1.5 hours">1.5 hours</option>
                                        <option value="2 hours">2 hours</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Session Mode
                                    </label>
                                    <select
                                        value={newSession.sessionMode}
                                        onChange={(e) => setNewSession({ ...newSession, sessionMode: e.target.value })}
                                        className="w-full bg-black/20 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="Remote">Remote</option>
                                        <option value="In-person">In-person</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Notes (Optional)
                                    </label>
                                    <textarea
                                        value={newSession.notes}
                                        onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
                                        rows={3}
                                        className="w-full bg-black/20 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                                        placeholder="Add any notes about this session..."
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={() => setShowNewSession(false)}
                                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleScheduleSession}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Schedule Session
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}