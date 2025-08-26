import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Mail } from "lucide-react";
import { Content } from "vaul";

const userId = 1;

type Message = { senderId: number, senderName: string; content: string; time: string };
type Connection = {
    connectionId: number;
    requestedUserId: string;
    requestedUserName: string;
    jobRole: string;
    email: string;
    requestedAt: string;
    avatar?: string;
    mutual?: number;
    online?: boolean;
};

type MessagesProps = {
    activeChat: string | null;
    setActiveChat: (chat: string | null) => void;
};

const Messages: React.FC<MessagesProps> = ({ activeChat, setActiveChat }) => {
    const [connections, setConnections] = useState<Connection[]>([]);
    const [messages, setMessages] = useState<Record<string, Message[]>>({});
    const [message, setMessage] = useState("");
    const [stompClient, setStompClient] = useState<Client | null>(null);

    useEffect(() => {
        fetchConnections();
        // Connect to WebSocket
        const socket = new SockJS("http://localhost:8080/ws");
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe(`/user/${userId}/queue/messages`, (msg) => {
                    const message = JSON.parse(msg.body);
                    setMessages((prev) => {
                        const chatName = message.senderName;
                        return {
                            ...prev,
                            [chatName]: [
                                ...(prev[chatName] || []),
                                {
                                    senderId: message.senderId,
                                    senderName: message.senderName,
                                    content: message.content,
                                    time: new Date(message.timestamp).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }),
                                },
                            ],
                        };
                    });
                });
            },
        });
        client.activate();
        setStompClient(client);
        return () => {
            client.deactivate();
        };
    }, []);

    useEffect(() => {
        if (activeChat) {
            const receiver = connections.find((c) => c.requestedUserName === activeChat);
            if (!receiver) return;
            axios
                .get(`http://localhost:8080/messages/${userId}/${receiver.requestedUserId}`)
                .then((res) => {
                    setMessages((prev) => ({
                        ...prev,
                        [activeChat]: res.data.map((msg: any) => ({
                            senderId: msg.senderId,
                            senderName: msg.senderName,
                            content: msg.content,
                            time: new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            }),
                        })),
                    }));
                });
        }
    }, [activeChat, connections]);

    const fetchConnections = () => {
        axios.get(`http://localhost:8080/api/network/${userId}/connections`)
            .then((res) => setConnections(res.data))
            .catch((err) => console.error(err));
    };

    const handleSendMessage = () => {
        if (message.trim() && activeChat && stompClient && stompClient.connected) {
            const receiver = connections.find((c) => c.requestedUserName === activeChat);
            if (!receiver) return;
            const msgObj = {
                senderId: userId,
                receiverId: receiver.requestedUserId,
                content: message,
                timestamp: new Date().toISOString(),
            };
            stompClient.publish({
                destination: "/app/chat.send",
                body: JSON.stringify(msgObj),
            });
            setMessages((prev) => ({
                ...prev,
                [activeChat]: [
                    ...(prev[activeChat] || []),
                    {
                        senderId: userId,
                        senderName: "You",
                        content: message,
                        time: new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        }),
                    },
                ],
            }));
            setMessage("");
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Conversations List */}
            <div className="lg:col-span-1">
                <Card className="bg-slate-800/50 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Conversations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {connections.map((conn) => (
                                <div
                                    key={conn.requestedUserName}
                                    className={`p-3 rounded-lg cursor-pointer ${activeChat === conn.requestedUserName
                                        ? "bg-slate-700/50 border border-white/10"
                                        : "hover:bg-slate-700/30"
                                        }`}
                                    onClick={() => setActiveChat(conn.requestedUserName)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <Avatar>
                                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600">
                                                {conn.requestedUserName
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="text-white font-medium">{conn.requestedUserName}</h4>
                                            <p className="text-gray-300 text-sm truncate">
                                                {(messages[conn.requestedUserName]?.slice(-1)[0]?.content) || ""}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-3">
                <Card className="bg-slate-800/50 border-white/10 h-full">
                    {activeChat ? (
                        <>
                            <CardHeader className="border-b border-white/10">
                                <div className="flex items-center space-x-3">
                                    <Avatar>
                                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600">
                                            {activeChat
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-white">
                                            {activeChat}
                                        </CardTitle>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0 h-[400px] overflow-y-auto">
                                <div className="p-4 space-y-4">
                                    {messages[activeChat]?.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
                                        >
                                            <div
                                                className={`max-w-[80%] p-3 rounded-lg ${msg.senderId === userId
                                                    ? "bg-gradient-to-r from-blue-500 to-purple-600"
                                                    : "bg-slate-700/50"
                                                    }`}
                                            >
                                                <p className="text-white">{msg.content}</p>
                                                <p
                                                    className={`text-xs mt-1 ${msg.senderId === userId ? "text-blue-200" : "text-gray-400"
                                                        }`}
                                                >
                                                    {msg.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="border-t border-white/10 p-4">
                                <div className="flex w-full items-center space-x-2">
                                    <Input
                                        placeholder="Type a message..."
                                        className="flex-1 bg-slate-700 border-slate-600"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyPress={(e) =>
                                            e.key === "Enter" && handleSendMessage()
                                        }
                                    />
                                    <Button
                                        size="icon"
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                        onClick={handleSendMessage}
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                            <Mail className="h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-white font-semibold text-xl mb-2">
                                Select a conversation
                            </h3>
                            <p className="text-gray-400">
                                Choose a contact from the list to start messaging
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Messages;