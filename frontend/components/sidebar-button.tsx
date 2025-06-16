"use client";

import { useCallback, useEffect, useState } from "react";
import { PanelLeft, Clock, Loader2, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ISession } from "@/typings/agent";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [isOpen, setIsOpen] = useState(true);
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredSessions = sessions.filter(session =>
    session.first_message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={cn("flex h-full", className)}>
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
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="搜索会话..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-9 bg-gray-50 border-0 transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-white"
                />
              </div>
            </div>

            <div className="overflow-y-auto p-2 h-[calc(100%-3.5rem)]">
                   <div className="space-y-4">
                  {/* 团队分组 */}
                  <div>
                    <h3 className="px-2 mb-2 text-sm font-semibold text-gray-500">团队</h3>
                    <div className="space-y-2">
                      {[
                        {
                          id: 1,
                          name: "张明",
                          role: "产品经理",
                          avatar: "/roles/og_team1.png",
                          lastMessage: "我们需要重新规划一下产品路线图",
                          time: "10:30"
                        },
                        {
                          id: 2,
                          name: "李华",
                          role: "前端开发",
                          avatar: "/roles/og_team2.png",
                          lastMessage: "新功能已经开发完成，等待测试",
                          time: "09:45"
                        },
                        {
                          id: 3,
                          name: "王芳",
                          role: "UI设计师",
                          avatar: "/roles/og_team3.png",
                          lastMessage: "设计稿已经更新到最新版本",
                          time: "昨天"
                        },
                        {
                          id: 4,
                          name: "刘强",
                          role: "后端开发",
                          avatar: "/roles/og_team4.png",
                          lastMessage: "API接口已经完成优化",
                          time: "昨天"
                        }
                      ].map((member) => (
                        <div
                          key={member.id}
                          className="flex items-start p-2 space-x-3 rounded-md transition-colors cursor-pointer hover:bg-purple-50"
                        >
                          <div className="overflow-hidden relative w-10 h-10 rounded-full">
                            <Image
                              src={member.avatar}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-1">
                                <span className="text-sm font-medium text-gray-900">{member.name}</span>
                                <span className="text-xs text-gray-500">· {member.role}</span>
                              </div>
                              {/* <span className="text-xs text-gray-500">{member.time}</span> */}
                            </div>
                            <p className="text-sm text-gray-600 truncate mt-0.5">
                              {member.lastMessage}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 角色分组 */}
                  <div>
                    <h3 className="px-2 mb-2 text-sm font-semibold text-gray-500">角色</h3>
                    <div className="space-y-2">
                      {[
                        {
                          id: 1,
                          name: "AI助手",
                          role: "智能助手",
                          avatar: "/roles/og_act1.png",
                          lastMessage: "我可以帮你完成各种任务",
                          time: "刚刚"
                        },
                        {
                          id: 2,
                          name: "数据分析师",
                          role: "数据专家",
                          avatar: "/roles/og_act2.png",
                          lastMessage: "数据报告已经生成完成",
                          time: "1小时前"
                        },
                        {
                          id: 3,
                          name: "代码专家",
                          role: "编程助手",
                          avatar: "/roles/og_act3.png",
                          lastMessage: "代码优化建议已提供",
                          time: "2小时前"
                        },
                        {
                          id: 4,
                          name: "创意总监",
                          role: "创意顾问",
                          avatar: "/roles/og_act4.png",
                          lastMessage: "新的创意方案已准备就绪",
                          time: "3小时前"
                        }
                      ].map((member) => (
                        <div
                          key={member.id}
                          className="flex items-start p-2 space-x-3 rounded-md transition-colors cursor-pointer hover:bg-purple-50"
                        >
                          <div className="overflow-hidden relative w-10 h-10 rounded-full">
                            <Image
                              src={member.avatar}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-1">
                                <span className="text-sm font-medium text-gray-900">{member.name}</span>
                                <span className="text-xs text-gray-500">· {member.role}</span>
                              </div>
                              {/* <span className="text-xs text-gray-500">{member.time}</span> */}
                            </div>
                            <p className="text-sm text-gray-600 truncate mt-0.5">
                              {member.lastMessage}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              {/* {!isLoading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
                </div>
              ) : !error ? (
                <div className="p-2 text-sm text-red-400">{error}</div>
              ) : filteredSessions.length !== 0 ? (
                <div className="p-2 text-sm text-gray-500">
                  {searchQuery ? "未找到匹配的会话" : "暂无会话"}
                </div>
              ) : (
         
              )} */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 侧边栏按钮和头像 */}
      <div className="flex flex-col items-center pl-2 mt-4 space-y-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-8 w-8 p-1.5 hover:bg-purple-50"
        >
          <PanelLeft className={cn("w-5 h-5 text-purple-600", isOpen && "rotate-180")} />
        </Button>
        
        {!isOpen && (
          <div className="flex flex-col items-center space-y-3">
            {[
              { id: 1, avatar: "/roles/og_team1.png", name: "张明" },
              { id: 2, avatar: "/roles/og_team2.png", name: "李华" },
              { id: 3, avatar: "/roles/og_team3.png", name: "王芳" },
              { id: 4, avatar: "/roles/og_team4.png", name: "刘强" }
            ].map((member) => (
              <div
                key={member.id}
                className="overflow-hidden relative w-8 h-8 rounded-full transition-all cursor-pointer group hover:ring-2 hover:ring-purple-200"
                title={member.name}
              >
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 transition-colors bg-black/0 group-hover:bg-black/10" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarButton;
