"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, MessageCircle, Share2, Send } from "lucide-react";
import { getUserIdFromToken } from "@/app/lib/authCookies";


type FeedPost = {
    postId: number;
    content: string;
    images?: string[];
    time?: string;
    likes: number;
    commentCount: number;
    comments: string[];
    user: {
        name: string;
        role: string;
        avatar: string;
    };

};
const userId = Number(getUserIdFromToken());

const FeedTab: React.FC = () => {
    const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
    const [postContent, setPostContent] = useState("");
    const [commentsByPost, setCommentsByPost] = useState<
        Record<number, Array<{ id: number; postId: number; author: { postId: number; name: string }; text: string }>>
    >({});
    const [newComment, setNewComment] = useState<Record<number, string>>({});
    const [openComments, setOpenComments] = useState<Record<number, boolean>>({});

    useEffect(() => {
        fetchActivityFeed();
    }, []);

    // Fetch all posts for the feed
    const fetchActivityFeed = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/posts/activity-feed/${userId}`);
            const mappedPosts = await Promise.all(
                res.data.map(async (post: any) => ({
                    postId: post.postId,
                    content: post.content,
                    images: post.imageUrl ? [post.imageUrl] : [],
                    time: post.createdAt ? new Date(post.createdAt).toLocaleString() : "",
                    likes: typeof post.likes === "number" ? post.likes : (Array.isArray(post.likes) ? post.likes.length : 0),
                    comments: post.comments,
                    commentCount: Array.isArray(post.comments) ? post.comments.length : (typeof post.comments === "number" ? post.comments : 0),
                    user: {
                        name: post.createdBy?.name ?? "Unknown",
                        role: post.createdBy?.role ?? "",
                        avatar: post.createdBy?.name
                            ? post.createdBy.name.split(" ").map((n: string) => n[0]).join("")
                            : "U",
                    },

                }))
            );
            setFeedPosts(mappedPosts);
        } catch (err) {
            setFeedPosts([]);
        }
    };

    // Like/unlike a post
    const handleToggleLike = async (postId: number) => {
        try {
            await axios.post(`http://localhost:8080/api/likes/post/${postId}?userId=${userId}`);
            await fetchActivityFeed();
        } catch (err) {
            console.error(err);
        }
    };

    // Create a new post
    const createPost = async () => {
        if (!postContent.trim()) return;
        try {
            await axios.post("http://localhost:8080/api/posts", {
                content: postContent,
                contentType: "DOCUMENT",
                createdBy: { id: userId },
                createdBy: { id: userId },
            });
            setPostContent("");
            fetchActivityFeed();
        } catch (err) { }
    };

    // Add a comment to a post
    const addComment = async (postId: number) => {
        const text = newComment[postId];
        if (!text?.trim()) return;
        try {
            await axios.post(
                `http://localhost:8080/api/comments/post/${postId}?userId=${userId}`,
                text,
                { headers: { "Content-Type": "text/plain" } }
            );
            setNewComment((prev) => ({ ...prev, [postId]: "" }));
            await fetchComments(postId);
            setOpenComments((prev) => ({ ...prev, [postId]: true }));
        } catch (err) {
            console.error(err);
        }
    };

    // Fetch comments for a post
    const fetchComments = async (postId: number) => {
        try {
            const res = await fetch(`http://localhost:8080/api/comments/post/${postId}`);
            if (!res.ok) throw new Error("Failed to fetch comments");
            const data = await res.json();
            setCommentsByPost((prev) => ({ ...prev, [postId]: data }));
            setOpenComments((prev) => ({ ...prev, [postId]: true }));
        } catch (err) {
            console.error(err);
        }
    };

    // Toggle commentCount section for a post
    const handleToggleComments = async (postId: number) => {
        if (!openComments[postId]) {
            await fetchComments(postId);
        } else {
            setOpenComments((prev) => ({ ...prev, [postId]: false }));
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Profile Card */}
            <div className="lg:col-span-1">
                <Card className="bg-slate-800/50 border-white/10 sticky top-28">
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
                                            onKeyDown={e => {
                                                if (e.key === "Enter" && postContent.trim()) {
                                                    createPost();
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-gray-400 hover:bg-white/10"
                                                disabled
                                            >
                                                <span className="ml-2">Image</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-gray-400 hover:bg-white/10"
                                                disabled
                                            >
                                                <span className="ml-2">Poll</span>
                                            </Button>
                                        </div>
                                        <Button
                                            size="sm"
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                            onClick={createPost}
                                            disabled={!postContent.trim()}
                                        >
                                            Post
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Feed Posts */}
                            {feedPosts.map((post) => (
                                <Card key={post.postId} className="bg-slate-700/30 border-white/10">
                                    <CardContent className="p-4">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <Avatar>
                                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600">
                                                    {post.user.avatar}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="text-white font-medium">{post.user.name}</h4>
                                                <p className="text-gray-300 text-sm">{post.user.role}</p>
                                            </div>
                                            <span className="text-gray-400 text-sm ml-auto">{post.time}</span>
                                        </div>

                                        <p className="text-gray-300 mb-4">{post.content}</p>

                                        {/* Image Grid */}
                                        {post.images && post.images.length > 0 && (
                                            <div className={`mb-4 rounded-lg overflow-hidden ${post.images.length === 1 ? "max-w-2xl" : ""}`}>
                                                <div className={`grid gap-2 ${post.images.length === 1 ? "grid-cols-1" : post.images.length === 2 ? "grid-cols-2" : "grid-cols-2"}`}>
                                                    {post.images.map((image, idx) => (
                                                        <div key={idx} className="relative aspect-square">
                                                            <img
                                                                src={image}
                                                                alt={`Post by ${post.user.name}`}
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between text-gray-400 text-sm">
                                            <div className="flex space-x-4">
                                                <button className="flex items-center hover:text-blue-400" onClick={() => handleToggleLike(post.postId)}>
                                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                                    {post.likes} Likes
                                                </button>
                                                <button className="flex items-center hover:text-blue-400" onClick={() => handleToggleComments(post.postId)}>
                                                    <MessageCircle className="h-4 w-4 mr-1" />
                                                    {post.commentCount} Comments
                                                </button>
                                            </div>
                                            <button className="hover:text-blue-400">
                                                <Share2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                        {/* Comments Section */}
                                        {openComments[post.postId] && commentsByPost[post.postId] && (
                                            <div className="mt-4 space-y-2">
                                                {commentsByPost[post.postId].map((c) => (
                                                    <div key={c.id} className="text-gray-200 text-sm border-b border-slate-600 pb-1">
                                                        <span className="font-semibold">{c.author.name}: </span>
                                                        {c.text}
                                                    </div>
                                                ))}
                                                <div className="flex mt-2 space-x-2">
                                                    <Input
                                                        value={newComment[post.postId] || ""}
                                                        onChange={e => setNewComment(prev => ({ ...prev, [post.postId]: e.target.value }))}
                                                        placeholder="Write a comment..."
                                                        className="bg-slate-800 border-slate-700"
                                                    />
                                                    <Button
                                                        size="sm"
                                                        onClick={() => addComment(post.postId)}
                                                        className="bg-gradient-to-r from-blue-500 to-purple-600"
                                                    >
                                                        <Send className="h-4 w-4" />
                                                        <Send className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                            {feedPosts.length === 0 && (
                                <p className="text-gray-400 text-center py-4">No posts yet.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default FeedTab;