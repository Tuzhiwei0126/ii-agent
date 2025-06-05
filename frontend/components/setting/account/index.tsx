'use client'

import { useState } from 'react'
import { 
  RiBellLine, 
  RiLogoutCircleRLine,
  RiEyeLine,
  RiEyeOffLine,
  RiLockLine,
  RiBarChartBoxLine
} from '@remixicon/react'

export default function AccountSetting() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleLogout = () => {
    // 处理登出逻辑
    console.log('User logged out')
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    // 处理密码修改逻辑
    console.log('Password change submitted')
  }

  return (
    <div className="p-8 space-y-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">账号设置</h3>
        <p className="text-gray-600">管理您的账号信息和安全设置</p>
      </div>

      <div className="space-y-8">
        {/* 用户信息卡片 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-2xl p-8 shadow-xl">
          {/* 背景装饰 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative flex items-start justify-between">
            {/* 左侧：头像和用户信息 */}
            <div className="flex items-start space-x-6">
              {/* 头像 */}
              <div className="relative">
                <div className="flex items-center justify-center w-20 h-20 text-2xl font-bold text-white bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30">
                  张
                </div>
                {/* 在线状态指示器 */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white shadow-lg"></div>
              </div>

              {/* 用户信息 */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-2xl font-bold text-white">张小明</h4>
                    {/* 通知铃铛 */}
                    <button className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-lg shadow-lg transition-all duration-200 hover:bg-orange-600 hover:scale-105 active:scale-95">
                      <RiBellLine size={14} className="text-white" />
                    </button>
                  </div>
                  <p className="text-purple-100 text-lg">zhangxiaoming@example.com</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                    <div className="text-white/80 text-sm font-medium">积分余额</div>
                    <div className="text-white text-xl font-bold">1,250</div>
                  </div>
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                    <div className="text-white/80 text-sm font-medium">存储空间</div>
                    <div className="text-white text-xl font-bold">2.5GB</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：登出按钮 */}
            <button
              onClick={handleLogout}
              className="flex items-center px-6 py-3 space-x-2 text-purple-700 bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 transition-all duration-200 hover:bg-white hover:scale-105 active:scale-95 shadow-lg"
            >
              <RiLogoutCircleRLine size={18} />
              <span className="font-medium">登出</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 修改密码 */}
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-xl">
                <RiLockLine size={20} className="text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">修改密码</h4>
                <p className="text-sm text-gray-600">定期更新您的账户密码</p>
              </div>
            </div>
            
            <form onSubmit={handlePasswordChange} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  当前密码
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-200"
                    placeholder="请输入当前密码"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showCurrentPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  新密码
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-200"
                    placeholder="请输入新密码"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showNewPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">密码长度至少8位，包含字母和数字</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  确认新密码
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-200"
                    placeholder="请再次输入新密码"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                更新密码
              </button>
            </form>
          </div>

          {/* 账户统计 */}
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-xl">
                <RiBarChartBoxLine size={20} className="text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">账户统计</h4>
                <p className="text-sm text-gray-600">查看您的使用情况</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100/60 rounded-xl p-4 border border-purple-200/40">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-purple-700">156</div>
                    <div className="text-sm text-purple-600 font-medium">今日对话</div>
                  </div>
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-blue-100/60 rounded-xl p-4 border border-blue-200/40">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-700">2,847</div>
                    <div className="text-sm text-blue-600 font-medium">总对话次数</div>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100/60 rounded-xl p-4 border border-green-200/40">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-green-700">45</div>
                    <div className="text-sm text-green-600 font-medium">创建文档</div>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
