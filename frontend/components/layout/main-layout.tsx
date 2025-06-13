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
        <MenuList />
        <FloatMenu />

        {/* 主内容区域 */}
        <main className="flex-1 bg-white">
          <div className="h-[calc(100%-2rem)] mx-4 my-4 rounded-2xl bg-white p-6
            shadow-[inset_0_0_10px_rgba(225,218,255,0.5),inset_0_4px_12px_rgba(225,218,255,0.3)]">
            {children}
          </div>
        </main>
      </div>
    </AppProvider>
  )
}

export default MainLayout 