'use client'

import { RiInformationLine, RiGlobalLine, RiMailLine, RiCopyrightLine, RiHeartFill } from '@remixicon/react'

export default function AboutSetting() {
  return (
    <div className="p-8 space-y-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">关于我们</h3>
        <p className="text-gray-600">了解更多产品信息和团队介绍</p>
      </div>

      <div className="space-y-8">
        {/* 产品介绍卡片 */}
        <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-2xl p-8 shadow-xl relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative flex items-center space-x-6">
            <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
              <RiHeartFill size={24} className="text-white" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">GoAgent</h4>
              <p className="text-purple-100 text-lg">智能助手，让工作更高效</p>
              <p className="text-purple-200 mt-2">专注于为用户提供优质的AI助手服务</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 产品信息 */}
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-8 hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-xl">
                <RiInformationLine size={20} className="text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">产品信息</h4>
                <p className="text-sm text-gray-600">当前版本详细信息</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100/60 rounded-xl border border-purple-200/40">
                <div>
                  <div className="font-medium text-purple-700">产品名称</div>
                  <div className="text-sm text-purple-600 mt-1">智能助手应用</div>
                </div>
                <div className="text-xl font-bold text-purple-700">GoAgent</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100/60 rounded-xl border border-blue-200/40">
                <div>
                  <div className="font-medium text-blue-700">当前版本</div>
                  <div className="text-sm text-blue-600 mt-1">最新稳定版本</div>
                </div>
                <div className="text-xl font-bold text-blue-700">v1.0.0</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100/60 rounded-xl border border-green-200/40">
                <div>
                  <div className="font-medium text-green-700">发布日期</div>
                  <div className="text-sm text-green-600 mt-1">正式版发布时间</div>
                </div>
                <div className="text-xl font-bold text-green-700">2024-01-01</div>
              </div>
            </div>
          </div>

          {/* 联系我们 */}
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-8 hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-xl">
                <RiGlobalLine size={20} className="text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">联系我们</h4>
                <p className="text-sm text-gray-600">获取帮助和技术支持</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="group p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                      <RiGlobalLine size={16} className="text-blue-600 group-hover:text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">官方网站</div>
                      <div className="text-sm text-gray-600">访问我们的官网</div>
                    </div>
                  </div>
                  <div className="text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
                    www.goagent.com
                  </div>
                </div>
              </div>
              
              <div className="group p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                      <RiMailLine size={16} className="text-green-600 group-hover:text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">客服邮箱</div>
                      <div className="text-sm text-gray-600">发送邮件咨询</div>
                    </div>
                  </div>
                  <div className="text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
                    support@goagent.com
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100/60 rounded-xl border border-orange-200/40">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <div className="font-medium text-orange-700">服务时间</div>
                    <div className="text-sm text-orange-600">周一至周五 9:00-18:00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-8 hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-xl">
              <RiCopyrightLine size={20} className="text-purple-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">版权信息</h4>
              <p className="text-sm text-gray-600">法律声明和使用条款</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-50 to-gray-100/60 rounded-xl p-6 border border-gray-200/40">
            <p className="text-gray-700 leading-relaxed text-center">
              © 2024 GoAgent. 保留所有权利。本软件受版权法和国际条约保护。
            </p>
            <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-600">
              <a href="#" className="hover:text-purple-600 transition-colors">隐私政策</a>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <a href="#" className="hover:text-purple-600 transition-colors">用户协议</a>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <a href="#" className="hover:text-purple-600 transition-colors">开源许可</a>
            </div>
          </div>
        </div>

        {/* 技术栈信息 */}
        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-8 hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-xl">
              <div className="w-5 h-5 bg-purple-600 rounded"></div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">技术信息</h4>
              <p className="text-sm text-gray-600">应用技术栈和支持平台</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100/60 rounded-xl border border-blue-200/40">
              <div className="text-2xl font-bold text-blue-700 mb-1">React</div>
              <div className="text-sm text-blue-600">前端框架</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100/60 rounded-xl border border-green-200/40">
              <div className="text-2xl font-bold text-green-700 mb-1">Node.js</div>
              <div className="text-sm text-green-600">后端运行时</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100/60 rounded-xl border border-purple-200/40">
              <div className="text-2xl font-bold text-purple-700 mb-1">AI</div>
              <div className="text-sm text-purple-600">智能引擎</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100/60 rounded-xl border border-orange-200/40">
              <div className="text-2xl font-bold text-orange-700 mb-1">Cloud</div>
              <div className="text-sm text-orange-600">云端服务</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
