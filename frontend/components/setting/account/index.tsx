'use client'

import { useState } from 'react'
import { 
  RiBellLine, 
  RiLogoutCircleRLine,
  RiEyeLine,
  RiEyeOffLine
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
    <div className="px-6 pb-6">
      <div className="mb-8">
        <h3 className="mb-2 text-xl font-semibold text-gray-900">账号设置</h3>
        <p className="text-sm text-gray-600">管理您的账号信息和安全设置</p>
      </div>

      <div className="space-y-6">
        {/* 用户信息卡片 */}
        <div className="p-6 bg-gradient-to-r from-purple-50 rounded-xl border to-purple-100/60 border-purple-200/60">
          <div className="flex justify-between items-start">
            {/* 左侧：头像和用户信息 */}
            <div className="flex items-start space-x-4">
              {/* 头像 */}
              <div className="flex justify-center items-center w-16 h-16 text-xl font-semibold text-white bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-lg">
                张
              </div>

              {/* 用户信息 */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-lg font-semibold text-purple-900">张小明</h4>
                    {/* 通知铃铛 */}
                    <button className="flex justify-center items-center w-6 h-6 bg-orange-500 rounded-full shadow-lg transition-colors hover:bg-orange-600">
                      <RiBellLine size={12} className="text-white" />
                    </button>
                  </div>
                  <p className="text-sm text-purple-700">zhangxiaoming@example.com</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/80 rounded-lg px-3 py-1.5 border border-purple-200/40">
                      <span className="text-xs font-medium text-purple-600">积分</span>
                      <span className="ml-2 text-sm font-semibold text-purple-800">1,250</span>
                    </div>
                    <div className="bg-white/80 rounded-lg px-3 py-1.5 border border-purple-200/40">
                      <span className="text-xs font-medium text-purple-600">知识库空间</span>
                      <span className="ml-2 text-sm font-semibold text-purple-800">2.5GB/10GB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：登出按钮 */}
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 space-x-2 text-purple-700 rounded-lg border transition-all duration-200 bg-white/80 border-purple-200/60 hover:bg-white hover:border-purple-300 hover:text-purple-800"
            >
              <RiLogoutCircleRLine size={16} />
              <span className="text-sm font-medium">登出</span>
            </button>
          </div>
        </div>

        {/* 修改密码 */}
        <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/60">
          <h4 className="mb-5 font-semibold text-gray-900">修改密码</h4>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                当前密码
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-colors"
                  placeholder="请输入当前密码"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 text-gray-400 transform -translate-y-1/2 hover:text-gray-600"
                >
                  {showCurrentPassword ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                新密码
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-colors"
                  placeholder="请输入新密码"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 text-gray-400 transform -translate-y-1/2 hover:text-gray-600"
                >
                  {showNewPassword ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">密码长度至少8位，包含字母和数字</p>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                确认新密码
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-colors"
                  placeholder="请再次输入新密码"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 text-gray-400 transform -translate-y-1/2 hover:text-gray-600"
                >
                  {showConfirmPassword ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                更新密码
              </button>
            </div>
          </form>
        </div>

        {/* 账户统计 */}
        <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/60">
          <h4 className="mb-5 font-semibold text-gray-900">账户统计</h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="p-4 bg-white rounded-lg border border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">156</div>
                <div className="mt-1 text-sm text-gray-600">今日对话</div>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">2,847</div>
                <div className="mt-1 text-sm text-gray-600">总对话次数</div>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">45</div>
                <div className="mt-1 text-sm text-gray-600">创建文档</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
