'use client'

import { useState } from 'react'
import { RiStarFill, RiStarLine, RiFeedbackLine, RiHeartLine, RiMailLine } from '@remixicon/react'

export default function FeedbackSetting() {
  const [feedbackType, setFeedbackType] = useState('bug')
  const [message, setMessage] = useState('')
  const [satisfaction, setSatisfaction] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 处理反馈提交
    console.log('Feedback submitted:', { feedbackType, message, satisfaction })
  }

  const StarRating = ({ rating, onRatingChange }: { rating: number, onRatingChange: (rating: number) => void }) => {
    const ratingTexts = [
      '请给产品打分',
      '非常不满意',
      '不满意', 
      '一般',
      '满意',
      '非常满意'
    ]

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onRatingChange(star)}
              className="transition-all duration-200 hover:scale-110 active:scale-95"
            >
              {star <= rating ? (
                <RiStarFill size={32} className="text-yellow-400 drop-shadow-sm" />
              ) : (
                <RiStarLine size={32} className="text-gray-300 hover:text-yellow-300" />
              )}
            </button>
          ))}
        </div>
        <div className="text-center">
          <span className={`text-lg font-medium ${rating > 0 ? 'text-purple-700' : 'text-gray-600'}`}>
            {ratingTexts[rating]}
          </span>
        </div>
      </div>
    )
  }

  const feedbackTypes = [
    { id: 'bug', name: '问题反馈', description: '报告软件问题或错误' },
    { id: 'feature', name: '功能建议', description: '提出新功能或改进建议' },
    { id: 'other', name: '其他', description: '其他意见或建议' }
  ]

  return (
    <div className="p-8 space-y-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">意见反馈</h3>
        <p className="text-gray-600">我们重视您的意见，帮助我们改进产品体验</p>
      </div>

      <div className="space-y-8">
        {/* 感谢卡片 */}
        <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-2xl p-8 shadow-xl relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative flex items-center space-x-6">
            <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
              <RiHeartLine size={24} className="text-white" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">感谢您的反馈</h4>
              <p className="text-purple-100 text-lg">您的意见对我们非常重要，帮助我们持续改进产品</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 产品满意度 */}
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-8 hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-xl">
                <RiStarFill size={20} className="text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">产品满意度</h4>
                <p className="text-sm text-gray-600">请为我们的产品打分</p>
              </div>
            </div>
            <StarRating rating={satisfaction} onRatingChange={setSatisfaction} />
          </div>

          {/* 反馈类型 */}
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-8 hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-xl">
                <RiFeedbackLine size={20} className="text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">反馈类型</h4>
                <p className="text-sm text-gray-600">选择最符合您反馈内容的类型</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {feedbackTypes.map((type) => (
                <label 
                  key={type.id}
                  className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                    feedbackType === type.id
                      ? 'border-purple-300 bg-purple-50 ring-2 ring-purple-100'
                      : 'border-gray-200 bg-gray-50 hover:border-purple-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="feedbackType"
                    value={type.id}
                    checked={feedbackType === type.id}
                    onChange={(e) => setFeedbackType(e.target.value)}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <h5 className={`font-semibold text-lg mb-2 ${
                      feedbackType === type.id ? 'text-purple-700' : 'text-gray-900'
                    }`}>
                      {type.name}
                    </h5>
                    <p className={`text-sm ${
                      feedbackType === type.id ? 'text-purple-600' : 'text-gray-600'
                    }`}>
                      {type.description}
                    </p>
                  </div>
                  {feedbackType === type.id && (
                    <div className="flex justify-center mt-4">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* 详细描述 */}
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-8 hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-xl">
                <RiMailLine size={20} className="text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">详细描述</h4>
                <p className="text-sm text-gray-600">请详细描述您的意见或建议</p>
              </div>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-40 px-6 py-4 rounded-xl border-2 border-gray-200 transition-all duration-200 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 placeholder-gray-400"
              placeholder="请详细描述您遇到的问题、建议或其他意见..."
              required
            />
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-500">
                最少输入 10 个字符
              </p>
              <span className={`text-sm ${message.length >= 10 ? 'text-green-600' : 'text-gray-400'}`}>
                {message.length}/500
              </span>
            </div>
          </div>

          {/* 提交按钮 */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!message.trim() || message.length < 10 || satisfaction === 0}
              className="px-12 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              提交反馈
            </button>
          </div>
        </form>

        {/* 联系方式 */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100/60 rounded-2xl border border-gray-200/60 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">其他联系方式</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>客服邮箱：support@goagent.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>工作时间：周一至周五 9:00-18:00</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>在线客服：点击右下角图标</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>通常在 24 小时内回复</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
