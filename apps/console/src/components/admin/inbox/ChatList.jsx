"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MessageSquare,
  Users,
  Bell,
  Pin,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { useGetChannelsQuery } from "@/api/inboxApi";

const TABS = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" }, // Logic for unread might be hard without more data
  { id: "channel", label: "Channels" },
];

export default function ChatList({ selectedChatId, onSelectChat }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const { data: channels = [], isLoading } = useGetChannelsQuery();

  // Map Discord channels to ChatList format
  const chatItems = React.useMemo(() => {
     if (!channels) return [];
     return channels.map(item => ({
        id: item.id,
        name: item.name,
        type: item.type, // 'channel' or 'dm'
        lastMessage: item.type === 'channel' ? "Join conversation" : "Start chatting", 
        time: "",
        notifications: 0,
        avatar: item.avatar ? null : item.name.substring(0, 2).toUpperCase(),
        image: item.avatar, // Discord Avatar URL
        color: item.type === 'channel' ? "bg-indigo-500" : "bg-green-500", 
        status: item.status !== 'offline' ? item.status : null,
        isPinned: false
     }));
  }, [channels]);

  const filteredChats = chatItems.filter((chat) => {
    const matchesSearch = chat.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "all"
        ? true
        : activeTab === "unread"
          ? false // No unread data yet
          : activeTab === "channel"
            ? true
            : true;

    return matchesSearch && matchesTab;
  });

  const pinnedChats = []; // No pinned logic for now
  const otherChats = filteredChats;

  const renderChatItem = (chat) => {
    const isSelected = selectedChatId === chat.id;
    return (
      <div
        key={chat.id}
        onClick={() => onSelectChat(chat.id)}
        className={cn(
          "group flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border border-transparent",
          isSelected
            ? "bg-white/5 border-white/5 shadow-sm"
            : "hover:bg-white/5 hover:border-white/5",
        )}
      >
        <div className="relative shrink-0">
          {chat.image ? (
            <img
              src={chat.image}
              alt={chat.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-white/10 transition-all"
            />
          ) : (
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-inner",
                chat.color || "bg-gray-600",
              )}
            >
              {chat.avatar}
            </div>
          )}

          {chat.status && (
            <div
              className={cn(
                "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#1A1A1A]",
                chat.status === "online"
                  ? "bg-green-500"
                  : chat.status === "busy"
                    ? "bg-red-500"
                    : "bg-transparent",
              )}
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <h3
              className={cn(
                "font-medium truncate transition-colors",
                isSelected
                  ? "text-white"
                  : "text-white/90 group-hover:text-white",
              )}
            >
              {chat.name}
            </h3>
            <span
              className={cn(
                "text-[10px] whitespace-nowrap transition-colors",
                isSelected
                  ? "text-white/50"
                  : "text-white/30 group-hover:text-white/50",
              )}
            >
              {chat.time}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p
              className={cn(
                "text-xs truncate flex-1 transition-colors",
                isSelected
                  ? "text-white/60"
                  : "text-white/40 group-hover:text-white/50",
                chat.notifications > 0 ? "font-medium text-white/80" : "",
              )}
            >
              {chat.type === "self" ? (
                <span className="text-[#EFFC76] mr-1">You:</span>
              ) : null}
              {chat.lastMessage}
            </p>

            {chat.notifications > 0 && (
              <span className="min-w-[1.25rem] h-5 px-1.5 flex items-center justify-center rounded-full bg-[#EFFC76] text-black text-[10px] font-bold shadow-[0_0_10px_rgba(239,252,118,0.3)]">
                {chat.notifications}
              </span>
            )}
            {chat.isPinned && chat.notifications === 0 && (
              <Pin className="w-3 h-3 text-white/20" />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#1A1A1A]">
      {/* Header */}
      <div className="p-4 space-y-4 shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl text-white tracking-tight flex items-center gap-2">
            Messages
            <span className="text-xs font-normal text-white/30 px-2 py-0.5 rounded-full bg-white/5">
              {filteredChats.length}
            </span>
          </h2>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-white/5 rounded-full text-white/60 hover:text-white transition-all">
              <MoreHorizontal className="w-4 h-4" />
            </button>
            <button className="p-2 bg-[#EFFC76] hover:bg-[#e0ef5f] rounded-full text-black transition-all shadow-[0_0_15px_rgba(239,252,118,0.2)] hover:shadow-[0_0_20px_rgba(239,252,118,0.4)]">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative group">
          <Search className="w-4 h-4 text-white/30 absolute left-3 top-2.5 group-focus-within:text-[#EFFC76] transition-colors" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#121212] border border-white/5 text-white text-sm rounded-xl py-2 pl-9 pr-4 placeholder:text-white/20 focus:outline-none focus:border-[#EFFC76]/50 focus:ring-1 focus:ring-[#EFFC76]/50 transition-all"
          />
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-[#121212] rounded-lg border border-white/5">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
                activeTab === tab.id
                  ? "bg-[#2D2D30] text-white shadow-sm"
                  : "text-white/40 hover:text-white/70 hover:bg-white/5",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {/* Pinned Section */}
        {pinnedChats.length > 0 && activeTab === "all" && !searchTerm && (
          <div className="space-y-1">
            <div className="px-3 flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-wider mb-2">
              <Pin className="w-3 h-3" /> Pinned
            </div>
            {pinnedChats.map(renderChatItem)}
          </div>
        )}

        {/* All Chats Section */}
        <div className="space-y-1">
          {pinnedChats.length > 0 && activeTab === "all" && !searchTerm && (
            <div className="px-3 flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-wider mt-6 mb-2">
              <MessageSquare className="w-3 h-3" /> All Messages
            </div>
          )}
          {/* If filtering, show all matches. If not, show otherChats (unpinned) */}
          {(searchTerm || activeTab !== "all" ? filteredChats : otherChats).map(
            renderChatItem,
          )}

          {filteredChats.length === 0 && (
            <div className="text-center py-8 text-white/20 text-sm">
              No messages found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
