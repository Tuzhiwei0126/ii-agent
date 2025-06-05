"use client"

import { FC, ReactNode } from 'react'
import MenuList from '../sider'
import FloatMenu from '../ui/floatButton'
import { AppProvider } from '@/context/app-context'


type MainLayoutProps = {
  children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {

  return (
    <AppProvider>
    <div className="flex h-screen bg-gray-50">
      <MenuList  />
      <FloatMenu />

      {/* 主内容区域 */}
      <div className="overflow-hidden flex-1 bg-white">
        <div className="mt-4 h-full mr-4 overflow-y-auto rounded-tl-2xl p-6
          shadow-[inset_0_0_10px_rgba(225,218,255,0.5),inset_0_4px_12px_rgba(225,218,255,0.3)]">
          {children}
        </div>
      </div>
    </div>
    </AppProvider>
  )
}

export default MainLayout 