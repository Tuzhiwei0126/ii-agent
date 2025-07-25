"use client";

import type { editor } from "monaco-editor";
import { Editor, Monaco } from "@monaco-editor/react";
import {
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { ActionStep, TAB } from "@/typings/agent";

const ROOT_NAME = "GoAgent";

// Map file extensions to Monaco editor language IDs
const languageMap: { [key: string]: string } = {
  ts: "typescript",
  tsx: "typescript",
  js: "javascript",
  jsx: "javascript",
  json: "json",
  md: "markdown",
  css: "css",
  scss: "scss",
  less: "less",
  html: "html",
  xml: "xml",
  yaml: "yaml",
  yml: "yaml",
  py: "python",
  rb: "ruby",
  php: "php",
  java: "java",
  cpp: "cpp",
  c: "c",
  cs: "csharp",
  go: "go",
  rs: "rust",
  swift: "swift",
  kt: "kotlin",
  sql: "sql",
  sh: "shell",
  bash: "shell",
  dockerfile: "dockerfile",
  vue: "vue",
  svelte: "svelte",
  graphql: "graphql",
  env: "plaintext",
};

interface FileStructure {
  name: string;
  type: "file" | "folder";
  children?: FileStructure[];
  language?: string;
  value?: string;
  path: string;
}

interface CodeEditorProps {
  className?: string;
  currentActionData?: ActionStep;
  workspaceInfo?: string;
  activeFile?: string;
  setActiveFile?: (file: string) => void;
  filesContent?: { [filename: string]: string };
  isReplayMode?: boolean;
  activeTab?: TAB;
}

const CodeEditor = ({
  className,
  currentActionData,
  workspaceInfo,
  activeFile,
  setActiveFile,
  filesContent,
  isReplayMode,
  activeTab,
}: CodeEditorProps) => {
  const [activeLanguage, setActiveLanguage] = useState<string>("plaintext");
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );
  const [fileStructure, setFileStructure] = useState<FileStructure[]>([]);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const [fileContent, setFileContent] = useState<string>("");

  const getFileLanguage = (fileName: string): string => {
    const extension = fileName.split(".").pop()?.toLowerCase() || "";
    // Handle special case for files like "Dockerfile"
    if (fileName.toLowerCase() === "dockerfile") {
      return languageMap["dockerfile"];
    }
    return languageMap[extension] || "plaintext";
  };

  const loadDirectory = async (path: string) => {
    try {
      const response = await fetch("/api/files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path }),
      });

      if (!response.ok) {
        throw new Error("Failed to load directory");
      }

      const data = await response.json();
      setFileStructure(data.files);
      setExpandedFolders(new Set([path]));
    } catch (error) {
      console.error("Error loading directory:", error);
    }
  };

  const loadFileContent = async (filePath: string) => {
    try {
      const response = await fetch("/api/files/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: filePath }),
      });

      if (!response.ok) {
        throw new Error("Failed to load file content");
      }

      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error("Error loading file:", error);
      return "";
    }
  };

  useEffect(() => {
    if (workspaceInfo && activeTab === TAB.CODE) {
      loadDirectory(workspaceInfo);
    }
  }, [currentActionData, workspaceInfo, activeTab]);

  const toggleFolder = (folderPath: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderPath)) {
        next.delete(folderPath);
      } else {
        next.add(folderPath);
      }
      return next;
    });
  };

  const renderBreadcrumb = () => {
    if (!activeFile || !workspaceInfo) return null;

    const relativePath = activeFile.replace(workspaceInfo, "");
    const parts = relativePath.split("/").filter(Boolean);
    const fileName = parts[parts.length - 1];
    const folderName = ROOT_NAME;

    return (
      <div className="flex gap-2 items-center px-2 py-1 text-sm text-purple-800 bg-purple-100 border-b border-purple-200">
        <span className="text-purple-800">{folderName}</span>
        <ChevronRightIcon className="w-4 h-4" />
        <span className="text-purple-900">{fileName}</span>
      </div>
    );
  };

  useEffect(() => {
    (async () => {
      if (activeFile && workspaceInfo) {
        const filePath = activeFile.startsWith(workspaceInfo)
          ? activeFile
          : `${workspaceInfo}/${activeFile}`;
        // If we are in replay mode, use the file content from the filesContent prop
        if (isReplayMode) {
          const content = filesContent?.[filePath] || "";
          setActiveLanguage(getFileLanguage(filePath));
          setFileContent(content);
          return;
        }

        setActiveLanguage(getFileLanguage(filePath));
        const content = await loadFileContent(filePath);
        setFileContent(content);
      }
    })();
  }, [
    activeFile,
    workspaceInfo,
    filesContent,
    currentActionData,
    isReplayMode,
  ]);

  const renderFileTree = (items: FileStructure[]) => {
    // Sort items: folders first, then files, both in alphabetical order
    const sortedItems = [...items].sort((a, b) => {
      if (a.type === b.type) {
        // If both are folders or both are files, sort alphabetically
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      }
      // Folders come before files
      return a.type === "folder" ? -1 : 1;
    });

    return sortedItems.map((item) => {
      const fullPath = item.path;

      if (item.type === "folder") {
        const isExpanded = expandedFolders.has(fullPath);
        return (
          <div key={fullPath}>
            <button
              className="flex gap-2 items-center px-2 py-1 w-full text-sm text-left text-purple-800 hover:bg-purple-200"
              onClick={() => toggleFolder(fullPath)}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <Folder className="w-4 h-4" />
              {item.name}
            </button>
            {isExpanded && item.children && (
              <div className="ml-4">{renderFileTree(item.children)}</div>
            )}
          </div>
        );
      }

      return (
        <button
          key={fullPath}
          className={`flex items-center gap-2 w-full px-2 py-1 hover:bg-purple-200 text-left text-sm ${
            activeFile === fullPath
              ? "bg-purple-200 text-purple-800"
              : "text-purple-700"
          }`}
          onClick={() => {
            setActiveFile?.(fullPath);
          }}
        >
          <File className="w-4 h-4" />
          {item.name}
        </button>
      );
    });
  };

  return (
    <div
      className={`flex overflow-hidden flex-col bg-white rounded-xl border border-purple-300 shadow-md h-[calc(100vh-178px)] ${className}`}
    >
      <div className="flex flex-1 h-full">
        {/* File Explorer */}
        <div className="flex flex-col w-48 bg-purple-100 border-r border-purple-200">
          <div className="px-3 py-1 text-sm font-medium text-purple-800 border-b border-purple-200">
            {ROOT_NAME}
          </div>
          <div className="overflow-y-auto flex-1">
            {renderFileTree(fileStructure)}
          </div>
        </div>

        {/* Editor Section */}
        <div className="flex overflow-y-auto flex-col flex-1">
          {renderBreadcrumb()}
          <Editor
            theme="vs-light"
            language={activeLanguage}
            height="100%"
            value={fileContent}
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              readOnly: false,
            }}
            beforeMount={(monaco) => {
              monacoRef.current = monaco;
            }}
            onMount={(editor) => {
              editorRef.current = editor;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
