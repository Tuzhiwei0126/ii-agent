'use client'

// import RadarChart from "@/components/radar-chart"
import { RiCloseLine } from '@remixicon/react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { fetchRoleData } from '@/service/common'
import RadarChart from './radar-chart'

// 定义 Role 类型
type Ability = {
  id: string;
  name: string;
  score?: number;
}

type Document = {
  id: string;
  title: string;
}

type Tool = {
  id: string;
  name: string;
}

type Role = {
  name: string;
  title: string;
  level: number;
  description: string;
  abilities: Ability[];
  documents: Document[];
  tools: Tool[];
}

export default function RoleModel({
  isOpen,
  onClose,
  roleId,
}: {
  isOpen: boolean;
  onClose: () => void;
  roleId: string;
}) {
  // 防止滚动
  const [roleInfo, setRoleInfo] = useState<Role | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (roleId) {
      setLoading(true)
      fetchRoleData({ url: '/character', params: { character_id: roleId } })
        .then((response) => {
          const { data } = response
          console.log('roleInfo', data)
          setRoleInfo(data)
        })
        .catch((error) => {
          console.error('获取角色数据失败:', error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [roleId])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  // 准备雷达图数据
  let radarData = roleInfo?.abilities?.map(ability => ({
    name: ability.name,
    score: ability.score || Math.floor(Math.random() * 60) + 40, // 如果没有分数，生成随机分数作为示例
  })) || []

  // 如果没有数据或数据不足，使用默认的五个维度
  if (!radarData.length) {
    radarData = [
      { name: '工具使用', score: Math.floor(Math.random() * 60) + 40 },
      { name: '理解能力', score: Math.floor(Math.random() * 60) + 40 },
      { name: '知识储备', score: Math.floor(Math.random() * 60) + 40 },
      { name: '稳定性', score: Math.floor(Math.random() * 60) + 40 },
      { name: '专业性', score: Math.floor(Math.random() * 60) + 40 },
    ]
  }

  // 使用 Portal 将模态框直接挂载到 body
  return createPortal(
    <div className="ant-modal-root">
      <div
        className="ant-modal-mask fixed inset-0 z-[1000] bg-black/30"
        onClick={onClose}
      ></div>
      <div className="ant-modal-wrap fixed inset-0 z-[1000] flex items-center justify-center overflow-auto">
        <div
          className="ant-modal pointer-events-auto max-h-[80%] w-full max-w-[80%] rounded-xl bg-white/70 shadow-2xl backdrop-blur-[60px]"
          onClick={e => e.stopPropagation()}
        >
          <div className="relative p-10">
            {/* 标题和关闭按钮 */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="flex items-center text-2xl font-bold text-[#6b47ff]">
                {roleInfo?.name}
                <span className="ml-4 rounded-full bg-[#f0ebff] px-2 py-1 text-base text-gray-500">
                  {roleInfo?.level === 1
                    ? '初级'
                    : roleInfo?.level === 2
                    ? '中级'
                    : '高级'}
                </span>
              </h2>
              <Button
                variant="ghost"
                className="rounded-lg bg-[#ffffff]/0 px-2 "
                onClick={onClose}
              >
                <RiCloseLine className="w-8 h-8" />
              </Button>
            </div>

            <div className="flex gap-4">
              {/* 左侧雷达图 */}
              <div className="w-[35%]">
                <div className="flex relative justify-center items-center mx-auto w-full rounded-lg aspect-square">
                  {/* 圆形线条背景 */}
                  <div className="flex absolute inset-0 justify-center items-center">
                    <div className="h-[100%] w-[100%] rounded-full border-2 border-[#d0c2ff] opacity-15"></div>
                    <div className="absolute h-[90%] w-[90%] rounded-full border border-[#c0adff] opacity-30"></div>
                    <div className="absolute h-[70%] w-[70%] rounded-full border border-[#b098ff] opacity-45"></div>
                    <div className="absolute h-[50%] w-[50%] rounded-full border border-[#a083ff] opacity-60"></div>
                    <div className="absolute h-[30%] w-[30%] rounded-full border border-[#906eff] opacity-75"></div>
                  </div>
                  {/* 使用新的雷达图组件 */}
                  {radarData.length > 0 ? (
                    <RadarChart abilities={radarData} className="mb-10 ml-10" />
                  ) : (
                    <div className="text-[#6b47ff]">加载中...</div>
                  )}
                </div>
              </div>

              {/* 中间人物盒子 */}
              <div className="w-[30%]">
                <div className="flex flex-col justify-center items-center p-4 h-full rounded-lg">
                  <img src='/role/og_card.png' alt="" className="" />
                  <button className="w-full rounded-full bg-[#6b47ff] px-6 py-2.5 font-medium text-white transition-colors hover:bg-[#452cae]">
                    开始对话
                  </button>
                </div>
              </div>

              {/* 右侧详情 */}
              <div className="w-[35%]">
                <div className="p-6 h-full rounded-lg">
                  <h2 className="mb-3 text-2xl font-bold">
                    {roleInfo?.title}
                  </h2>
                  <div className="mb-4 w-full border-b border-[rgba(0,0,0,0.08)]"></div>

                  {/* Core capabilities */}
                  <div className="mb-5">
                    <h3 className="mb-2 font-semibold text-[#6b47ff]">
                      核心能力
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                    {roleInfo?.abilities && roleInfo.abilities.map(item => (
                          <div key={item.id} className="rounded-full bg-[#f0ebff] px-3 py-1 text-[#6b47ff]">{item.name}</div>
                        ))}
                    </div>
                  </div>

                  {/* Role description */}
                  <div className="mb-5">
                    <h3 className="mb-2 font-semibold text-[#6b47ff]">
                      角色描述
                    </h3>
                    <p className="text-[14px] font-normal leading-[21px] text-[#666666]">
                      {roleInfo?.description}
                    </p>
                  </div>

                  {/* Knowledge base */}
                  <div className="mb-5">
                    <h3 className="mb-2 font-semibold text-[#6b47ff]">
                      知识库
                    </h3>
                    <ul className="space-y-2 text-[14px] font-normal leading-[21px] text-[#666666]">
                    {roleInfo?.documents && roleInfo.documents.map(item => (
                          <li key={item.id}>{item.title}</li>
                        ))}
                    </ul>
                  </div>

                  {/* Tools */}
                  <div className="mb-2">
                    <h3 className="mb-2 font-semibold text-[#6b47ff]">工具</h3>
                    <ul className="space-y-2 text-[14px] font-normal leading-[21px] text-[#666666]">
                    {roleInfo?.tools && roleInfo.tools.map(item => (
                          <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
