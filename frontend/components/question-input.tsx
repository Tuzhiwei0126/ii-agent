import { motion } from "framer-motion";
import { RiLoader2Line, RiAttachmentLine, RiBookLine, RiSendPlaneFill } from "@remixicon/react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useState, useEffect } from "react";
import { getFileIconAndColor } from "@/utils/file-utils";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";

interface FileUploadStatus {
  name: string;
  loading: boolean;
  error?: string;
  preview?: string; // Add preview URL for images
  isImage: boolean; // Flag to identify image files
}

interface QuestionInputProps {
  className?: string;
  textareaClassName?: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (question: string) => void;
  handleFileUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading?: boolean;
  isUseDeepResearch?: boolean;
  setIsUseDeepResearch?: (value: boolean) => void;
  isDisabled?: boolean;
  isGeneratingPrompt?: boolean;
  handleEnhancePrompt?: () => void;
  isLoading?: boolean;
  handleCancel?: () => void;
}

const QuestionInput = ({
  className,
  textareaClassName,
  placeholder,
  value,
  setValue,
  handleKeyDown,
  handleSubmit,
  handleFileUpload,
  isUploading = false,
  isUseDeepResearch = false,
  setIsUseDeepResearch,
  isDisabled,
  isGeneratingPrompt = false,
  handleEnhancePrompt,
  isLoading = false,
  handleCancel,
}: QuestionInputProps) => {
  const [files, setFiles] = useState<FileUploadStatus[]>([]);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  const isImageFile = (fileName: string): boolean => {
    const ext = fileName.split(".").pop()?.toLowerCase() || "";
    return ["jpg", "jpeg", "png", "gif", "webp", "bmp", "heic", "svg"].includes(
      ext
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !handleFileUpload) return;

    // Create file status objects
    const newFiles = Array.from(e.target.files).map((file) => {
      const isImage = isImageFile(file.name);
      const preview = isImage ? URL.createObjectURL(file) : undefined;

      return {
        name: file.name,
        loading: true,
        isImage,
        preview,
      };
    });

    setFiles((prev) => [...prev, ...newFiles]);

    // Call the parent handler
    handleFileUpload(e);

    // After a delay, mark files as not loading (this would ideally be handled by the parent)
    setTimeout(() => {
      setFiles((prev) => prev.map((file) => ({ ...file, loading: false })));
    }, 5000);
  };

  // const removeFile = (fileName: string) => {
  //   setFiles((prev) => {
  //     // Find the file to remove
  //     const fileToRemove = prev.find((file) => file.name === fileName);

  //     // Revoke object URL if it exists
  //     if (fileToRemove?.preview) {
  //       URL.revokeObjectURL(fileToRemove.preview);
  //     }

  //     // Filter out the file
  //     return prev.filter((file) => file.name !== fileName);
  //   });
  // };

  return (
    <motion.div
      key="input-view"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1,
      }}
      className={cn("z-50 w-full max-w-2xl", className)}
    >
      <motion.div
        className={cn(
          "relative rounded-2xl border border-[#6B48FF80] bg-white shadow-[0_0_10px_rgba(107,72,255,0.5)]",
          isDisabled && "opacity-50 pointer-events-none"
        )}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {files.length > 0 && (
          <div className="flex overflow-auto absolute right-2 top-4 left-4 z-10 gap-2 items-center">
            {files.map((file) => {
              if (file.isImage && file.preview) {
                return (
                  <div key={file.name} className="relative">
                    <div className="overflow-hidden w-20 h-20 rounded-xl">
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {file.loading && (
                      <div className="flex absolute inset-0 justify-center items-center rounded-xl bg-black/30">
                        <RiLoader2Line className="text-white animate-spin size-5" />
                      </div>
                    )}
                  </div>
                );
              }

              const { IconComponent, bgColor, label } = getFileIconAndColor(
                file.name
              );

              return (
                <div
                  key={file.name}
                  className="flex items-center gap-2 bg-white text-[#6B48FF] rounded-full px-3 py-2 border border-[#6B48FF40] shadow-sm"
                >
                  <div
                    className={`flex justify-center items-center w-10 h-10 rounded-full ${bgColor}`}
                  >
                    {isUploading ? (
                      <RiLoader2Line className="text-white animate-spin size-5" />
                    ) : (
                      <IconComponent className="text-white size-5" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium truncate max-w-[200px] text-black">
                      {file.name}
                    </span>
                    <span className="text-xs text-[#6B48FF80]">{label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <Textarea
          className={cn(
            "w-full p-4 pb-[72px] rounded-2xl text-lg focus:ring-0 resize-none",
            "placeholder-gray-400 bg-white text-black border-none",
            "focus:shadow-[0_0_0_2px_rgba(107,72,255,0.3)]",
            files.length > 0 ? "pt-24 h-60" : "h-40",
            textareaClassName
          )}
          placeholder={placeholder || "输入您的问题..."}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="flex absolute bottom-0 justify-between items-center px-4 py-2 w-full bg-white rounded-b-2xl">
          <div className="flex gap-x-3 items-center">
            {handleFileUpload && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <div
                      role="button"
                      tabIndex={0}
                      className="flex items-center justify-center hover:bg-[#8B5CF610] active:bg-[#8B5CF620] size-12 rounded-xl cursor-pointer text-[#8B5CF6] transition-all duration-200 hover:scale-105 active:scale-95 hover:text-[#7C3AED]"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      {isUploading ? (
                        <RiLoader2Line className="animate-spin size-6" />
                      ) : (
                        <RiAttachmentLine className="size-6" />
                      )}
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      disabled={isUploading || isLoading}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>上传文件</TooltipContent>
              </Tooltip>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  role="button"
                  tabIndex={0}
                  className="flex items-center justify-center hover:bg-[#8B5CF610] active:bg-[#8B5CF620] size-12 rounded-xl cursor-pointer text-[#8B5CF6] transition-all duration-200 hover:scale-105 active:scale-95 hover:text-[#7C3AED]"
                >
                  <RiBookLine className="size-6" />
                </div>
              </TooltipTrigger>
              <TooltipContent>知识库</TooltipContent>
            </Tooltip>
            {/* {setIsUseDeepResearch && (
              <Button
                variant="outline"
                className={cn(
                  "h-12 px-4 cursor-pointer rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95",
                  isUseDeepResearch
                    ? "bg-[#8B5CF6] text-white hover:bg-[#7C3AED] border-[#8B5CF6] active:bg-[#7C3AED]"
                    : "border-[#8B5CF640] text-[#8B5CF6] hover:bg-[#8B5CF610] active:bg-[#8B5CF620]"
                )}
                onClick={() => setIsUseDeepResearch?.(!isUseDeepResearch)}
              >
                深度研究
              </Button>
            )} */}
          </div>

          <div className="flex gap-x-3 items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  role="button"
                  tabIndex={0}
                  className="flex items-center justify-center hover:bg-[#8B5CF610] active:bg-[#8B5CF620] size-12 rounded-xl cursor-pointer text-[#8B5CF6] transition-all duration-200 hover:scale-105 active:scale-95 hover:text-[#7C3AED]"
                  onClick={handleEnhancePrompt}
                >
                  {isGeneratingPrompt ? (
                    <RiLoader2Line className="animate-spin size-6" />
                  ) : (
                    <Image
                      src="/icons/AI.svg"
                      alt="Logo"
                      width={28}
                      height={28}
                      className="transition-transform duration-200 hover:scale-110"
                    />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>优化提示词</TooltipContent>
            </Tooltip>
            {isLoading && handleCancel ? (
              <div
                role="button"
                tabIndex={0}
                className="flex items-center justify-center hover:bg-[#8B5CF610] active:bg-[#8B5CF620] size-12 rounded-xl cursor-pointer text-[#8B5CF6] transition-all duration-200 hover:scale-105 active:scale-95 hover:text-[#7C3AED]"
                onClick={handleCancel}
              >
                <div className="bg-[#8B5CF6] size-4 rounded-xs" />
              </div>
            ) : (
              <div
                role="button"
                tabIndex={0}
                className={cn(
                  "flex items-center justify-center size-12 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95",
                  "bg-[#8B5CF6] hover:bg-[#7C3AED] active:bg-[#7C3AED] text-white",
                  "disabled:bg-[#8B5CF610] disabled:text-[#8B5CF650] disabled:hover:scale-100 disabled:active:scale-100",
                  (!value.trim() || isDisabled || isLoading) && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => !isDisabled && !isLoading && value.trim() && handleSubmit(value)}
              >
                <RiSendPlaneFill className="size-6" />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuestionInput;
