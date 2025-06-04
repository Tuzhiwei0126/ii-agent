'use client'

import { useState } from 'react'
import { RiStarFill, RiStarLine } from '@remixicon/react'

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
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="transition-colors hover:scale-105 transform duration-200"
          >
            {star <= rating ? (
              <RiStarFill size={24} className="text-yellow-400" />
            ) : (
              <RiStarLine size={24} className="text-gray-300 hover:text-yellow-300" />
            )}
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {rating === 0 && '请给产品打分'}
          {rating === 1 && '非常不满意'}
          {rating === 2 && '不满意'}
          {rating === 3 && '一般'}
          {rating === 4 && '满意'}
          {rating === 5 && '非常满意'}
        </span>
      </div>
    )
  }

  return (
    <div className="px-6 pb-6">
      <div className="mb-8">
        <h3 className="mb-2 text-xl font-semibold text-gray-900">意见反馈</h3>
        <p className="text-sm text-gray-600">我们重视您的意见，帮助我们改进产品</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 产品满意度 */}
        <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/60">
          <h4 className="mb-5 font-semibold text-gray-900">产品满意度</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                请为我们的产品打分
              </label>
              <StarRating rating={satisfaction} onRatingChange={setSatisfaction} />
            </div>
          </div>
        </div>

        {/* 反馈类型 */}
        <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/60">
          <h4 className="mb-5 font-semibold text-gray-900">反馈类型</h4>
          <div className="space-y-3">
            <label className="flex items-center p-3 rounded-lg transition-colors cursor-pointer hover:bg-white/60">
              <input
                type="radio"
                name="feedbackType"
                value="bug"
                checked={feedbackType === 'bug'}
                onChange={(e) => setFeedbackType(e.target.value)}
                className="mr-4 text-purple-600 focus:ring-purple-500/20"
              />
              <span className="font-medium text-gray-900">问题反馈</span>
            </label>
            <label className="flex items-center p-3 rounded-lg transition-colors cursor-pointer hover:bg-white/60">
              <input
                type="radio"
                name="feedbackType"
                value="feature"
                checked={feedbackType === 'feature'}
                onChange={(e) => setFeedbackType(e.target.value)}
                className="mr-4 text-purple-600 focus:ring-purple-500/20"
              />
              <span className="font-medium text-gray-900">功能建议</span>
            </label>
            <label className="flex items-center p-3 rounded-lg transition-colors cursor-pointer hover:bg-white/60">
              <input
                type="radio"
                name="feedbackType"
                value="other"
                checked={feedbackType === 'other'}
                onChange={(e) => setFeedbackType(e.target.value)}
                className="mr-4 text-purple-600 focus:ring-purple-500/20"
              />
              <span className="font-medium text-gray-900">其他</span>
            </label>
          </div>
        </div>

        {/* 详细描述 */}
        <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/60">
          <h4 className="mb-5 font-semibold text-gray-900">详细描述</h4>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="px-4 py-3 w-full h-32 rounded-lg border border-gray-200 transition-colors resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
            placeholder="请详细描述您遇到的问题或建议..."
            required
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2.5 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            style={{ color: 'white' }}
          >
            提交反馈
          </button>
        </div>
      </form>
    </div>
  )
}
