"use client";

import React, { useState } from "react";
import { Bold, Italic, Underline, Link, Smile, Paperclip, Send, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-[#1A1A1A] rounded-2xl p-2 border border-white/5 focus-within:border-[#EFFC76]/30 focus-within:ring-1 focus-within:ring-[#EFFC76]/30 transition-all">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 pb-2 border-b border-white/5">
        <button className="p-1.5 hover:bg-white/10 rounded-md text-white/40 hover:text-white transition-colors">
          <Bold className="w-4 h-4" />
        </button>
        <button className="p-1.5 hover:bg-white/10 rounded-md text-white/40 hover:text-white transition-colors">
          <Italic className="w-4 h-4" />
        </button>
        <button className="p-1.5 hover:bg-white/10 rounded-md text-white/40 hover:text-white transition-colors">
          <Underline className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-white/10 mx-1"></div>
        <button className="p-1.5 hover:bg-white/10 rounded-md text-white/40 hover:text-white transition-colors">
          <Link className="w-4 h-4" />
        </button>
      </div>

      {/* Text Area */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="w-full bg-transparent text-white px-3 py-2 min-h-[40px] max-h-[200px] resize-none focus:outline-none text-sm leading-relaxed placeholder:text-white/20"
        rows={1}
        style={{ height: "auto", minHeight: "40px" }}
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
      />

      {/* Footer Actions */}
      <div className="flex items-center justify-between px-1 pt-1">
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-colors">
            <Paperclip className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-colors">
            <ImageIcon className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-colors">
            <Smile className="w-4 h-4" />
          </button>
        </div>
        
        <button 
          onClick={handleSend}
          disabled={!message.trim()}
          className={cn(
            "p-2 rounded-full transition-all duration-200",
            message.trim() 
              ? "bg-[#EFFC76] text-black hover:bg-[#e0ef5f] hover:scale-105" 
              : "bg-white/5 text-white/20 cursor-not-allowed"
          )}
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </div>
    </div>
  );
}
