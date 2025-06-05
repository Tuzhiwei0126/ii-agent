'use client'

import { useState } from 'react'
import { RiSunLine, RiMoonLine, RiCheckLine, RiPaletteLine } from '@remixicon/react'

export default function DisplaySetting() {
  const [theme, setTheme] = useState('light')

  const themes = [
    {
      id: 'light',
      name: '浅色主题',
      description: '明亮清爽的界面设计，适合白天使用',
      icon: <RiSunLine size={28} className="text-orange-500" />,
      preview: {
        bg: 'bg-white',
        cardBg: 'bg-gray-50',
        border: 'border-gray-200',
        text: 'text-gray-900',
        secondary: 'text-gray-600'
      }
    },
    {
      id: 'dark',
      name: '深色主题',
      description: '深邃优雅的界面设计，适合夜间使用',
      icon: <RiMoonLine size={28} className="text-blue-400" />,
      preview: {
        bg: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        border: 'border-gray-700',
        text: 'text-white',
        secondary: 'text-gray-300'
      }
    }
  ]

  return (
    <div className="p-8 space-y-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">显示设置</h3>
        <p className="text-gray-600">选择您偏好的界面主题和显示选项</p>
      </div>

      <div className="space-y-8">
        {/* 当前主题状态 */}
        <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-2xl p-8 shadow-xl relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
                <RiPaletteLine size={24} className="text-white" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">当前主题</h4>
                <div className="flex items-center space-x-3">
                  {themes.find(t => t.id === theme)?.icon}
                  <div>
                    <div className="text-xl font-semibold text-white">
                      {themes.find(t => t.id === theme)?.name}
                    </div>
                    <div className="text-purple-100">
                      {themes.find(t => t.id === theme)?.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 主题选择 */}
        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-8 hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-xl">
              <RiPaletteLine size={20} className="text-purple-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">界面主题</h4>
              <p className="text-sm text-gray-600">选择适合您的主题风格</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {themes.map((themeOption, index) => {
              const isSelected = theme === themeOption.id
              return (
                <div
                  key={themeOption.id}
                  onClick={() => setTheme(themeOption.id)}
                  className={`relative cursor-pointer rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                    isSelected
                      ? 'border-purple-300 ring-4 ring-purple-100 shadow-lg'
                      : 'border-gray-200 hover:border-purple-200 hover:shadow-md'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* 主题预览区域 */}
                  <div className={`p-6 rounded-t-2xl ${themeOption.preview.bg} ${themeOption.preview.border} border-b-2`}>
                    <div className="space-y-4">
                      {/* 头部栏 */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-xl ${themeOption.preview.cardBg} flex items-center justify-center`}>
                            <div className={`w-4 h-4 rounded-lg ${themeOption.id === 'light' ? 'bg-purple-500' : 'bg-purple-400'}`}></div>
                          </div>
                          <div>
                            <div className={`text-sm font-semibold ${themeOption.preview.text}`}>
                              示例应用
                            </div>
                            <div className={`text-xs ${themeOption.preview.secondary}`}>
                              界面预览
                            </div>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full ${themeOption.id === 'light' ? 'bg-green-400' : 'bg-green-500'}`}></div>
                      </div>
                      
                      {/* 内容区域 */}
                      <div className="space-y-3">
                        <div className={`h-3 rounded-full ${themeOption.preview.cardBg}`}>
                          <div className="h-3 rounded-full bg-purple-500 w-3/4"></div>
                        </div>
                        <div className={`h-3 rounded-full ${themeOption.preview.cardBg}`}>
                          <div className="h-3 rounded-full bg-purple-500 w-1/2"></div>
                        </div>
                        <div className={`h-3 rounded-full ${themeOption.preview.cardBg}`}>
                          <div className="h-3 rounded-full bg-purple-500 w-2/3"></div>
                        </div>
                      </div>

                      {/* 卡片示例 */}
                      <div className={`p-4 rounded-xl ${themeOption.preview.cardBg} ${themeOption.preview.border} border`}>
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg ${themeOption.id === 'light' ? 'bg-purple-100' : 'bg-purple-800'} flex items-center justify-center`}>
                            <div className={`w-4 h-4 rounded-full ${themeOption.id === 'light' ? 'bg-purple-500' : 'bg-purple-400'}`}></div>
                          </div>
                          <div className="flex-1">
                            <div className={`h-2 rounded-full ${themeOption.id === 'light' ? 'bg-gray-200' : 'bg-gray-700'} mb-2`}>
                              <div className="h-2 rounded-full bg-purple-500 w-2/3"></div>
                            </div>
                            <div className={`h-2 rounded-full ${themeOption.id === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}>
                              <div className="h-2 rounded-full bg-purple-500 w-1/3"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 主题信息区域 */}
                  <div className="p-6 bg-white rounded-b-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${isSelected ? 'bg-purple-100' : 'bg-gray-100'} transition-colors duration-200`}>
                          {themeOption.icon}
                        </div>
                        <div>
                          <h5 className={`font-bold text-lg ${isSelected ? 'text-purple-900' : 'text-gray-900'} transition-colors duration-200`}>
                            {themeOption.name}
                          </h5>
                          <p className={`text-sm mt-1 ${isSelected ? 'text-purple-700' : 'text-gray-600'} transition-colors duration-200`}>
                            {themeOption.description}
                          </p>
                        </div>
                      </div>
                      
                      {isSelected && (
                        <div className="flex items-center justify-center w-8 h-8 bg-purple-500 rounded-xl shadow-lg">
                          <RiCheckLine size={18} className="text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 选中状态标签 */}
                  {isSelected && (
                    <div className="absolute -top-3 -right-3">
                      <div className="flex items-center px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-lg">
                        <RiCheckLine size={12} className="mr-1" />
                        当前主题
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* 其他显示选项 */}
        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-8 hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-xl">
              <RiPaletteLine size={20} className="text-purple-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">其他选项</h4>
              <p className="text-sm text-gray-600">更多个性化设置</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <div className="font-medium text-gray-900">自动切换主题</div>
                <div className="text-sm text-gray-600">根据系统时间自动切换浅色/深色主题</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <div className="font-medium text-gray-900">紧凑模式</div>
                <div className="text-sm text-gray-600">减少界面元素间距，显示更多内容</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* 保存按钮 */}
        <div className="flex justify-end">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]">
            保存更改
          </button>
        </div>
      </div>
    </div>
  )
}
