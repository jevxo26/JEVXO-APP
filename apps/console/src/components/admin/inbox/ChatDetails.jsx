import React from "react";
import {
  X,
  Bell,
  Ban,
  Trash2,
  Image,
  FileText,
  Link as LinkIcon,
  ChevronRight,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChatDetails({ chat, onClose }) {
  if (!chat) return null;

  return (
    <div className={cn(
      "flex flex-col h-full bg-[#1A1A1A] border-l border-white/5",
      "fixed inset-0 z-[100] w-full md:relative md:w-80 md:inset-auto md:z-auto"
    )}>
      {/* Header */}
      <div className="h-16 px-6 border-b border-white/5 flex items-center justify-between shrink-0">
        <h3 className="text-white font-bold">Details</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {/* Profile Info */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            {chat.image ? (
              <img
                src={chat.image}
                alt={chat.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-white/5"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-3xl font-bold text-white ring-4 ring-white/5">
                {chat.name.substring(0, 2)}
              </div>
            )}
            {chat.status && (
              <div
                className={cn(
                  "absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-[#1A1A1A]",
                  chat.status === "online"
                    ? "bg-green-500"
                    : chat.status === "busy"
                      ? "bg-red-500"
                      : "bg-transparent",
                )}
              ></div>
            )}
          </div>
          <h2 className="text-xl font-bold text-white mb-1">{chat.name}</h2>
          <p className="text-sm text-white/50">
            {chat.type === "Channel"
              ? "24 members • 5 online"
              : chat.status === "online"
                ? "Active now"
                : "Last seen recently"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <Bell className="w-5 h-5 text-white/70" />
            </div>
            <span className="text-xs text-white/50">Mute</span>
          </button>
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <Search className="w-5 h-5 text-white/70" />
            </div>
            <span className="text-xs text-white/50">Search</span>
          </button>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {/* Shared Media */}
          <div>
            <button className="w-full flex items-center justify-between text-white/90 font-medium mb-3 hover:text-white transition-colors">
              <span>Shared Media</span>
              <ChevronRight className="w-4 h-4 text-white/50" />
            </button>
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square bg-white/5 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607686527-6fb886090705?w=500&auto=format&fit=crop&q=60"
                  className="w-full h-full object-cover hover:scale-110 transition-transform"
                  alt="media"
                />
              </div>
              <div className="aspect-square bg-white/5 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558655146-d09347e0b7a8?w=500&auto=format&fit=crop&q=60"
                  className="w-full h-full object-cover hover:scale-110 transition-transform"
                  alt="media"
                />
              </div>
              <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center text-white/30 text-xs">
                +12
              </div>
            </div>
          </div>

          {/* Files */}
          <div className="pt-4 border-t border-white/5">
            <button className="w-full flex items-center justify-between text-white/90 font-medium mb-3 hover:text-white transition-colors">
              <span>Files & Links</span>
              <ChevronRight className="w-4 h-4 text-white/50" />
            </button>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">
                    Project_Brief_v2.pdf
                  </p>
                  <p className="text-xs text-white/40">2.4 MB • Today</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <LinkIcon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">
                    Figma Design System
                  </p>
                  <p className="text-xs text-white/40">figma.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="pt-4 border-t border-white/5 space-y-2">
            <button className="w-full flex items-center gap-3 text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors text-sm">
              <Ban className="w-4 h-4" />
              <span>Block User</span>
            </button>
            <button className="w-full flex items-center gap-3 text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors text-sm">
              <Trash2 className="w-4 h-4" />
              <span>Delete Conversation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


