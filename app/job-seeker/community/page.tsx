"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Bell, MessageSquare, TrendingUp } from "lucide-react";
import Navbar from "../../../components/ui/navbar";
import NetworkTab from "./tabs/NetworkTab";
import AnnouncementsTab from "./tabs/AnnouncementsTab";
import FeedTab from "./tabs/FeedTab";
import Messages from "./tabs/Messages";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("network");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar currentPage="community" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Community Hub</h1>
          <p className="text-gray-300 text-lg">
            Connect with peers, share insights, and grow your professional network
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

          <TabsContent value="network">
            <NetworkTab />
          </TabsContent>
          <TabsContent value="announcements">
            <AnnouncementsTab />
          </TabsContent>
          <TabsContent value="feed">
            <FeedTab />
          </TabsContent>
          <TabsContent value="messages">
            <Messages />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
