'use client'

import { useState } from 'react'
import { RiArrowDownSLine, RiCheckLine } from '@remixicon/react'

export default function LanguageSetting() {
  const [selectedLanguage, setSelectedLanguage] = useState('zh-CN')
  const [showDropdown, setShowDropdown] = useState(false)
  const [displayMode, setDisplayMode] = useState<'dropdown' | 'buttons'>('dropdown')

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
    <div className="px-6 pb-6">
      <div className="mb-8">
        <h3 className="mb-2 text-xl font-semibold text-gray-900">语言设置</h3>
        <p className="text-sm text-gray-600">选择您偏好的界面语言</p>
      </div>

      <div className="space-y-6">
        {/* 显示模式切换 */}
        <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/60">
          <h4 className="mb-4 font-semibold text-gray-900">选择展示方式</h4>
          <div className="flex space-x-4">
            <button
              onClick={() => setDisplayMode('dropdown')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                displayMode === 'dropdown'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              下拉框模式
            </button>
            <button
              onClick={() => setDisplayMode('buttons')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                displayMode === 'buttons'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              按钮列表模式
            </button>
          </div>
        </div>

        {/* 语言选择区域 */}
        <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/60">
          <h4 className="mb-5 font-semibold text-gray-900">界面语言</h4>
          
          {displayMode === 'dropdown' ? (
            /* 下拉框模式 */
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex justify-between items-center px-4 py-3 w-full bg-white rounded-lg border border-gray-200 transition-colors hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{selectedLang?.flag}</span>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{selectedLang?.nativeName}</div>
                    <div className="text-sm text-gray-600">{selectedLang?.name}</div>
                  </div>
                </div>
                <RiArrowDownSLine 
                  size={20} 
                  className={`text-gray-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} 
                />
              </button>

              {showDropdown && (
                <div className="overflow-y-auto absolute z-10 mt-2 w-full max-h-64 bg-white rounded-lg border border-gray-200 shadow-lg">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageSelect(language.code)}
                      className="flex justify-between items-center px-4 py-3 w-full text-left transition-colors hover:bg-purple-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{language.flag}</span>
                        <div>
                          <div className="font-medium text-gray-900">{language.nativeName}</div>
                          <div className="text-sm text-gray-600">{language.name}</div>
                        </div>
                      </div>
                      {selectedLanguage === language.code && (
                        <RiCheckLine size={18} className="text-purple-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* 按钮列表模式 */
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {languages.map((language) => {
                const isSelected = selectedLanguage === language.code
                return (
                  <button
                    key={language.code}
                    onClick={() => setSelectedLanguage(language.code)}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                      isSelected
                        ? 'bg-purple-50 border-purple-300 ring-2 ring-purple-100'
                        : 'bg-white border-gray-200 hover:border-purple-200 hover:bg-purple-25'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{language.flag}</span>
                      <div className="text-left">
                        <div className={`font-medium ${isSelected ? 'text-purple-900' : 'text-gray-900'}`}>
                          {language.nativeName}
                        </div>
                        <div className={`text-sm ${isSelected ? 'text-purple-700' : 'text-gray-600'}`}>
                          {language.name}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="flex justify-center items-center w-6 h-6 bg-purple-600 rounded-full">
                        <RiCheckLine size={14} className="text-white" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* 当前选择显示 */}
        <div className="p-5 bg-gradient-to-r from-purple-50 rounded-xl border to-purple-100/60 border-purple-200/60">
          <h4 className="mb-3 font-semibold text-purple-900">当前选择</h4>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{selectedLang?.flag}</span>
            <div>
              <div className="font-medium text-purple-900">{selectedLang?.nativeName}</div>
              <div className="text-sm text-purple-700">{selectedLang?.name} ({selectedLang?.code})</div>
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
