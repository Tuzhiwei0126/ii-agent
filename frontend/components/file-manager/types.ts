// 文件/文件夹数据结构
export interface FileItem {
  id: string
  name: string
  type: 'folder' | 'file'
  size?: number
  createdAt: string
  updatedAt: string
  parentId?: string
  fileType?: string // pdf, doc, xlsx, png, jpg, etc.
  isPrivate?: boolean // 是否为私有文件
}

// 路径项
export interface BreadcrumbItem {
  id: string
  name: string
}

// FileManager组件属性
export interface FileManagerProps {
  folderId?: string
  onFileClick?: (file: FileItem) => void
  onFolderClick?: (folder: FileItem) => void
  onFileUpload?: (files: FileList) => void
  className?: string
} 