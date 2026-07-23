"use client";

import React, { useState, useEffect } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import ChatDetails from "./ChatDetails";
import { cn } from "@/lib/utils";

// Mock data needed here to pass to ChatDetails, or we can fetch it inside ChatDetails based on ID.
// For now, we'll keep the mock data consistent or move it to a shared constant file if this was a real app.
// Since ChatWindow has the data locally, let's just pass the ID to ChatDetails and let it handle data (or reuse the same mock).
// For simplicity in this demo, I'll pass the ID.

import { useGetChannelsQuery } from "@/api/inboxApi";

export default function InboxLayout() {
  const { data: channels = [] } = useGetChannelsQuery();
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);

  // Set initial selected chat once channels are loaded
  useEffect(() => {
    if (channels.length > 0 && !selectedChatId) {
       setSelectedChatId(channels[0].id);
    }
  }, [channels, selectedChatId]);

  const currentChat = channels.find(c => c.id === selectedChatId) || null;

  const handleSelectChat = (id) => {
    setSelectedChatId(id);
    setShowMobileChat(true);
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#1A1A1A] rounded-2xl border border-white/5 shadow-2xl relative">
      {/* Left Sidebar: Chat List */}
      <div
        className={cn(
          "w-full md:w-80 border-r border-white/5 flex flex-col bg-[#1A1A1A]",
          showMobileChat ? "hidden md:flex" : "flex",
        )}
      >
        <ChatList
          selectedChatId={selectedChatId}
          onSelectChat={handleSelectChat}
        />
      </div>

      {/* Main Area: Chat Window */}
      <div
        className={cn(
          "flex-1 flex flex-col bg-[#121212] relative min-w-0",
          showMobileChat ? "flex" : "hidden md:flex",
        )}
      >
        <ChatWindow
          chatId={selectedChatId}
          chat={currentChat}
          showDetails={showDetails}
          onToggleDetails={() => setShowDetails(!showDetails)}
          onBack={() => setShowMobileChat(false)}
        />
      </div>

      {/* Right Sidebar: Chat Details */}
      {showDetails && (
        <ChatDetails chat={currentChat} onClose={() => setShowDetails(false)} />
      )}
    </div>
  );
}
