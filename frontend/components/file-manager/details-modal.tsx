'use client'

import React from 'react'
import { File, X } from 'lucide-react'
import Image from 'next/image'
import { FileItem, BreadcrumbItem } from './types'

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

// 详情Modal组件
const DetailsModal: React.FC<{
  isOpen: boolean
  onClose: () => void
  item: FileItem | null
  currentPath: BreadcrumbItem[]
}> = ({ isOpen, onClose, item, currentPath }) => {
  if (!isOpen || !item) return null

  const getFileIcon = (item: FileItem) => {
    const iconSize = 80
    const iconClass = "mx-auto"
    
    if (item.type === 'folder') {
      return <Image src="/assets/baseIcon.png" alt="Folder" width={iconSize} height={iconSize} className={iconClass} />
    }
    
    switch (item.fileType) {
      case 'pdf':
        return <Image src="/assets/pdficon.png" alt="PDF" width={iconSize} height={iconSize} className={iconClass} />
      case 'doc':
      case 'docx':
        return <Image src="/assets/docicon.png" alt="DOC" width={iconSize} height={iconSize} className={iconClass} />
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return <File className={`w-20 h-20 text-green-500 ${iconClass}`} />
      case 'xlsx':
      case 'xls':
        return <File className={`w-20 h-20 text-green-600 ${iconClass}`} />
      default:
        return <Image src="/assets/baseIcon.png" alt="File" width={iconSize} height={iconSize} className={iconClass} />
    }
  }

  const getFilePath = () => {
    const pathNames = currentPath.map(p => p.name).join(' / ')
    return pathNames
  }

  const getFileTypeText = () => {
    if (item.type === 'folder') {
      return '文件夹'
    }
    if (item.fileType) {
      return item.fileType.toUpperCase() + ' 文件'
    }
    return '文件'
  }

  return (
    <>
      {/* 遮罩层 */}
      <div className="flex fixed inset-0 z-50 justify-center items-center bg-opacity-50" onClick={onClose}>
        {/* Modal内容 */}
        <div 
          className="p-8 mx-4 w-full max-w-md bg-white rounded-xl shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 头部 */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">详细信息</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* 文件图标和名称 */}
          <div className="mb-8 text-center">
            <div className="mb-4">
              {getFileIcon(item)}
            </div>
            <h3 className="text-lg font-medium text-gray-900 break-words">
              {item.name}
            </h3>
          </div>

          {/* 详细信息 */}
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">类型</span>
              <span className="text-sm text-gray-900">{getFileTypeText()}</span>
            </div>

            {item.type === 'file' && item.size && (
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">大小</span>
                <span className="text-sm text-gray-900">{formatFileSize(item.size)}</span>
              </div>
            )}

            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">位置</span>
              <span className="flex-1 ml-4 text-sm text-right text-gray-900 break-words">
                {getFilePath()}
              </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">访问权限</span>
              <span className="text-sm text-gray-900">
                {item.isPrivate ? '私有文件' : '公共文件'}
              </span>
            </div>

            <div className="flex justify-between items-center py-3">
              <span className="text-sm font-medium text-gray-600">创建时间</span>
              <span className="text-sm text-gray-900">{item.createdAt}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-sm font-medium text-gray-600">上传者</span>
              <span className="text-sm text-gray-900">{item?.uploaderName}</span>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default DetailsModal 