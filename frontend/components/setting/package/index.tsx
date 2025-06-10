'use client'

import { useState } from 'react'
import { 
  RiCheckLine,
  RiStarFill,
  RiCoinLine,
  RiBuildingLine,
  RiGiftLine,
  RiVipCrownLine,
  RiFlaskLine
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
        color: 'green',
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
        color: 'purple',
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
        color: 'blue',
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
        color: 'green',
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
        color: 'purple',
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
        color: 'blue',
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
    <div className="p-8 space-y-8">
      <div className="mb-8">
        <h3 className="mb-2 text-2xl font-bold text-gray-900">套餐订阅</h3>
        <p className="text-gray-600">选择适合您的套餐计划</p>
      </div>

      <div className="space-y-8">
        {/* 当前套餐状态 */}
        <div className="overflow-hidden relative p-8 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-2xl shadow-xl">
          {/* 背景装饰元素 */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full translate-x-20 -translate-y-20 bg-white/5"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full -translate-x-16 translate-y-16 bg-white/5"></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full animate-pulse bg-white/30"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full animate-pulse bg-white/40 animation-delay-200"></div>
          
          <div className="relative">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center space-x-4">
                <div className="flex justify-center items-center w-16 h-16 rounded-2xl border shadow-lg backdrop-blur-sm bg-white/20 border-white/30">
                  <RiVipCrownLine size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">当前套餐：专业版</h4>
                  <p className="text-lg text-purple-100">享受完整的专业功能体验</p>
                </div>
              </div>
              <button className="px-6 py-3 font-medium text-purple-700 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-200 bg-white/90 border-white/30 hover:bg-white hover:scale-105 active:scale-95">
                管理订阅
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="p-5 rounded-xl border backdrop-blur-sm bg-white/15 border-white/20">
                <div className="text-center">
                  <div className="mb-2 text-sm font-medium text-white/80">订阅状态</div>
                  <div className="flex justify-center items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="text-lg font-bold text-white">已激活</div>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-xl border backdrop-blur-sm bg-white/15 border-white/20">
                <div className="text-center">
                  <div className="mb-2 text-sm font-medium text-white/80">下次续费</div>
                  <div className="text-lg font-bold text-white">2024-02-15</div>
                </div>
              </div>
              <div className="p-5 rounded-xl border backdrop-blur-sm bg-white/15 border-white/20">
                <div className="text-center">
                  <div className="mb-2 text-sm font-medium text-white/80">支付方式</div>
                  <div className="text-lg font-bold text-white">微信支付</div>
                </div>
              </div>
              <div className="p-5 rounded-xl border backdrop-blur-sm bg-white/15 border-white/20">
                <div className="text-center">
                  <div className="mb-2 text-sm font-medium text-white/80">积分额度</div>
                  <div className="text-lg font-bold text-white">1,250/2,000</div>
                  <div className="mt-2 w-full h-2 rounded-full bg-white/20">
                    <div className="h-2 bg-white rounded-full transition-all duration-300" style={{ width: '62.5%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 计费周期切换 */}
        <div className="p-6 bg-white rounded-2xl border shadow-sm border-gray-200/60">
          <div className="flex justify-center items-center">
            <div className="flex items-center p-1.5 bg-gray-100 rounded-xl">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <RiCoinLine size={16} className="mr-2" />
                月度订阅
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  billingCycle === 'yearly'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <RiFlaskLine size={16} className="mr-2" />
                年度订阅
                <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold text-white bg-orange-500 rounded-full animate-bounce">
                  8折
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 套餐卡片 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {currentPackages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative bg-white border-2 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02] ${
                pkg.popular
                  ? 'border-purple-300 ring-4 ring-purple-100 shadow-lg'
                  : 'border-gray-200 hover:border-purple-200'
              }`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-lg">
                    <RiStarFill size={14} className="mr-1" />
                    推荐
                  </div>
                </div>
              )}

              <div className="mb-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className={`flex items-center justify-center w-16 h-16 rounded-2xl ${
                    pkg.color === 'purple' ? 'bg-purple-100' :
                    pkg.color === 'blue' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {pkg.icon}
                  </div>
                </div>
                <h5 className="mb-4 text-xl font-bold text-gray-900">{pkg.name}</h5>
                <div className="flex justify-center items-end mb-2 space-x-2">
                  <span className="text-4xl font-bold text-gray-900">
                    ¥{pkg.price}
                  </span>
                  {billingCycle === 'yearly' && pkg.originalPrice > pkg.price && (
                    <span className="mb-1 text-xl text-gray-500 line-through">
                      ¥{pkg.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-gray-600">
                  /{billingCycle === 'monthly' ? '月' : '年'}
                </p>
              </div>

              <div className="mb-8 space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">积分/月</span>
                  <span className="font-semibold text-gray-900">{pkg.features.credits}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">知识库存储</span>
                  <span className="font-semibold text-gray-900">{pkg.features.storage}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">PPT制作</span>
                  <span className="font-semibold text-gray-900">{pkg.features.ppt}个/月</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">文档生成</span>
                  <span className="font-semibold text-gray-900">{pkg.features.documents}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">智能体数量</span>
                  <span className="font-semibold text-gray-900">{pkg.features.agents}个</span>
                </div>
              </div>

              <button
                className={`w-full py-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
                  pkg.id === 'pro'
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : pkg.popular
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100 hover:border-purple-300'
                }`}
                disabled={pkg.id === 'pro'}
              >
                {pkg.id === 'pro' ? '当前套餐' : pkg.id === 'free' ? '降级' : '立即升级'}
              </button>
            </div>
          ))}
        </div>

        {/* 套餐说明 */}
        <div className="p-6 bg-gradient-to-r from-gray-50 rounded-2xl border to-gray-100/60 border-gray-200/60">
          <h4 className="flex items-center mb-6 text-lg font-semibold text-gray-900">
            <RiCheckLine size={20} className="mr-2 text-green-500" />
            套餐说明
          </h4>
          <div className="grid grid-cols-1 gap-6 text-sm text-gray-600 md:grid-cols-2">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-2 w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>年度订阅享受8折优惠，性价比更高</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-2 w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>支持随时升级或降级套餐，按比例退费</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-2 w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>企业版提供专属客服和定制化服务</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-2 w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>所有套餐都包含基础功能和技术支持</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
