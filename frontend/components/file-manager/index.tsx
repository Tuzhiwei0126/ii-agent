'use client'

import React, { useState, useEffect } from 'react'
import { Folder, File, ChevronRight, Home, MoreVertical, Share, Info, Trash2, Plus, Upload } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { FileItem, BreadcrumbItem, FileManagerProps } from './types'
import DetailsModal from './details-modal'

// 下拉菜单组件
const DropdownMenu: React.FC<{
  isOpen: boolean
  onClose: () => void
  onShare: () => void
  onViewDetails: () => void
  onDelete: () => void
  position: { x: number; y: number }
}> = ({ isOpen, onClose, onShare, onViewDetails, onDelete, position }) => {
  if (!isOpen) return null

  return (
    <>
      {/* 遮罩层 */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      {/* 菜单 */}
      <div 
        className="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[140px]"
        style={{ 
          left: position.x, 
          top: position.y,
        }}
      >
        <button
          onClick={() => { onShare(); onClose(); }}
          className="flex gap-3 items-center px-4 py-3 w-full text-sm text-left hover:bg-gray-100"
        >
          <Share className="w-5 h-5" />
          分享
        </button>
        <button
          onClick={() => { onViewDetails(); onClose(); }}
          className="flex gap-3 items-center px-4 py-3 w-full text-sm text-left hover:bg-gray-100"
        >
          <Info className="w-5 h-5" />
          查看详情
        </button>
        <button
          onClick={() => { onDelete(); onClose(); }}
          className="flex gap-3 items-center px-4 py-3 w-full text-sm text-left text-red-600 hover:bg-gray-100"
        >
          <Trash2 className="w-5 h-5" />
          删除
        </button>
      </div>
    </>
  )
}

// 模拟API调用
const fetchFiles = async (folderId?: string): Promise<FileItem[]> => {
  // 这里应该是真实的API调用
  await new Promise(resolve => setTimeout(resolve, 300))
  
  if (!folderId || folderId === 'root') {
    return [
      {
        id: 'folder-1',
        name: '项目文档',
        type: 'folder',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15',
        isPrivate: false,
      },
      {
        id: 'folder-2', 
        name: '设计稿',
        type: 'folder',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-12',
        isPrivate: true,
      },
      {
        id: 'file-1',
        name: '需求文档.pdf',
        type: 'file',
        fileType: 'pdf',
        size: 2048576,
        createdAt: '2024-01-20',
        updatedAt: '2024-01-20',
        isPrivate: false,
      },
      {
        id: 'file-2',
        name: '产品规划.docx',
        type: 'file', 
        fileType: 'doc',
        size: 1024000,
        createdAt: '2024-01-18',
        updatedAt: '2024-01-19',
        isPrivate: true,
      },
      {
        id: 'file-3',
        name: '数据统计.xlsx',
        type: 'file',
        fileType: 'xlsx',
        size: 512000,
        createdAt: '2024-01-16',
        updatedAt: '2024-01-17',
        isPrivate: false,
      },
      {
        id: 'file-4',
        name: '界面截图.png',
        type: 'file',
        fileType: 'png', 
        size: 856000,
        createdAt: '2024-01-14',
        updatedAt: '2024-01-14',
        isPrivate: true,
      }
    ]
  }
  
  // 子文件夹的内容
  return [
    {
      id: 'file-sub-1',
      name: `子文件-${folderId}.pdf`,
      type: 'file',
      fileType: 'pdf',
      size: 1024000,
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
      parentId: folderId,
      isPrivate: false,
    }
  ]
}

// 获取文件类型图标
const getFileIcon = (fileType?: string) => {
  const iconSize = 64
  const iconClass = "mx-auto mb-3"
  
  switch (fileType) {
    case 'pdf':
      return <Image src="/assets/pdficon.png" alt="PDF" width={iconSize} height={iconSize} className={iconClass} />
    case 'doc':
    case 'docx':
      return <Image src="/assets/docicon.png" alt="DOC" width={iconSize} height={iconSize} className={iconClass} />
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
      return <File className={`w-16 h-16 text-green-500 ${iconClass}`} />
    case 'xlsx':
    case 'xls':
      return <File className={`w-16 h-16 text-green-600 ${iconClass}`} />
    default:
      return <Image src="/assets/baseIcon.png" alt="File" width={iconSize} height={iconSize} className={iconClass} />
  }
}

// 格式化文件大小
const formatFileSize = (bytes?: number): string => {
  if (!bytes) return ''
  
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  
  return `${size.toFixed(1)} ${units[unitIndex]}`
}

const FileManager: React.FC<FileManagerProps> = ({
  folderId = 'root',
  onFileClick,
  onFolderClick,
  onFileUpload,
  className
}) => {
  const [files, setFiles] = useState<FileItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [currentPath, setCurrentPath] = useState<BreadcrumbItem[]>([
    { id: 'root', name: '根目录' }
  ])
  const [dropdownState, setDropdownState] = useState<{
    isOpen: boolean
    itemId: string | null
    position: { x: number; y: number }
  }>({
    isOpen: false,
    itemId: null,
    position: { x: 0, y: 0 }
  })
  const [detailsModal, setDetailsModal] = useState<{
    isOpen: boolean
    item: FileItem | null
  }>({
    isOpen: false,
    item: null
  })

  useEffect(() => {
    loadFiles(folderId)
  }, [folderId])

  const loadFiles = async (id: string) => {
    setLoading(true)
    try {
      const data = await fetchFiles(id)
      setFiles(data)
      setSelectedItems(new Set()) // 清空选择
    } catch (error) {
      console.error('Failed to load files:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFolderClick = (folder: FileItem) => {
    // 更新路径
    setCurrentPath(prev => [...prev, { id: folder.id, name: folder.name }])
    onFolderClick?.(folder)
    loadFiles(folder.id)
  }

  const handleBreadcrumbClick = (item: BreadcrumbItem, index: number) => {
    // 截取到点击的路径项
    const newPath = currentPath.slice(0, index + 1)
    setCurrentPath(newPath)
    loadFiles(item.id)
  }

  const handleFileClick = (file: FileItem) => {
    onFileClick?.(file)
  }

  const handleItemClick = (item: FileItem, event: React.MouseEvent) => {
    // 阻止事件冒泡到卡片点击
    event.stopPropagation()
    
    if (item.type === 'folder') {
      handleFolderClick(item)
    } else {
      handleFileClick(item)
    }
  }

  const handleCheckboxChange = (itemId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    
    const newSelected = new Set(selectedItems)
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId)
    } else {
      newSelected.add(itemId)
    }
    setSelectedItems(newSelected)
  }

  const handleMenuClick = (event: React.MouseEvent, itemId: string) => {
    event.stopPropagation()
    
    const rect = event.currentTarget.getBoundingClientRect()
    setDropdownState({
      isOpen: true,
      itemId,
      position: {
        x: rect.left,
        y: rect.bottom + 4
      }
    })
  }

  const closeDropdown = () => {
    setDropdownState({
      isOpen: false,
      itemId: null,
      position: { x: 0, y: 0 }
    })
  }

  const handleShare = () => {
    console.log('分享文件:', dropdownState.itemId)
  }

  const handleViewDetails = () => {
    const item = files.find(f => f.id === dropdownState.itemId)
    if (item) {
      setDetailsModal({
        isOpen: true,
        item: item
      })
    }
  }

  const handleDelete = () => {
    console.log('删除文件:', dropdownState.itemId)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && onFileUpload) {
      onFileUpload(files)
    }
    // 重置input值，允许重复选择同一文件
    event.target.value = ''
  }

  const closeDetailsModal = () => {
    setDetailsModal({
      isOpen: false,
      item: null
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">加载中...</div>
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)}>
      {/* 路径导航 */}
      <div className="flex gap-3 items-center mb-8 text-base text-gray-600">
        <Home className="w-5 h-5" />
        {currentPath.map((item, index) => (
          <React.Fragment key={item.id}>
            <button
              onClick={() => handleBreadcrumbClick(item, index)}
              className="font-medium transition-colors hover:text-purple-600"
            >
              {item.name}
            </button>
            {index < currentPath.length - 1 && (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 文件网格 */}
      <div className="grid grid-cols-6 gap-6">
        {/* 添加文件卡片 */}
        <div className="relative cursor-pointer group">
          <div className="w-[180px] h-[215px] border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-purple-400 hover:bg-[#0000000F] transition-all bg-white flex flex-col items-center justify-center">
            {/* 添加图标 */}
            <div className="flex flex-col flex-1 gap-6 justify-center items-center">
              <div className="flex justify-center items-center w-16 h-16 bg-gray-100 rounded-full">
                <Plus className="w-8 h-8 text-gray-500" />
              </div>
              
              {/* 文件上传按钮 */}
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="*/*"
                />
                <div className="flex gap-3 items-center px-5 py-3 text-sm font-medium text-white bg-[#6B48FF] rounded-lg transition-colors hover:bg-purple-600">
                  <Upload className="w-5 h-5" />
                  本地文件
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* 现有文件列表 */}
        {files.map((item) => {
          const isSelected = selectedItems.has(item.id)
          return (
            <div
              key={item.id}
              className="relative cursor-pointer group"
              onClick={(e) => handleItemClick(item, e)}
            >
              <div 
                className={cn(
                  "w-[180px] h-[215px] rounded-xl p-5 transition-all bg-white flex flex-col relative",
                  isSelected ? "bg-[#0000000F]" : "hover:bg-[#0000000F]"
                )}
              >
                {/* 左上角选择框 */}
                <div className={cn(
                  "absolute top-3 left-3 z-10 transition-opacity",
                  isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => handleCheckboxChange(item.id, e)}
                    className="w-5 h-5 text-purple-600 bg-gray-100 rounded border-gray-300 focus:ring-purple-500 focus:ring-2"
                  />
                </div>

                {/* 右上角菜单 */}
                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={(e) => handleMenuClick(e, item.id)}
                    className="flex justify-center items-center w-8 h-8 rounded-full opacity-0 transition-opacity hover:bg-gray-200 group-hover:opacity-100"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                {/* 图标区域 */}
                <div className="flex flex-1 justify-center items-center">
                  {item.type === 'folder' ? (
                    <Image src="/assets/baseIcon.png" alt="Folder" width={64} height={64} className="mx-auto mb-3" />
                  ) : (
                    getFileIcon(item.fileType)
                  )}
                </div>
                
                {/* 文件信息 */}
                <div className="text-center">
                  <div 
                    className="mb-2 text-sm font-medium text-gray-900 truncate"
                    title={item.name}
                  >
                    {item.name}
                  </div>
                  <div className="space-y-1 text-xs text-gray-500">
                    {item.type === 'file' && (
                      <div>{formatFileSize(item.size)}</div>
                    )}
                    <div>{item.updatedAt}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 空状态 */}
      {files.length === 0 && (
        <div className="py-24 text-center text-gray-500">
          <Folder className="mx-auto mb-6 w-20 h-20 text-gray-300" />
          <div className="text-lg">该文件夹为空</div>
        </div>
      )}

      {/* 下拉菜单 */}
      <DropdownMenu
        isOpen={dropdownState.isOpen}
        onClose={closeDropdown}
        onShare={handleShare}
        onViewDetails={handleViewDetails}
        onDelete={handleDelete}
        position={dropdownState.position}
      />

      {/* 详情Modal */}
      <DetailsModal
        isOpen={detailsModal.isOpen}
        onClose={closeDetailsModal}
        item={detailsModal.item}
        currentPath={currentPath}
      />
    </div>
  )
}

export default FileManager 