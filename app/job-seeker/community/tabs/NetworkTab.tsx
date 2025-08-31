import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Users, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getUserIdFromToken } from "@/app/lib/authCookies";

const userId = Number(getUserIdFromToken());

type NetworkTabProps = {
    setActiveTab: (tab: "network" | "messages") => void;
    setActiveChat: (chat: string) => void;
};

type Connection = {
    connectionId: number;
    requestedUserId: string;
    requestedUserName: string;
    jobRole: string;
    email: string;
    requestedAt: boolean;
    avatar?: string;
    mutual?: number;
    online?: boolean;
};
type ConnectionRequest = {
    connectionId: number;
    requestedUserId: string;
    requestedUserName: string;
    jobRole: string;
    email: string;
    requestedAt: boolean;
    avatar?: string;
    mutual?: number;
};
type SuggestedUser = {
    userId: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    mutual?: number;
};

const NetworkTab: React.FC<NetworkTabProps> = ({ setActiveTab, setActiveChat }) => {
    const router = useRouter();

    const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([]);
    const [sentRequests, setSentRequests] = useState<ConnectionRequest[]>([]);

    useEffect(() => {
        fetchConnections();
        fetchSuggestions();
        fetchSentRequests();
    }, []);

    const fetchConnections = () => {
        axios.get(`http://localhost:8080/api/network/${userId}/connections`)
            .then(res => setConnections(res.data))
            .catch(err => console.error(err));

        axios.get(`http://localhost:8080/api/network/${userId}/requests`)
            .then(res => setConnectionRequests(res.data))
            .catch(err => console.error(err));
    };

    const fetchSuggestions = () => {
        axios.get(`http://localhost:8080/api/network/${userId}/suggestions`)
            .then(res => setSuggestedUsers(res.data))
            .catch(err => console.error(err));
    };

    const fetchSentRequests = () => {
        axios.get(`http://localhost:8080/api/network/${userId}/sentRequests`)
            .then(res => setSentRequests(res.data))
            .catch(err => console.error(err));
    };

    const handleConnect = (connectionId: number) => {
        axios.post(`http://localhost:8080/api/network/accept/${connectionId}`)
            .then(() => fetchConnections());
    };

    const handleIgnore = (connectionId: number) => {
        axios.post(`http://localhost:8080/api/network/ignore/${connectionId}`)
            .then(() => fetchConnections());
    };

    const handleConnectSuggestion = (targetId: string) => {
        axios.post(`http://localhost:8080/api/network/connect/${userId}/${targetId}`)
            .then(() => {
                setSuggestedUsers(prev =>
                    prev.filter(user => user.userId !== targetId)
                );
                fetchSentRequests();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Connection Requests */}
            <div className="lg:col-span-1">
                <Card className="bg-slate-800/50 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center">
                            <Users className="h-5 w-5 mr-2" />
                            Connection Requests
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {connectionRequests.map((request) => (
                                <Card
                                    key={request.connectionId}
                                    className="bg-slate-700/30 border-white/10"
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-center space-x-3">
                                            <Avatar>
                                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600">
                                                    {request.avatar}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="text-white font-medium">
                                                    {request.requestedUserName}
                                                </h4>
                                                <p className="text-gray-300 text-sm">
                                                    {request.jobRole}
                                                </p>
                                                <p className="text-blue-400 text-xs">
                                                    {request.mutual} mutual connections
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2 mt-4">
                                            <Button
                                                size="sm"
                                                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                                onClick={() => handleConnect(request.connectionId)}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1 border-white/20 text-gray-300 hover:bg-white/10"
                                                onClick={() => handleIgnore(request.connectionId)}
                                            >
                                                Ignore
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {connectionRequests.length === 0 && (
                                <p className="text-gray-400 text-center py-4">
                                    No pending connection requests
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Your Connections */}
            <div className="lg:col-span-2">
                <Card className="bg-slate-800/50 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center">
                            <Users className="h-5 w-5 mr-2" />
                            Your Connections ({connections.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {connections.map((connection) => (
                                <Card
                                    key={connection.connectionId}
                                    className="bg-slate-700/30 border-white/10 hover:border-white/30 transition-colors"
                                >
                                    <CardContent className="p-4">
                                        <div className="flex justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="relative">
                                                    <Avatar>
                                                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600">
                                                            {connection.avatar}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    {connection.online && (
                                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-medium">
                                                        {connection.requestedUserName}
                                                    </h4>
                                                    <p className="text-gray-300 text-sm">
                                                        {connection.email}
                                                    </p>
                                                    <p className="text-gray-300 text-sm">
                                                        {connection.jobRole}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-blue-400 hover:bg-blue-400/10"
                                                onClick={() => { setActiveTab("messages"); setActiveChat(connection.requestedUserName); }}
                                            >
                                                <MessageSquare className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="flex justify-end mt-3 space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="border-white/20 text-gray-300 hover:bg-white/10"
                                            >
                                                View Profile
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Suggestions & Sent Requests */}
            <div className="lg:col-span-1">
                <div className="bg-slate-900/30 rounded-lg p-3 mb-2">
                    <div className="flex items-center mb-2">
                        <Users className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="text-gray-400 text-sm font-medium">Suggestions</span>
                    </div>
                    <div className="space-y-2">
                        {suggestedUsers.map((user) => (
                            <div
                                key={user.userId}
                                className="flex items-center justify-between py-2 px-2 rounded hover:bg-slate-800/30 transition"
                            >
                                <div className="flex items-center space-x-2">
                                    <Avatar className="h-7 w-7">
                                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-xs">
                                            {user.avatar}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <span className="text-gray-300 text-sm">{user.name}</span>
                                        <span className="block text-gray-500 text-xs">{user.role}</span>
                                        <span className="block text-gray-500 text-xs">{user.email}</span>
                                    </div>
                                </div>
                                <div className="flex space-x-1">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-blue-400 px-2 py-1"
                                        onClick={() => handleConnectSuggestion(user.userId)}
                                    >
                                        Connect
                                    </Button>
                                </div>
                            </div>
                        ))}
                        {suggestedUsers.length === 0 && (
                            <p className="text-gray-500 text-xs text-center py-2">
                                No suggestions
                            </p>
                        )}
                    </div>
                    {/* Divider */}
                    <div className="border-t border-slate-700 my-4"></div>
                    {/* Sent Requests Section */}
                    <div>
                        <div className="flex items-center mb-2">
                            <Users className="h-4 w-4 mr-1 text-gray-400" />
                            <span className="text-gray-400 text-sm font-medium">Sent Requests</span>
                        </div>
                        <div className="space-y-2">
                            {sentRequests.map((user) => (
                                <div
                                    key={user.requestedUserId}
                                    className="flex items-center justify-between py-2 px-2 rounded"
                                >
                                    <div className="flex items-center space-x-2">
                                        <Avatar className="h-7 w-7">
                                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-xs">
                                                {user.avatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <span className="text-gray-300 text-sm">{user.requestedUserName}</span>
                                            <span className="block text-gray-500 text-xs">{user.jobRole}</span>
                                            <span className="block text-gray-500 text-xs">{user.email}</span>
                                        </div>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-white/20 text-gray-300 px-2 py-1 hover:bg-white/10 text-sm"
                                        onClick={() => router.push(`/job-seeker/profile/${user.requestedUserId}`)}
                                    >
                                        View Profile
                                    </Button>
                                </div>
                            ))}
                            {sentRequests.length === 0 && (
                                <p className="text-gray-500 text-xs text-center py-2">
                                    No sent requests
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetworkTab;