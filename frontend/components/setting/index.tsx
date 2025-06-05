'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

// 导入 Remix Icons - 这里假设你已经安装了 @remixicon/react
// 如果没有安装，请运行: npm install @remixicon/react
import {
  RiUserLine,
  RiVipCrownLine,
  RiGlobalLine,
  RiPaletteLine,
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
  description: string
}

const settingItems: SettingItem[] = [
  { 
    id: 'account', 
    name: '账号', 
    icon: <RiUserLine size={18} />, 
    component: AccountSetting,
    description: '账号信息与安全'
  },
  { 
    id: 'package', 
    name: '套餐', 
    icon: <RiVipCrownLine size={18} />, 
    component: PackageSetting,
    description: '订阅与计费'
  },
  { 
    id: 'language', 
    name: '语言', 
    icon: <RiGlobalLine size={18} />, 
    component: LanguageSetting,
    description: '界面语言设置'
  },
  { 
    id: 'display', 
    name: '显示', 
    icon: <RiPaletteLine size={18} />, 
    component: DisplaySetting,
    description: '主题与界面'
  },
  { 
    id: 'feedback', 
    name: '反馈', 
    icon: <RiFeedbackLine size={18} />, 
    component: FeedbackSetting,
    description: '意见与建议'
  },
  { 
    id: 'about', 
    name: '关于', 
    icon: <RiInformationLine size={18} />, 
    component: AboutSetting,
    description: '产品信息'
  },
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
  const activeItem = settingItems.find(item => item.id === activeTab)

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center backdrop-blur-sm bg-black/20">
      <div className="w-full max-w-7xl h-[85vh] bg-white rounded-2xl shadow-2xl flex overflow-hidden animate-in fade-in duration-300">
        {/* 左侧菜单 */}
        <div className="flex flex-col w-56 bg-gradient-to-b from-gray-50 border-r to-gray-100/50 border-gray-200/60">
          {/* 头部 */}
          <div className="p-6 border-b border-gray-200/60">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">设置</h2>
                <p className="mt-1 text-sm text-gray-500">{activeItem?.description}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-200/60 hover:scale-105 active:scale-95"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* 菜单列表 */}
          <div className="overflow-y-auto flex-1 p-4">
            <ul className="space-y-2">
              {settingItems.map((item, index) => {
                const isActive = activeTab === item.id
                return (
                  <li key={item.id}>
                    <button
                      className={`group w-full flex items-center px-4 py-3.5 text-left rounded-xl transition-all duration-200 transform hover:scale-[1.02] ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/20'
                          : 'text-gray-600 hover:bg-white/80 hover:text-gray-800 hover:shadow-sm'
                      }`}
                      onClick={() => setActiveTab(item.id)}
                      style={{
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      <div className={`mr-4 transition-all duration-200 ${
                        isActive ? 'text-white scale-110' : 'text-gray-400 group-hover:text-purple-500 group-hover:scale-105'
                      }`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <span className={`font-medium transition-all duration-200 ${
                          isActive ? 'text-white' : 'group-hover:text-gray-900'
                        }`}>
                          {item.name}
                        </span>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 bg-white rounded-full opacity-80 animate-pulse"></div>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* 底部装饰 */}
          <div className="p-4 border-t border-gray-200/60">
            <div className="text-center">
              <div className="mx-auto w-8 h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* 右侧内容区域 */}
        <div className="flex flex-col flex-1 bg-gray-50/30">
          <div className="overflow-y-auto flex-1">
            <div className="h-full backdrop-blur-sm bg-white/60">
              <ActiveComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
