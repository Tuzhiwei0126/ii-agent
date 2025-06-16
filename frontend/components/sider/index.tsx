'use client'

import { useState } from 'react'
import { User, MessageSquare, Book, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
// 导入路由相关组件
import { usePathname, useRouter } from 'next/navigation'

interface NavItem {
  id: number
  name: string
  icon: React.ReactNode
  path: string
  hasDot?: boolean
}

const navItems: NavItem[] = [
  { id: 1, name: '角色库', icon: <User size={18} />, path: '/roles' },
  { id: 2, name: '聊天', icon: <MessageSquare size={18} />, path: '/' },
  { id: 3, name: '知识库', icon: <Book size={18} />, path: '/datasets'},
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  // 渲染菜单项
  const renderMenuItem = (item: NavItem) => {
    const isActive = pathname === item.path
      || (pathname?.startsWith(`${item.path}/`)
       // 对于特定路径的匹配规则
       && !(item.path === '/datasets' && pathname?.startsWith('/datasets/installed/')))

    return (
      <div
        key={item.id}
        className={`mb-custom-8 flex cursor-pointer items-center rounded-lg px-3 py-2 border-none transition-all duration-200 ${
          isActive 
            ? 'text-purple-700 bg-purple-100' 
            : 'hover:bg-gray-100'
        }`}
        style={{ color: isActive ? undefined : '#666666' }}
        onClick={() => {
          router.push(item.path)
        }}
      >
        <div className={`${collapsed ? 'mx-auto' : 'mr-2'} h-5 w-5 shrink-0`}>
          {item.icon}
        </div>
        {!collapsed && (
          <div className="flex justify-between items-center w-full">
            <div 
              className="ml-2 truncate"
              style={{ 
                fontSize: '16px', 
                lineHeight: '22px',
                color: isActive ? undefined : '#666666',
                fontWeight: isActive ? '500' : 'normal'
              }}
            >
              {item.name}
            </div>
            <div className="flex gap-2 items-center">
              {/* 激活状态指示器 */}
              {isActive && (
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={`${
        collapsed ? 'w-18' : 'w-50'
      } h-screen bg-white  border-gray-200 flex flex-col transition-all duration-300 px-3 py-6`}
    >
      {/* Logo + Toggle */}
      <div className="flex justify-between items-center px-1 my-6">
        <div className="flex gap-2 justify-center items-center mx-auto">
        {!collapsed ? <Image src="/logo_副本2.png" alt="GoAgent" width={200} height={200} /> :''}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav Items */}
      <div className="flex flex-col gap-4 pt-4">
        {navItems.map(renderMenuItem)}
      </div>
    </div>
  )
}
