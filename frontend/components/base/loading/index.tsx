import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import './style.css'

type ILoadingProps = {
  type?: 'area' | 'app'
}

const Loading = (
  { type = 'area' }: ILoadingProps = { type: 'area' },
) => {
  // 创建自定义的加载图标，颜色设置为 #6B47FF
  const antIcon = <LoadingOutlined style={{ fontSize: 58, color: '#6B47FF' }} spin />

  return (
    <div className={`flex w-full items-center justify-center ${type === 'app' ? 'h-full' : ''}`}>
      <Spin indicator={antIcon} />
    </div>
  )
}

export default Loading
