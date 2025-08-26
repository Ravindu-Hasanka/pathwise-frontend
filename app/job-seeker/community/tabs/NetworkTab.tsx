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

const requestedUserId = 1;

const NetworkTab: React.FC = () => {
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
    const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);

    useEffect(() => {
        fetchConnections();
    }, []);

    const fetchConnections = () => {
        axios.get(`http://localhost:8080/api/network/${requestedUserId}/connections`)
            .then(res => setConnections(res.data))
            .catch(err => console.error(err));

        axios.get(`http://localhost:8080/api/network/${requestedUserId}/requests`)
            .then(res => setConnectionRequests(res.data))
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

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                                                    </p><p className="text-gray-300 text-sm">
                                                        {connection.jobRole}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-blue-400 hover:bg-blue-400/10"
                                            // You can lift this up if you want to open chat
                                            // onClick={() => { setActiveTab("messages"); setActiveChat(connection.requestedUserName); }}
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
        </div>
    );
};

export default NetworkTab;