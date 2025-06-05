'use client'

import { useState } from 'react'
import { RiArrowDownSLine, RiCheckLine, RiGlobalLine } from '@remixicon/react'

export default function LanguageSetting() {
  const [selectedLanguage, setSelectedLanguage] = useState('zh-CN')
  const [showDropdown, setShowDropdown] = useState(false)

  const languages = [
    { 
      code: 'zh-CN', 
      name: '简体中文', 
      nativeName: '简体中文',
      flag: '🇨🇳'
    },
    { 
      code: 'zh-TW', 
      name: '繁體中文', 
      nativeName: '繁體中文',
      flag: '🇹🇼'
    },
    { 
      code: 'en-US', 
      name: 'English', 
      nativeName: 'English',
      flag: '🇺🇸'
    },
    { 
      code: 'ja-JP', 
      name: 'Japanese', 
      nativeName: '日本語',
      flag: '🇯🇵'
    },
    { 
      code: 'ko-KR', 
      name: 'Korean', 
      nativeName: '한국어',
      flag: '🇰🇷'
    },
    { 
      code: 'fr-FR', 
      name: 'French', 
      nativeName: 'Français',
      flag: '🇫🇷'
    },
    { 
      code: 'de-DE', 
      name: 'German', 
      nativeName: 'Deutsch',
      flag: '🇩🇪'
    },
    { 
      code: 'es-ES', 
      name: 'Spanish', 
      nativeName: 'Español',
      flag: '🇪🇸'
    },
  ]

  const selectedLang = languages.find(lang => lang.code === selectedLanguage)

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code)
    setShowDropdown(false)
  }

  return (
    <div className="p-8 space-y-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">语言设置</h3>
        <p className="text-gray-600">选择您偏好的界面语言</p>
      </div>

      <div className="space-y-8">
        {/* 当前语言状态 */}
        <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-2xl p-8 shadow-xl relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
                <RiGlobalLine size={24} className="text-white" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">当前语言</h4>
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{selectedLang?.flag}</span>
                  <div>
                    <div className="text-xl font-semibold text-white">{selectedLang?.nativeName}</div>
                    <div className="text-purple-100">{selectedLang?.name}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 语言选择器 */}
        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-8 hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-xl">
              <RiGlobalLine size={20} className="text-purple-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">选择语言</h4>
              <p className="text-sm text-gray-600">点击选择您偏好的界面语言</p>
            </div>
          </div>
          
          {/* 语言选择下拉框 */}
          <div className="relative mb-8">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center justify-between w-full px-6 py-4 bg-gray-50 rounded-xl border-2 border-gray-200 transition-all duration-200 hover:border-purple-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{selectedLang?.flag}</span>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{selectedLang?.nativeName}</div>
                  <div className="text-sm text-gray-600">{selectedLang?.name}</div>
                </div>
              </div>
              <RiArrowDownSLine 
                size={24} 
                className={`text-gray-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} 
              />
            </button>

            {showDropdown && (
              <div className="absolute z-10 mt-2 w-full max-h-80 overflow-y-auto bg-white rounded-xl border-2 border-gray-200 shadow-xl animate-in fade-in duration-200">
                {languages.map((language, index) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language.code)}
                    className="flex items-center justify-between w-full px-6 py-4 text-left transition-all duration-200 hover:bg-purple-50 first:rounded-t-xl last:rounded-b-xl group"
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl transition-transform duration-200 group-hover:scale-110">{language.flag}</span>
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                          {language.nativeName}
                        </div>
                        <div className="text-sm text-gray-600 group-hover:text-purple-600 transition-colors">
                          {language.name}
                        </div>
                      </div>
                    </div>
                    {selectedLanguage === language.code && (
                      <div className="flex items-center justify-center w-6 h-6 bg-purple-500 rounded-full">
                        <RiCheckLine size={14} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 快速语言切换 */}
          <div>
            <h5 className="font-semibold text-gray-900 mb-4">快速切换</h5>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {languages.slice(0, 8).map((language) => {
                const isSelected = selectedLanguage === language.code
                return (
                  <button
                    key={language.code}
                    onClick={() => setSelectedLanguage(language.code)}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                      isSelected
                        ? 'bg-purple-50 border-purple-300 ring-2 ring-purple-100'
                        : 'bg-gray-50 border-gray-200 hover:border-purple-200 hover:bg-purple-25'
                    }`}
                  >
                    <span className="text-2xl mb-2">{language.flag}</span>
                    <span className={`text-xs font-medium text-center ${
                      isSelected ? 'text-purple-700' : 'text-gray-600'
                    }`}>
                      {language.code.split('-')[0].toUpperCase()}
                    </span>
                  </button>
                )
              })}
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
