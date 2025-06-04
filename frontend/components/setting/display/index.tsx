'use client'

import { useState } from 'react'
import { RiSunLine, RiMoonLine, RiCheckLine } from '@remixicon/react'

export default function DisplaySetting() {
  const [theme, setTheme] = useState('light')

  const themes = [
    {
      id: 'light',
      name: '浅色主题',
      description: '明亮清爽的界面设计，适合白天使用',
      icon: <RiSunLine size={24} className="text-yellow-500" />,
      preview: {
        bg: 'bg-white',
        border: 'border-gray-200',
        text: 'text-gray-900',
        secondary: 'text-gray-600'
      }
    },
    {
      id: 'dark',
      name: '深色主题',
      description: '深邃优雅的界面设计，适合夜间使用',
      icon: <RiMoonLine size={24} className="text-blue-400" />,
      preview: {
        bg: 'bg-gray-900',
        border: 'border-gray-700',
        text: 'text-white',
        secondary: 'text-gray-300'
      }
    }
  ]

  return (
    <div className="px-6 pb-6">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">显示设置</h3>
        <p className="text-gray-600 text-sm">选择您偏好的界面主题</p>
      </div>

      <div className="space-y-6">
        {/* 主题选择 */}
        <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-5">
          <h4 className="font-semibold text-gray-900 mb-5">界面主题</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {themes.map((themeOption) => {
              const isSelected = theme === themeOption.id
              return (
                <div
                  key={themeOption.id}
                  onClick={() => setTheme(themeOption.id)}
                  className={`relative cursor-pointer rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-purple-300 ring-4 ring-purple-100'
                      : 'border-gray-200 hover:border-purple-200 hover:shadow-md'
                  }`}
                >
                  {/* 预览区域 */}
                  <div className={`p-4 rounded-t-xl ${themeOption.preview.bg} ${themeOption.preview.border} border-b`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-8 h-8 rounded-full ${themeOption.preview.bg === 'bg-white' ? 'bg-purple-100' : 'bg-purple-800'} flex items-center justify-center`}>
                        <span className={`text-xs font-semibold ${themeOption.preview.bg === 'bg-white' ? 'text-purple-600' : 'text-purple-200'}`}>
                          A
                        </span>
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${themeOption.preview.text}`}>
                          示例标题
                        </div>
                        <div className={`text-xs ${themeOption.preview.secondary}`}>
                          这是一段示例文本
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className={`h-2 rounded-full ${themeOption.preview.bg === 'bg-white' ? 'bg-gray-200' : 'bg-gray-700'}`}>
                        <div className="h-2 rounded-full bg-purple-500 w-3/4"></div>
                      </div>
                      <div className={`h-2 rounded-full ${themeOption.preview.bg === 'bg-white' ? 'bg-gray-200' : 'bg-gray-700'}`}>
                        <div className="h-2 rounded-full bg-purple-500 w-1/2"></div>
                      </div>
                    </div>
                  </div>

                  {/* 信息区域 */}
                  <div className="p-4 bg-white rounded-b-xl">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {themeOption.icon}
                        <div>
                          <h5 className={`font-semibold ${isSelected ? 'text-purple-900' : 'text-gray-900'}`}>
                            {themeOption.name}
                          </h5>
                          <p className={`text-sm mt-1 ${isSelected ? 'text-purple-700' : 'text-gray-600'}`}>
                            {themeOption.description}
                          </p>
                        </div>
                      </div>
                      
                      {isSelected && (
                        <div className="flex items-center justify-center w-6 h-6 bg-purple-600 rounded-full">
                          <RiCheckLine size={14} className="text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 选中状态标签 */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2">
                      <span className="px-3 py-1 text-xs font-medium text-white bg-purple-600 rounded-full shadow-lg">
                        当前主题
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* 当前设置显示 */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100/60 border border-purple-200/60 rounded-xl p-5">
          <h4 className="font-semibold text-purple-900 mb-3">当前设置</h4>
          <div className="flex items-center space-x-3">
            {themes.find(t => t.id === theme)?.icon}
            <div>
              <div className="font-medium text-purple-900">
                {themes.find(t => t.id === theme)?.name}
              </div>
              <div className="text-sm text-purple-700">
                {themes.find(t => t.id === theme)?.description}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            className="px-6 py-2.5 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            style={{ color: 'white' }}
          >
            保存更改
          </button>
        </div>
      </div>
    </div>
  )
}
