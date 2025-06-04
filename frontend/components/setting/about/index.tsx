'use client'

export default function AboutSetting() {
  return (
    <div className="px-6 pb-6">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">关于我们</h3>
        <p className="text-gray-600 text-sm">了解更多产品信息</p>
      </div>

      <div className="space-y-6">
        {/* 产品信息 */}
        <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-5">
          <h4 className="font-semibold text-gray-900 mb-5">产品信息</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">产品名称</span>
              <span className="text-gray-900 font-semibold">GoAgent</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">当前版本</span>
              <span className="text-gray-900 font-semibold">v1.0.0</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">发布日期</span>
              <span className="text-gray-900 font-semibold">2024-01-01</span>
            </div>
          </div>
        </div>

        {/* 联系方式 */}
        <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-5">
          <h4 className="font-semibold text-gray-900 mb-5">联系我们</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">官方网站</span>
              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                www.goagent.com
              </a>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">客服邮箱</span>
              <a href="mailto:support@goagent.com" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                support@goagent.com
              </a>
            </div>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-5">
          <h4 className="font-semibold text-gray-900 mb-5">版权信息</h4>
          <p className="text-gray-600 leading-relaxed">
            © 2024 GoAgent. 保留所有权利。本软件受版权法和国际条约保护。
          </p>
        </div>
      </div>
    </div>
  )
}
