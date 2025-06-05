"use client";
import MainLayout from '@/components/layout/main-layout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, FolderPlus } from 'lucide-react'
import Category from '../roles/category';
import FileManager, { FileItem } from '@/components/file-manager';
import { useState } from 'react';

export default function DatasetsPage() {
  const storageUsed = 65;
  const storageTotal = 100;
  const storagePercentage = (storageUsed / storageTotal) * 100;
  const [selectedCategory, setSelectedCategory] = useState('私有文件');
  const [currentFolderId, setCurrentFolderId] = useState('root');

  // 文件类型分类数据
  const fileCategories = ['私有文件', '公共文件'];

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // 切换分类时重置到根目录
    setCurrentFolderId('root');
  };

  const handleCreateFolder = () => {
    // 处理新建文件夹逻辑
    console.log('创建新文件夹');
  };

  const handleFileClick = (file: FileItem) => {
    console.log('打开文件:', file);
    // 这里可以添加文件预览或下载逻辑
  };

  const handleFolderClick = (folder: FileItem) => {
    console.log('进入文件夹:', folder);
    setCurrentFolderId(folder.id);
  };

  const handleFileUpload = (files: FileList) => {
    console.log('上传文件:', Array.from(files).map(f => f.name));
    // 这里可以添加文件上传逻辑
    // 例如：调用上传API，显示上传进度等
  };

  return (
    <MainLayout>
      <div className="h-full">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-6">
          {/* 左侧：标题和搜索框 */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">知识库</h1>
            
            {/* 搜索框 */}
            <div className="relative ml-6">
              <Search className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2" />
              <Input
                placeholder="搜索知识库..."
                className="pl-10 w-60 border border-gray-300 focus:border-purple-500 focus:ring-purple-500 focus:ring-1"
              />
            </div>
          </div>
          
          {/* 右侧：空间容量 */}
          <div className="flex gap-3 items-center">
            <span className="text-base font-normal" style={{ color: '#666666' }}>
              空间用量：
            </span>
            <div className="text-base font-normal" style={{ color: '#666666' }}>
              <span className="font-medium">{storageUsed}GB</span>
              <span style={{ color: '#666666' }}> / {storageTotal}GB</span>
            </div>
            
            {/* 进度条 */}
            <div className="overflow-hidden w-32 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-purple-500 transition-all duration-300"
                style={{ width: `${storagePercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* 文件类型切换和新建文件夹按钮 */}
        <div className="flex items-center justify-between mb-6">
          <Category 
            list={fileCategories} 
            value={selectedCategory} 
            onChange={handleCategoryChange} 
            allCategoriesEn=""
          />
          
          {/* 新建文件夹按钮 */}
          <Button 
            onClick={handleCreateFolder}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <FolderPlus className="w-4 h-4" />
            新建文件夹
          </Button>
        </div>
        
        {/* 文件管理器内容区域 */}
        <div className="flex-1">
          <FileManager
            folderId={currentFolderId}
            onFileClick={handleFileClick}
            onFolderClick={handleFolderClick}
            onFileUpload={handleFileUpload}
            className="h-full"
          />
        </div>
      </div>
    </MainLayout>
  )
} 