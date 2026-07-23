"use client";
import React, { useState, useEffect, useRef } from "react";
import MessageInput from "./MessageInput";
import {
  MoreHorizontal,
  Phone,
  Video,
  Search,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { useGetMessagesQuery, useSendMessageMutation } from "@/api/inboxApi";

export default function ChatWindow({ chatId, chat, showDetails, onToggleDetails, onBack }) {
  const messagesEndRef = useRef(null);
  
  const { data: messagesData = [], isLoading } = useGetMessagesQuery(chatId, {
    skip: !chatId,
  });
  
  const [sendMessage] = useSendMessageMutation();

  const messages = React.useMemo(() => {
    return messagesData.map(msg => ({
        id: msg.id,
        sender: msg.author.username,
        senderId: msg.author.bot ? 'bot' : (msg.author.username === 'SquadLog' ? 'self' : 'other'), // Simple heuristic
        text: msg.content,
        time: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: msg.author.username.substring(0, 1).toUpperCase(),
        image: msg.author.avatar, 
        isSelf: msg.author.username === 'SquadLog' // Assuming our bot is 'SquadLog'
    }));
  }, [messagesData]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatId]);

  const handleSendMessage = async (text) => {
    if (!chatId || !text.trim()) return;
    try {
        await sendMessage({ channelId: chatId, content: text }).unwrap();
    } catch (error) {
        console.error("Failed to send message", error);
    }
  };

  if (!chat) return <div className="flex items-center justify-center h-full text-white/30">Select a chat</div>;

  return (
    <div className="flex flex-col h-full bg-[#121212]">
      {/* Header */}
      <div className="h-16 px-6 border-b border-white/5 flex items-center justify-between bg-[#121212] shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <button 
              onClick={onBack}
              className="p-2 -ml-2 text-white/60 hover:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="relative">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-sm font-bold text-white ring-2 ring-white/10">
                {chat.name.substring(0, 2).toUpperCase()}
             </div>
          </div>

          <div>
            <h2 className="text-white font-bold flex items-center gap-2 text-base">
              {chat.name}
              <span className="px-1.5 py-0.5 rounded-full bg-white/5 text-[10px] text-white/50 font-normal border border-white/5">
                  {chat.type === 'channel' ? 'Channel' : 'DM'}
              </span>
            </h2>
            <p className="text-xs text-white/50">
               {chat.type === 'channel' ? 'Discord Channel' : 'Direct Message'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button 
            title="Search"
            className="p-2 hover:bg-white/5 rounded-full text-white/60 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          <button 
             onClick={() => {
                alert("Joining Voice Channel functionality would trigger a Discord Protocol link here: discord://...");
                console.log("Test Call Clicked");
             }}
             title="Test Call"
             className="p-2 hover:bg-white/5 rounded-full text-white/60 hover:text-white transition-colors">
            <Video className="w-5 h-5" />
          </button>
          
          <button 
             onClick={() => {
                alert("Voice Clip functionality requires media recorder API implementation.");
                console.log("Test Voice Clip Clicked");
             }}
             title="Test Voice Clip"
             className="p-2 hover:bg-white/5 rounded-full text-white/60 hover:text-white transition-colors">
            <Phone className="w-5 h-5" />
          </button>

          <div className="w-px h-5 bg-white/10 mx-2"></div>
          <button
            onClick={onToggleDetails}
            className={cn(
              "p-2 rounded-full transition-colors",
              showDetails
                ? "bg-[#EFFC76] text-black hover:bg-[#e0ef5f]"
                : "text-white/60 hover:bg-white/5 hover:text-white",
            )}
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.map((msg, index) => {
          const isSelf = msg.senderId === "self";
          const isSystem = msg.senderId === "system";
          const showAvatar =
            !isSelf &&
            !isSystem &&
            (index === 0 || messages[index - 1].senderId !== msg.senderId);

          if (isSystem) {
            return (
              <div key={msg.id} className="flex justify-center my-4">
                <span className="bg-white/5 text-white/40 text-xs px-3 py-1 rounded-full">
                  {msg.text}
                </span>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3 max-w-[80%]",
                isSelf ? "ml-auto flex-row-reverse" : "",
              )}
            >
              {!isSelf && (
                <div className="w-8 shrink-0 flex flex-col items-center">
                  {showAvatar ? (
                    msg.image ? (
                      <img
                        src={msg.image}
                        alt={msg.sender}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium text-white/70">
                        {msg.avatar}
                      </div>
                    )
                  ) : (
                    <div className="w-8" />
                  )}
                </div>
              )}

              <div
                className={cn("group", isSelf ? "items-end" : "items-start")}
              >
                <div className="flex items-end gap-2 mb-1">
                  {!isSelf && showAvatar && (
                    <span className="text-xs text-white/40 ml-1">
                      {msg.sender}
                    </span>
                  )}
                  {!isSelf && !showAvatar && (
                    <span className="h-0 block"></span>
                  )}
                </div>

                <div
                  className={cn(
                    "px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm relative group-hover:shadow-md transition-shadow",
                    isSelf
                      ? "bg-[#EFFC76] text-black rounded-tr-sm"
                      : "bg-[#252526] text-white/90 rounded-tl-sm border border-white/5",
                  )}
                >
                  {msg.text}
                </div>

                <div
                  className={cn(
                    "flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity",
                    isSelf ? "flex-row-reverse" : "",
                  )}
                >
                  <span className="text-[10px] text-white/20">{msg.time}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-[#121212]">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
