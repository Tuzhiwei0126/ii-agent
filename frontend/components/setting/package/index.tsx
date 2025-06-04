'use client'

import { useState } from 'react'
import { 
  RiCheckLine,
  RiStarFill,
  RiCoinLine,
  RiBuildingLine,
  RiGiftLine
} from '@remixicon/react'

export default function PackageSetting() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const packages = {
    monthly: [
      {
        id: 'free',
        name: '免费版',
        price: 0,
        originalPrice: 0,
        icon: <RiGiftLine size={24} className="text-green-600" />,
        popular: false,
        features: {
          credits: '100',
          storage: '1GB',
          ppt: '5',
          documents: '10',
          agents: '1'
        }
      },
      {
        id: 'pro',
        name: '专业版',
        price: 99,
        originalPrice: 99,
        icon: <RiStarFill size={24} className="text-purple-600" />,
        popular: true,
        features: {
          credits: '2,000',
          storage: '10GB',
          ppt: '50',
          documents: '无限',
          agents: '5'
        }
      },
      {
        id: 'enterprise',
        name: '企业版',
        price: 299,
        originalPrice: 299,
        icon: <RiBuildingLine size={24} className="text-blue-600" />,
        popular: false,
        features: {
          credits: '10,000',
          storage: '100GB',
          ppt: '无限',
          documents: '无限',
          agents: '20'
        }
      }
    ],
    yearly: [
      {
        id: 'free',
        name: '免费版',
        price: 0,
        originalPrice: 0,
        icon: <RiGiftLine size={24} className="text-green-600" />,
        popular: false,
        features: {
          credits: '100',
          storage: '1GB',
          ppt: '5',
          documents: '10',
          agents: '1'
        }
      },
      {
        id: 'pro',
        name: '专业版',
        price: 79,
        originalPrice: 99,
        icon: <RiStarFill size={24} className="text-purple-600" />,
        popular: true,
        features: {
          credits: '2,000',
          storage: '10GB',
          ppt: '50',
          documents: '无限',
          agents: '5'
        }
      },
      {
        id: 'enterprise',
        name: '企业版',
        price: 239,
        originalPrice: 299,
        icon: <RiBuildingLine size={24} className="text-blue-600" />,
        popular: false,
        features: {
          credits: '10,000',
          storage: '100GB',
          ppt: '无限',
          documents: '无限',
          agents: '20'
        }
      }
    ]
  }

  const currentPackages = packages[billingCycle]

  return (
    <div className="px-6 pb-6">
      <div className="mb-8">
        <h3 className="mb-2 text-xl font-semibold text-gray-900">套餐订阅</h3>
        <p className="text-sm text-gray-600">选择适合您的套餐计划</p>
      </div>

      <div className="space-y-6">
        {/* 当前套餐状态 */}
        <div 
          className="p-6 rounded-xl border border-purple-300/50"
          style={{
            background: 'linear-gradient(135deg, #6B48FF 0%, #A18CFF 100%)'
          }}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center w-12 h-12 rounded-full shadow-lg backdrop-blur-sm bg-white/20">
                <RiCoinLine size={20} className="text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">当前套餐：专业版</h4>
                <p className="text-sm text-white/80">您正在使用专业版服务</p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-purple-700 rounded-lg border backdrop-blur-sm transition-all duration-200 bg-white/90 border-white/20 hover:bg-white hover:text-purple-800">
              更改订阅方案
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="p-4 rounded-lg border backdrop-blur-sm bg-white/10 border-white/20">
              <div className="text-center">
                <div className="text-sm font-medium text-white/90">订阅状态</div>
                <div className="mt-1 text-lg font-semibold text-white">已激活</div>
              </div>
            </div>
            <div className="p-4 rounded-lg border backdrop-blur-sm bg-white/10 border-white/20">
              <div className="text-center">
                <div className="text-sm font-medium text-white/90">下次续费</div>
                <div className="mt-1 text-lg font-semibold text-white">2024-02-15</div>
              </div>
            </div>
            <div className="p-4 rounded-lg border backdrop-blur-sm bg-white/10 border-white/20">
              <div className="text-center">
                <div className="text-sm font-medium text-white/90">支付方式</div>
                <div className="mt-1 text-lg font-semibold text-white">微信支付</div>
              </div>
            </div>
            <div className="p-4 rounded-lg border backdrop-blur-sm bg-white/10 border-white/20">
              <div className="text-center">
                <div className="text-sm font-medium text-white/90">积分额度</div>
                <div className="mt-1 text-lg font-semibold text-white">1,250/2,000</div>
              </div>
            </div>
          </div>
        </div>

        {/* 计费周期切换 */}
        <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/60">
          <h4 className="mb-5 font-semibold text-gray-900">计费周期</h4>
          <div className="flex justify-center">
            <div className="flex p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  billingCycle === 'monthly'
                    ? 'bg-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                style={billingCycle === 'monthly' ? { color: 'white' } : {}}
              >
                月度订阅
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 relative ${
                  billingCycle === 'yearly'
                    ? 'bg-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                style={billingCycle === 'yearly' ? { color: 'white' } : {}}
              >
                年度订阅
                <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold text-white bg-orange-500 rounded-full">
                  8折
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 套餐卡片 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {currentPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white border rounded-xl p-6 transition-all duration-200 hover:shadow-lg ${
                pkg.popular
                  ? 'border-purple-200 ring-2 ring-purple-100'
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 text-xs font-medium text-white bg-purple-500 rounded-full">
                    推荐
                  </span>
                </div>
              )}

              <div className="mb-6 text-center">
                <div className="flex justify-center mb-3">
                  {pkg.icon}
                </div>
                <h5 className="mb-2 text-lg font-semibold text-gray-900">{pkg.name}</h5>
                <div className="flex justify-center items-center space-x-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ¥{pkg.price}
                  </span>
                  {billingCycle === 'yearly' && pkg.originalPrice > pkg.price && (
                    <span className="text-lg text-gray-500 line-through">
                      ¥{pkg.originalPrice}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  /{billingCycle === 'monthly' ? '月' : '年'}
                </p>
              </div>

              <div className="mb-6 space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">积分/月</span>
                  <span className="text-sm font-semibold text-gray-900">{pkg.features.credits}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">知识库存储</span>
                  <span className="text-sm font-semibold text-gray-900">{pkg.features.storage}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">PPT制作</span>
                  <span className="text-sm font-semibold text-gray-900">{pkg.features.ppt}个/月</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">文档生成</span>
                  <span className="text-sm font-semibold text-gray-900">{pkg.features.documents}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">智能体数量</span>
                  <span className="text-sm font-semibold text-gray-900">{pkg.features.agents}个</span>
                </div>
              </div>

              <button
                className={`w-full py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  pkg.id === 'pro'
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : pkg.popular
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
                disabled={pkg.id === 'pro'}
              >
                {pkg.id === 'pro' ? '当前套餐' : pkg.id === 'free' ? '降级' : '立即升级'}
              </button>
            </div>
          ))}
        </div>

        {/* 套餐对比说明 */}
        <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/60">
          <h4 className="mb-4 font-semibold text-gray-900">套餐说明</h4>
          <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-2">
            <div className="flex items-start space-x-2">
              <RiCheckLine size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
              <span>年度订阅享受8折优惠，性价比更高</span>
            </div>
            <div className="flex items-start space-x-2">
              <RiCheckLine size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
              <span>支持随时升级或降级套餐，按比例退费</span>
            </div>
            <div className="flex items-start space-x-2">
              <RiCheckLine size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
              <span>企业版提供专属客服和定制化服务</span>
            </div>
            <div className="flex items-start space-x-2">
              <RiCheckLine size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
              <span>所有套餐都包含基础功能和技术支持</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
