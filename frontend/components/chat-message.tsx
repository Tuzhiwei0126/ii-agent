"use client";

import { motion } from "framer-motion";
import { Pencil, Copy, Check } from "lucide-react";
import { RiCheckFill, RiStopCircleFill } from "@remixicon/react";
import { useState } from "react";

import Action from "@/components/action";
import Markdown from "@/components/markdown";
import QuestionInput from "@/components/question-input";
import DynamicForm from "@/components/dynamic-form";
import HtmlForm from "@/components/html-form";
import { ActionStep, Message } from "@/typings/agent";
import { getFileIconAndColor } from "@/utils/file-utils";
import { Button } from "./ui/button";
import EditQuestion from "./edit-question";
import { toast } from "sonner";

interface ChatMessageProps {
  messages: Message[];
  isLoading: boolean;
  isCompleted: boolean;
  isStopped: boolean;
  workspaceInfo: string;
  isUploading: boolean;
  isUseDeepResearch: boolean;
  isReplayMode: boolean;
  currentQuestion: string;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  handleClickAction: (
    action: ActionStep | undefined,
    isReplay?: boolean
  ) => void;
  setCurrentQuestion: (question: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleQuestionSubmit: (question: string) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isGeneratingPrompt: boolean;
  handleEnhancePrompt: () => void;
  handleCancel?: () => void;
  editingMessage: Message | undefined;
  setEditingMessage: (message: Message | undefined) => void;
  handleEditMessage: (newContent: string) => void;
  handleFormSubmit?: (messageId: string, formData: Record<string, unknown>) => void;
}

const ChatMessage = ({
  messages,
  isLoading,
  isCompleted,
  isStopped,
  workspaceInfo,
  isUploading,
  isUseDeepResearch,
  currentQuestion,
  messagesEndRef,
  isReplayMode,
  handleClickAction,
  setCurrentQuestion,
  handleKeyDown,
  handleQuestionSubmit,
  handleFileUpload,
  isGeneratingPrompt,
  handleEnhancePrompt,
  handleCancel,
  editingMessage,
  setEditingMessage,
  handleEditMessage,
  handleFormSubmit,
}: ChatMessageProps) => {
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const handleCopyMessage = (content: string, messageId: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMessageId(messageId);
    toast.success("已复制到剪贴板");
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  // Helper function to check if a message is the latest user message
  const isLatestUserMessage = (
    message: Message,
    allMessages: Message[]
  ): boolean => {
    const userMessages = allMessages.filter((msg) => msg.role === "user");
    return (
      userMessages.length > 0 &&
      userMessages[userMessages.length - 1].id === message.id
    );
  };

  return (
    <div className="col-span-4 h-full">
      <motion.div
        className="p-4 pt-0 w-full h-full max-h-[calc(100vh-230px)] overflow-y-auto relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            className={`mb-4 ${
              message.role === "user" ? "text-right mb-8" : "text-left"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
          >
            {message.files && message.files.length > 0 && (
              <div className="flex flex-col gap-2 mb-2">
                {message.files.map((fileName, fileIndex) => {
                  // Check if the file is an image
                  const isImage =
                    fileName.match(
                      /\.(jpeg|jpg|gif|png|webp|svg|heic|bmp)$/i
                    ) !== null;

                  if (
                    isImage &&
                    message.fileContents &&
                    message.fileContents[fileName]
                  ) {
                    return (
                      <div
                        key={`${message.id}-file-${fileIndex}`}
                        className="inline-block ml-auto rounded-3xl overflow-hidden max-w-[320px]"
                      >
                        <div className="overflow-hidden w-40 h-40 rounded-xl">
                          <img
                            src={message.fileContents[fileName]}
                            alt={fileName}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    );
                  }

                  // For non-image files, use the existing code
                  const { IconComponent, bgColor, label } =
                    getFileIconAndColor(fileName);

                  return (
                    <div
                      key={`${message.id}-file-${fileIndex}`}
                      className="inline-block ml-auto bg-[#35363a] text-[#888888] rounded-2xl px-4 py-3 border border-gray-700 shadow-sm"
                    >
                      <div className="flex gap-3 items-center">
                        <div
                          className={`flex justify-center items-center w-12 h-12 rounded-xl ${bgColor}`}
                        >
                          <IconComponent className="size-6 text-[#666666]" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-medium text-[#444444]">
                            {fileName}
                          </span>
                          <span className="text-left text-sm text-[#999999]">
                            {label}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {message.content && (
              <motion.div
                className={`inline-block text-left rounded-lg ${
                  message.role === "user"
                    ? "bg-[#D8D7FF] p-3 max-w-[80%] font-medium font-weight-400 text-sm border-none text-[#444444] shadow-sm whitespace-pre-wrap"
                    : "p-4 max-w-[80%] text-[#333333]"
                } ${
                  editingMessage?.id === message.id ? "w-full max-w-none" : ""
                }`}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              >
                {message.role === "user" ? (
                  <div>
                    {editingMessage?.id === message.id ? (
                      <EditQuestion
                        editingMessage={message.content}
                        handleCancel={() => setEditingMessage(undefined)}
                        handleEditMessage={handleEditMessage}
                      />
                    ) : (
                      <div className="relative group">
                        <div className="text-left">{message.content}</div>
                        {isLatestUserMessage(message, messages) &&
                          !isReplayMode && (
                            <div className="absolute -bottom-[45px] -right-[20px] opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-xs cursor-pointer hover:!bg-transparent"
                                onClick={() => {
                                  setEditingMessage(message);
                                }}
                              >
                                <Pencil className="mr-1 size-3" />
                              </Button>
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative group">
                    <Markdown>{message.content}</Markdown>
                    <div className="flex absolute top-2 right-2 gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-gray-500 hover:text-gray-700"
                        onClick={() => handleCopyMessage(message.content || "", message.id)}
                      >
                        {copiedMessageId === message.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* 表单渲染 */}
                {message.formConfig && handleFormSubmit && (
                  <div className="mt-4">
                    <DynamicForm
                      formConfig={message.formConfig}
                      onSubmit={(formData) => handleFormSubmit(message.id, formData)}
                      isSubmitting={message.isFormSubmitted || false}
                    />
                  </div>
                )}
                
                {/* HTML表单渲染 */}
                {message.htmlForm && handleFormSubmit && (
                  <div className="mt-4">
                    <HtmlForm
                      htmlContent={message.htmlForm}
                      onSubmit={(formData) => handleFormSubmit(message.id, formData)}
                      isSubmitting={message.isFormSubmitted || false}
                    />
                  </div>
                )}
              </motion.div>
            )}

            {message.action && (
              <motion.div
                className="mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <Action
                  workspaceInfo={workspaceInfo}
                  type={message.action.type}
                  value={message.action.data}
                  onClick={() => handleClickAction(message.action, true)}
                />
              </motion.div>
            )}
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            className="mb-4 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <motion.div
              className="inline-block p-4 text-left rounded-xl shadow-sm bg-gray-50/50"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
            >
              <div className="flex gap-3 items-center">
                {/* Material Design 风格的加载动画 */}
                <div className="flex space-x-1">
                  <motion.div 
                    className="w-2 h-2 bg-blue-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ 
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-blue-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ 
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.2
                    }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-blue-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ 
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.4
                    }}
                  />
                </div>
                
                <span className="text-sm font-medium text-gray-500">
                  正在思考中...
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isCompleted && (
          <motion.div 
            className="flex gap-3 items-center px-4 py-3 text-sm bg-green-50 rounded-xl border border-green-200 shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.5
            }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 0.6
              }}
            >
              <RiCheckFill className="text-green-600 size-5" />
            </motion.div>
            <div>
              <span className="font-medium text-green-800">
                任务完成
              </span>
              <div className="text-xs text-green-600 mt-0.5">
                可以继续提问或开始新任务
              </div>
            </div>
          </motion.div>
        )}

        {isStopped && (
          <motion.div 
            className="flex gap-3 items-center px-4 py-3 text-sm bg-orange-50 rounded-xl border border-orange-200 shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.5
            }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 0]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <RiStopCircleFill className="text-orange-600 size-5" />
            </motion.div>
            <div>
              <span className="font-medium text-orange-800">
                任务已暂停
              </span>
              <div className="text-xs text-orange-600 mt-0.5">
                准备好时可以继续
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </motion.div>
      <motion.div
        className="sticky bottom-0 left-0 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <QuestionInput
          className="px-2 pb-2 w-full max-w-none"
          textareaClassName="h-30 w-full"
          placeholder="Ask me anything..."
          value={currentQuestion}
          setValue={setCurrentQuestion}
          handleKeyDown={handleKeyDown}
          handleSubmit={handleQuestionSubmit}
          handleFileUpload={handleFileUpload}
          isUploading={isUploading}
          isUseDeepResearch={isUseDeepResearch}
          isGeneratingPrompt={isGeneratingPrompt}
          handleEnhancePrompt={handleEnhancePrompt}
          isLoading={isLoading}
          handleCancel={handleCancel}
        />
      </motion.div>
    </div>
  );
};

export default ChatMessage;
