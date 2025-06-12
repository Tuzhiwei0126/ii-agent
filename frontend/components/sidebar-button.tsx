"use client";

import { useCallback, useEffect, useState } from "react";
import { PanelLeft, Clock, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ISession } from "@/typings/agent";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
});

interface SidebarButtonProps {
  className?: string;
  workspaceInfo?: string;
}

const SidebarButton = ({ className, workspaceInfo }: SidebarButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const deviceId = Cookies.get("device_id") || "";

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setActiveSessionId(id);
    }
  }, [searchParams]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const fetchSessions = useCallback(async () => {
    if (!deviceId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/sessions/${deviceId}`
      );

      if (!response.ok) {
        throw new Error(`Error fetching sessions: ${response.statusText}`);
      }

      const data = await response.json();
      setSessions(data.sessions || []);
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
      setError("Failed to load sessions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [deviceId]);

  const handleSessionClick = (sessionId: string) => {
    window.location.href = `/?id=${sessionId}`;
  };

  const formatDate = (dateString: string) => {
    try {
      return dayjs(dateString).format("MMM D, YYYY h:mm A");
    } catch {
      return dateString;
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return (
    <div className={cn("flex h-full border-r border-gray-200", className)}>
      {/* 侧边栏内容 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            exit={{ width: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="overflow-hidden h-full bg-white"
          >
            <div className="flex gap-3 items-center p-4 bg-white border-b border-purple-100">
              <div
                className="flex justify-center items-center w-8 h-8 bg-purple-50 rounded-md cursor-pointer hover:bg-purple-100"
                onClick={toggleSidebar}
              >
                <PanelLeft className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex gap-2 items-center">
                <Image
                  src="/logo-only.png"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="rounded-sm"
                />
                <span
                  className={`text-purple-700 text-lg font-serif ${orbitron.className}`}
                >
                  GoAgent
                </span>
              </div>
            </div>

            <div className="overflow-y-auto p-2 h-full">
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
                </div>
              ) : error ? (
                <div className="p-2 text-sm text-red-400">{error}</div>
              ) : sessions.length === 0 ? (
                <div className="p-2 text-sm text-gray-500">
                  暂无会话
                </div>
              ) : (
                <div className="space-y-2">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      onClick={() => handleSessionClick(session.id)}
                      className={cn(
                        "p-2 rounded-md cursor-pointer hover:bg-purple-50 transition-colors",
                        activeSessionId === session.id ||
                          workspaceInfo?.includes(session.id)
                          ? "bg-purple-50 border border-purple-200"
                          : ""
                      )}
                    >
                      <div className="text-sm font-medium text-gray-800 truncate">
                        {session.first_message}
                      </div>
                      <div className="flex gap-1 items-center mt-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {formatDate(session.created_at)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 侧边栏按钮 */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-8 w-8 p-1.5 hover:bg-purple-50"
        >
          <PanelLeft className="w-5 h-5 text-purple-600" />
        </Button>
      </div>
    </div>
  );
};

export default SidebarButton;
