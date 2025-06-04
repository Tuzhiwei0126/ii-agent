'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

// 导入 Remix Icons - 这里假设你已经安装了 @remixicon/react
// 如果没有安装，请运行: npm install @remixicon/react
import {
  RiUserLine,
  RiVipCrownLine,
  RiGlobalLine,
  RiPlayLine,
  RiFeedbackLine,
  RiInformationLine
} from '@remixicon/react'

// 导入设置页面组件
import AccountSetting from './account'
import PackageSetting from './package'
import LanguageSetting from './language'
import DisplaySetting from './display'
import FeedbackSetting from './feedback'
import AboutSetting from './about'

interface SettingItem {
  id: string
  name: string
  icon: React.ReactNode
  component: React.ComponentType
}

const settingItems: SettingItem[] = [
  { id: 'account', name: '账号', icon: <RiUserLine size={16} />, component: AccountSetting },
  { id: 'package', name: '套餐', icon: <RiVipCrownLine size={16} />, component: PackageSetting },
  { id: 'language', name: '语言', icon: <RiGlobalLine size={16} />, component: LanguageSetting },
  { id: 'display', name: '显示', icon: <RiPlayLine size={16} />, component: DisplaySetting },
  { id: 'feedback', name: '反馈', icon: <RiFeedbackLine size={16} />, component: FeedbackSetting },
  { id: 'about', name: '关于', icon: <RiInformationLine size={16} />, component: AboutSetting },
]

interface SettingModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: string
}

export default function SettingModal({ isOpen, onClose, defaultTab = 'account' }: SettingModalProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  if (!isOpen) return null

  const ActiveComponent = settingItems.find(item => item.id === activeTab)?.component || AccountSetting

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-opacity-30 backdrop-blur-sm">
      <div className="w-full max-w-5xl h-[70vh] bg-white rounded-xl shadow-2xl flex overflow-hidden">
        {/* 左侧菜单 */}
        <div className="flex flex-col w-48 bg-gray-50/80">
          {/* 头部 */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-semibold text-gray-800">设置</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-lg transition-colors hover:bg-gray-200/60"
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* 菜单列表 */}
          <div className="flex-1 p-2">
            <ul className="space-y-1">
              {settingItems.map((item) => {
                const isActive = activeTab === item.id
                return (
                  <li key={item.id}>
                    <button
                      className={`w-full flex min-h-12 items-center px-3 py-2 text-left rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'text-purple-700 bg-purple-50'
                          : 'text-gray-600 hover:bg-gray-100/60 hover:text-gray-800'
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <div className={`mr-6 text-lg ${isActive ? 'text-purple-600' : 'text-gray-400'}`}>
                        {item.icon}
                      </div>
                      <span className={`text-base font-medium ${isActive ? 'text-purple-700' : ''}`}>
                        {item.name}
                      </span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* 右侧内容区域 */}
        <div className="flex flex-col flex-1 bg-gray-50/30">
          <div className="overflow-y-auto flex-1 p-6">
            <div 
              className="pt-6 h-full bg-white rounded-lg"
              style={{
                boxShadow: 'inset 0 0 0 1px rgba(147, 51, 234, 0.1), inset 0 2px 8px rgba(147, 51, 234, 0.06)'
              }}
            >
              <ActiveComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
