"use client";

import Link from "next/link";
import { Calendar } from "../../../components/ui/calendar";
import { BarChart3, CalendarCheck, Clock, Star, Users, LibraryBig } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CoachDashboardPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navigation Bar */}
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
                            <Link href="/coach/dashboard" className="text-white font-medium">
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
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Coach Alex! 👋</h1>
                    <p className="text-gray-300 text-lg">Empower your coachees to achieve their career goals.</p>
                </div>

                {/* Stats Cards - Make them clickable */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Link href="/coach/myCoachees/view">
                        <Card className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/30 hover:scale-105 transition-transform cursor-pointer">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-300 text-sm font-medium">Active Coachees</p>
                                        <p className="text-white text-3xl font-bold">18</p>
                                    </div>
                                    <Users className="h-8 w-8 text-blue-400" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/coach/myCoachees/schedule">
                        <Card className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-purple-500/30 hover:scale-105 transition-transform cursor-pointer">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-purple-300 text-sm font-medium">Sessions This Month</p>
                                        <p className="text-white text-3xl font-bold">42</p>
                                    </div>
                                    <CalendarCheck className="h-8 w-8 text-purple-400" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/coach/profile">
                        <Card className="bg-gradient-to-r from-green-500/20 to-green-600/20 border-green-500/30 hover:scale-105 transition-transform cursor-pointer">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-300 text-sm font-medium">Feedback Score</p>
                                        <p className="text-white text-3xl font-bold">4.9</p>
                                    </div>
                                    <Star className="h-8 w-8 text-green-400" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/coach/incomingRequests/list">
                        <Card className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-orange-500/30 hover:scale-105 transition-transform cursor-pointer">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-orange-300 text-sm font-medium">Pending Requests</p>
                                        <p className="text-white text-3xl font-bold">5</p>
                                    </div>
                                    <Clock className="h-8 w-8 text-orange-400" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Quick Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Link href="/coach/myCoachees/schedule">
                        <Card className="bg-slate-800/50 border-white/10 hover:bg-slate-800/70 transition-colors cursor-pointer">
                            <CardContent className="p-6 text-center">
                                <CalendarCheck className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                                <h3 className="text-white text-lg font-semibold mb-2">Schedule Session</h3>
                                <p className="text-gray-400">Book a new session with your coachees</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/coach/incomingRequests/list">
                        <Card className="bg-slate-800/50 border-white/10 hover:bg-slate-800/70 transition-colors cursor-pointer">
                            <CardContent className="p-6 text-center">
                                <Clock className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                                <h3 className="text-white text-lg font-semibold mb-2">Review Requests</h3>
                                <p className="text-gray-400">Check and respond to coaching requests</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/coach/myCoachees/view">
                        <Card className="bg-slate-800/50 border-white/10 hover:bg-slate-800/70 transition-colors cursor-pointer">
                            <CardContent className="p-6 text-center">
                                <Users className="h-12 w-12 text-green-400 mx-auto mb-4" />
                                <h3 className="text-white text-lg font-semibold mb-2">Manage Coachees</h3>
                                <p className="text-gray-400">View and manage your coachee profiles</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Session Updates */}
                <div className="bg-slate-800/50 border-white/10 py-8 rounded-xl mt-8">
                    <div className="flex flex-col items-center justify-center mb-8 px-4">
                        <div className="flex items-center justify-center mb-2">
                            <LibraryBig className="mr-2 h-5 w-5 text-white" />
                            <span className="text-white text-2xl font-semibold">Session Updates</span>
                        </div>
                        <p className="text-gray-300 text-center max-w-2xl">
                            View and manage your scheduled sessions with coachees.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Calendar */}
                        <div className="flex flex-col items-center justify-center h-full">
                            <Card className="bg-transparent shadow-none border-none w-full max-w-md mx-auto">
                                <CardContent className="p-6 flex flex-col items-center">
                                    <div className="flex justify-center w-full">
                                        <Calendar />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Actions and Info */}
                        <div className="flex flex-col items-center justify-center h-full space-y-8">
                            <div className="flex gap-4 mt-2">
                                <Link href="/coach/myCoachees/schedule">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                                        Schedule New Session
                                    </Button>
                                </Link>
                                <Button className="bg-purple-600 hover:bg-purple-700 text-white font-medium">
                                    Send Reminder
                                </Button>
                            </div>

                            <div className="w-full max-w-md mx-auto bg-slate-700/30 rounded-lg p-4 border border-white/10">
                                <h3 className="text-lg font-semibold text-white mb-2 text-center">Next Sessions</h3>
                                <ul className="divide-y divide-slate-700">
                                    <li className="py-2 flex justify-between items-center">
                                        <span className="text-white">July 22, 10:00 AM – John Smith</span>
                                        <span className="text-gray-400 text-sm">Career Coaching</span>
                                    </li>
                                    <li className="py-2 flex justify-between items-center">
                                        <span className="text-white">July 22, 2:00 PM – Sarah Johnson</span>
                                        <span className="text-gray-400 text-sm">Resume Review</span>
                                    </li>
                                </ul>
                                <div className="mt-4 text-center">
                                    <Link href="/coach/myCoachees/schedule" className="text-blue-400 hover:text-blue-300 text-sm">
                                        View All Sessions →
                                    </Link>
                                </div>
                            </div>

                            <div className="w-full max-w-md mx-auto">
                                <h3 className="text-lg font-semibold text-white mb-2 text-center">Recent Feedback</h3>
                                <Card className="bg-slate-700 rounded-lg border-none">
                                    <CardContent className="p-4 text-gray-200 text-center">
                                        "Great session! Helped me clarify my next steps." – Sarah Johnson
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}