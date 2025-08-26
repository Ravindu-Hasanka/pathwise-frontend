import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Megaphone } from "lucide-react";
import axios from "axios";

type Announcement = {
    id: number;
    title: string;
    date: string;
    description: string;
    type: string;
};

const AnnouncementsTab: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/announcements")
            .then((res) => setAnnouncements(res.data))
            .catch(() => {
                // fallback demo data
                setAnnouncements([
                    {
                        id: 1,
                        title: "New Career Webinar: Mastering Technical Interviews",
                        date: "June 15, 2023",
                        description:
                            "Join our live webinar with industry experts to learn the best strategies for technical interviews.",
                        type: "webinar",
                    },
                    {
                        id: 2,
                        title: "Platform Update: New Skill Assessment Features",
                        date: "June 10, 2023",
                        description:
                            "We've added new skill assessment tools to help you better track your progress.",
                        type: "update",
                    },
                    {
                        id: 3,
                        title: "Hackathon Announcement: Build the Future 2023",
                        date: "May 28, 2023",
                        description:
                            "Participate in our annual hackathon with $10,000 in prizes!",
                        type: "event",
                    },
                ]);
            });
    }, []);

    return (
        <div className="max-w-3xl mx-auto">
            <Card className="bg-slate-800/50 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white flex items-center">
                        <Megaphone className="h-5 w-5 mr-2" />
                        Announcements
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {announcements.map((a) => (
                            <div key={a.id} className="p-4 rounded-lg bg-slate-700/30 border border-white/10">
                                <h3 className="text-lg font-semibold text-white">{a.title}</h3>
                                <p className="text-gray-400 text-sm mb-1">{a.date}</p>
                                <p className="text-gray-200">{a.description}</p>
                            </div>
                        ))}
                        {announcements.length === 0 && (
                            <p className="text-gray-400 text-center py-4">No announcements yet.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AnnouncementsTab;