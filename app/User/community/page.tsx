"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import post1 from "../../utils/images/post1.avif"
import post2 from "../../utils/images/post2.webp";
import {
  Users,
  Bell,
  MessageSquare,
  TrendingUp,
  Calendar,
  Mail,
  MoreHorizontal,
  Send,
  ThumbsUp,
  MessageCircle,
  Share2,
} from "lucide-react";
import Navbar from "../../../components/ui/navbar";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("network");
  const [message, setMessage] = useState("");

  const [activeChat, setActiveChat] = useState<string | null>(null);
  type ConnectionRequest = {
    connectionId: number;
    userId: string;
    userName: string;
    jobRole: string;
    email: boolean;
    requestedAt: boolean;
    avatar?: string;
    mutual?: number;
  };

  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>([]);

  type Connection = {
    connectionId: number;
    userId: string;
    userName: string;
    jobRole: string;
    email: boolean;
    requestedAt: boolean;
    avatar?: string;
    mutual?: number;
    online?: boolean;
  };

  const [connections, setConnections] = useState<Connection[]>([]);

  const [announcements, setAnnouncements] = useState([
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

  type FeedPost = {
    id: number;
    content: string;
    images?: string[];
    time?: string;
    likes: number;
    comments: number;
    user: {
      name: string;
      role: string;
      avatar: string;
    };
    author?: {
      id: number;
      name: string;
      email?: string;
      role?: string;
    };
  };
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);

  const [messages, setMessages] = useState<
    Record<string, Array<{ sender: string; text: string; time: string }>>
  >({
    "Alex Thompson": [
      {
        sender: "Alex Thompson",
        text: "Hey! How's the job search going?",
        time: "10:30 AM",
      },
      {
        sender: "You",
        text: "Going well! Just had an interview yesterday",
        time: "10:32 AM",
      },
      {
        sender: "Alex Thompson",
        text: "That's great!",
        time: "10:33 AM",
      },
    ],
    "Priya Patel": [
      {
        sender: "Priya Patel",
        text: "Would you be interested in joining our product team?",
        time: "Yesterday",
      },
      {
        sender: "You",
        text: "Definitely!",
        time: "Yesterday",
      },
    ],
  });
  const [postContent, setPostContent] = useState("");
  const [commentsByPost, setCommentsByPost] = useState<Record<number, Array<{ id: number; author: { id: number; name: string }; text: string }>>>({});
  const [newComment, setNewComment] = useState<Record<number, string>>({});

  useEffect(() => {
    if (activeTab === "feed") {
      fetchActivityFeed();
    } else if (activeTab === "network") {
      fetchConnections();
    }
  }, [activeTab]);

  const handleConnect = async (connectionId: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/network/accept/${connectionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setConnectionRequests(connectionRequests.filter((req) => req.connectionId !== connectionId));
      }
    } catch (error) {
      console.error("Error accepting connection:", error);
    }
    fetchConnections();
  };

  const handleIgnore = async (connectionId: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/network/accept/${connectionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setConnectionRequests(connectionRequests.filter((req) => req.connectionId !== connectionId));
      }
    } catch (error) {
      console.error("Error ignoring connection:", error);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && activeChat) {
      const newMessage = {
        sender: "You",
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), newMessage],
      }));
      setMessage("");
    }
  };

  const handleToggleLike = async (postId: number) => {
    const userId = 1;
    try {
      const res = await fetch(
        `http://localhost:8080/api/likes/post/${postId}?userId=${userId}`,
        { method: "POST" }
      );
      if (!res.ok) throw new Error("Failed to toggle like");
    } catch (err) {
      console.error(err);
    }
    fetchActivityFeed();
  };
  const createPost = async (post: {
    content: string;
    imageUrl?: string;
    author: { id: number };
  }) => {
    try {
      const res = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      if (!res.ok) throw new Error("Failed to create post");
      const data = await res.json();
      // Optionally refresh feed after post
      fetchActivityFeed();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const fetchActivityFeed = async () => {
    const userId = 1;
    try {
      const res = await fetch(`http://localhost:8080/api/posts/activity-feed/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch activity feed");
      const data = await res.json();

      // Fetch like counts for each post
      const mappedPosts = await Promise.all(
        data.map(async (post: any) => {
          const likeCount = await fetchLikeCount(post.id);
          return {
            id: post.id,
            user: {
              name: post.author?.name ?? "Unknown",
              role: post.author?.role ?? "",
              avatar: post.author?.name
                ? post.author.name.split(" ").map((n: string) => n[0]).join("")
                : "U",
            },
            content: post.content,
            likes: likeCount,
            comments: Array.isArray(post.comments) ? post.comments.length : 0,
            time: post.createdAt
              ? new Date(post.createdAt).toLocaleString()
              : "",
            images: post.imageUrl ? [post.imageUrl] : [],
            author: post.author,
          };
        })
      );
      setFeedPosts(mappedPosts);
    } catch (err) {
      console.error(err);
    }
  };


  const fetchConnections = () => {
    const userId = 1;

    fetch(`http://localhost:8080/api/network/${userId}/connections`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setConnections(
          data.map((conn: any) => ({
            connectionId: conn.id,
            userName: conn.requestedUserName,
            email: conn.email,
            jobRole: conn.jobRole,
            avatar: conn.avatar || conn.requestedUserName.split(" ").map((n: string) => n[0]).join(""),
            online: false,
          }))
        );
      })
      .catch((err) => console.error("Failed to fetch connections", err));

    // Fetch connection requests
    fetch(`http://localhost:8080/api/network/${userId}/requests`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Connection requests response:", data);
        setConnectionRequests(
          data.map((conn: any) => ({
            connectionId: conn.connectionId,
            userId: conn.requestedUserId,
            userName: conn.requestedUserName,
            jobRole: conn.jobRole,
            avatar: conn.avatar || conn.requestedUserName.split(" ").map((n: string) => n[0]).join(""),
            email: conn.email,

          }))
        );
      })
      .catch((err) => console.error("Failed to fetch connection requests", err));
  }

  const fetchLikeCount = async (postId: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/likes/post/${postId}`);
      if (!res.ok) throw new Error("Failed to fetch like count");
      const count = await res.json();
      return count;
    } catch (err) {
      console.error(err);
      return 0;
    }
  };

  // Fetch comments for a post
  const fetchComments = async (postId: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/comments/post/${postId}`);
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      setCommentsByPost((prev) => ({ ...prev, [postId]: data }));
    } catch (err) {
      console.error(err);
    }
  };


  const addComment = async (postId: number, userId: number) => {
    const text = newComment[postId];
    if (!text?.trim()) return;
    try {
      const res = await fetch(`http://localhost:8080/api/comments/post/${postId}?userId=${userId}`, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: text,
      });
      if (!res.ok) throw new Error("Failed to add comment");
      setNewComment((prev) => ({ ...prev, [postId]: "" }));
      fetchComments(postId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar currentPage="community" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Community Hub</h1>
          <p className="text-gray-300 text-lg">
            Connect with peers, share insights, and grow your professional
            network
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-slate-800/50 border border-white/10">
            <TabsTrigger
              value="network"
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4 mr-2" />
              Network
            </TabsTrigger>
            <TabsTrigger
              value="announcements"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white"
            >
              <Bell className="h-4 w-4 mr-2" />
              Announcements
            </TabsTrigger>
            <TabsTrigger
              value="feed"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-white"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Activity Feed
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-white"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
          </TabsList>

          {/* Networking Hub Tab */}
          <TabsContent value="network">
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
                                  {request.userName}
                                </h4>
                                <h4 className="text-white font-medium">
                                  {request.email}
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
                                    {connection.userName}
                                  </h4>
                                  <p className="text-gray-300 text-sm">
                                    {connection.jobRole}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-400 hover:bg-blue-400/10"
                                onClick={() => {
                                  setActiveTab("messages");
                                  setActiveChat(connection.userName);
                                }}
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
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements">
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Announcements & News
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <Card
                      key={announcement.id}
                      className="bg-slate-700/30 border-white/10 hover:border-white/30 transition-colors"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center mb-1">
                              <Badge
                                variant="outline"
                                className={`mr-2 ${announcement.type === "webinar"
                                  ? "border-blue-500/30 text-blue-400"
                                  : announcement.type === "event"
                                    ? "border-purple-500/30 text-purple-400"
                                    : "border-green-500/30 text-green-400"
                                  }`}
                              >
                                {announcement.type === "webinar"
                                  ? "Webinar"
                                  : announcement.type === "event"
                                    ? "Event"
                                    : "Update"}
                              </Badge>
                              <span className="text-gray-400 text-sm">
                                {announcement.date}
                              </span>
                            </div>
                            <h3 className="text-white font-semibold text-lg mb-2">
                              {announcement.title}
                            </h3>
                            <p className="text-gray-300">
                              {announcement.description}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:bg-blue-400/10"
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Register
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Feed Tab */}
          <TabsContent value="feed">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* User Profile Card */}
              <div className="lg:col-span-1">
                <Card className="bg-slate-800/50 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="w-20 h-20 mb-4">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-xl">
                          AT
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-white font-semibold text-xl">
                        Alex Thompson
                      </h3>
                      <p className="text-gray-300 mb-2">Software Developer</p>
                      <div className="flex space-x-2 mb-4">
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          Level 3
                        </Badge>
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          1,250 XP
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 w-full mb-4">
                        <div className="bg-slate-700/50 rounded-lg p-2">
                          <p className="text-white font-semibold">42</p>
                          <p className="text-gray-400 text-xs">Connections</p>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-2">
                          <p className="text-white font-semibold">18</p>
                          <p className="text-gray-400 text-xs">Posts</p>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-2">
                          <p className="text-white font-semibold">5</p>
                          <p className="text-gray-400 text-xs">Badges</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-white/20 text-gray-300 hover:bg-white/10"
                      >
                        Edit Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Feed */}
              <div className="lg:col-span-2">
                <Card className="bg-slate-800/50 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Activity Feed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Post Input */}
                      <Card className="bg-slate-700/30 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600">
                                AT
                              </AvatarFallback>
                            </Avatar>
                            <Input
                              placeholder="Share an update with the community..."
                              className="bg-slate-700 border-slate-600"
                              value={postContent}
                              onChange={(e) => setPostContent(e.target.value)}
                            />
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:bg-white/10"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <rect
                                    x="3"
                                    y="3"
                                    width="18"
                                    height="18"
                                    rx="2"
                                    ry="2"
                                  ></rect>
                                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                  <polyline points="21 15 16 10 5 21"></polyline>
                                </svg>
                                <span className="ml-2">Image</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:bg-white/10"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                                <span className="ml-2">Poll</span>
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                              onClick={() => {
                                if (postContent.trim()) {
                                  createPost({
                                    content: postContent,
                                    author: { id: 1 },
                                  });
                                  setPostContent("");
                                }
                              }}
                            >
                              Post
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Feed Posts */}
                      {feedPosts.map((post) => (
                        <Card key={post.id} className="bg-slate-700/30 border-white/10">
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3 mb-3">
                              <Avatar>
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600">
                                  {post.user?.avatar ??
                                    (post.user?.name
                                      ? post.user.name.split(" ").map((n: string) => n[0]).join("")
                                      : "U")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="text-white font-medium">
                                  {post.author?.name}
                                </h4>
                                <p className="text-gray-300 text-sm">
                                  {post.user.role}
                                </p>
                              </div>
                              <span className="text-gray-400 text-sm ml-auto">
                                {post.time}
                              </span>
                            </div>

                            <p className="text-gray-300 mb-4">{post.content}</p>

                            {/* Image Grid - supports 1-4 images with different layouts */}
                            {post.images && post.images.length > 0 && (
                              <div
                                className={`mb-4 rounded-lg overflow-hidden ${post.images.length === 1 ? "max-w-2xl" : ""
                                  }`}
                              >
                                <div
                                  className={`grid gap-2 ${post.images.length === 1
                                    ? "grid-cols-1"
                                    : post.images.length === 2
                                      ? "grid-cols-2"
                                      : post.images.length === 3
                                        ? "grid-cols-2"
                                        : "grid-cols-2"
                                    }`}
                                >
                                  {post.images.map((image, idx) => (
                                    <div
                                      key={idx}
                                      className={`relative aspect-square ${post.images && post.images.length === 3 && idx === 0
                                        ? "row-span-2"
                                        : ""
                                        }`}
                                    >
                                      <img
                                        src={image}
                                        alt={`Post by ${post.user.name}`}
                                        className="w-full h-full object-cover rounded-lg"
                                      />
                                      {/* {post.images?.length > 4 && idx === 3 && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                                          <span className="text-white font-bold text-lg">
                                            +{(post.images?.length ?? 0) - 4}
                                          </span>
                                        </div>
                                      )} */}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex items-center justify-between text-gray-400 text-sm">
                              <div className="flex space-x-4">
                                <button
                                  className="flex items-center hover:text-blue-400"
                                  onClick={() => handleToggleLike(post.id)}
                                >
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  {post.likes} Likes
                                </button>
                                <button
                                  className="flex items-center hover:text-blue-400"
                                  onClick={() => fetchComments(post.id)}
                                >
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  {post.comments} Comments
                                </button>
                              </div>
                              <button className="hover:text-blue-400">
                                <Share2 className="h-4 w-4" />
                              </button>
                            </div>
                            {/* Comments Section */}
                            {commentsByPost[post.id] && (
                              <div className="mt-4 space-y-2">
                                {commentsByPost[post.id].map((c) => (
                                  <div key={c.id} className="text-gray-200 text-sm border-b border-slate-600 pb-1">
                                    <span className="font-semibold">{c.author.name}: </span>
                                    {c.text}
                                  </div>
                                ))}
                                <div className="flex mt-2 space-x-2">
                                  <Input
                                    value={newComment[post.id] || ""}
                                    onChange={e => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                                    placeholder="Write a comment..."
                                    className="bg-slate-800 border-slate-700"
                                  />
                                  <Button
                                    size="sm"
                                    onClick={() => addComment(post.id, 1)}
                                    className="bg-gradient-to-r from-blue-500 to-purple-600"
                                  >
                                    post
                                  </Button>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}


                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Conversations List */}
              <div className="lg:col-span-1">
                <Card className="bg-slate-800/50 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Conversations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.keys(messages).map((name) => (
                        <div
                          key={name}
                          className={`p-3 rounded-lg cursor-pointer ${activeChat === name
                            ? "bg-slate-700/50 border border-white/10"
                            : "hover:bg-slate-700/30"
                            }`}
                          onClick={() => setActiveChat(name)}
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600">
                                {name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="text-white font-medium">{name}</h4>
                              <p className="text-gray-300 text-sm truncate">
                                {messages[name][messages[name].length - 1].text}
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
                              className={`flex ${msg.sender === "You"
                                ? "justify-end"
                                : "justify-start"
                                }`}
                            >
                              <div
                                className={`max-w-[80%] p-3 rounded-lg ${msg.sender === "You"
                                  ? "bg-gradient-to-r from-blue-500 to-purple-600"
                                  : "bg-slate-700/50"
                                  }`}
                              >
                                <p className="text-white">{msg.text}</p>
                                <p
                                  className={`text-xs mt-1 ${msg.sender === "You"
                                    ? "text-blue-200"
                                    : "text-gray-400"
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
