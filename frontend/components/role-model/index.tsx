'use client'

// import RadarChart from "@/components/radar-chart"
import { RiCloseLine } from '@remixicon/react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { fetchRoleData } from '@/service/common'
import RadarChart from './radar-chart'
import { useRouter } from 'next/navigation'

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


  const router = useRouter()
  // 添加默认数据
  const defaultRole: Role = {
    name: '张全蛋',
    title: '行政经理',
    level: 1,
    description: '专注于处理日常行政事务，协调会议安排，确保团队高效运转。擅长沟通协调，具有出色的时间管理能力。',
    abilities: [
      { id: '1', name: '沟通协调', score: 85 },
      { id: '2', name: '时间管理', score: 90 },
      { id: '3', name: '团队协作', score: 88 },
      { id: '4', name: '问题解决', score: 82 },
      { id: '5', name: '文档处理', score: 95 }
    ],
    documents: [
      { id: '1', title: '行政工作手册.PDF' },
      { id: '2', title: '会议管理指南.PDF' },
      { id: '3', title: '团队协作规范.PDF' }
    ],
    tools: [
      { id: '1', name: '日程管理工具' },
      { id: '2', name: '文档协作系统' },
      { id: '3', name: '会议管理系统' }
    ]
  }

  useEffect(() => {
    if (roleId) {
      setLoading(true)
      fetchRoleData({ url: '/character', params: { character_id: roleId } })
        .then((response) => {
          const { data } = response
          console.log('roleInfo', data)
          setRoleInfo(data || defaultRole)
        })
        .catch((error) => {
          console.error('获取角色数据失败:', error)
          setRoleInfo(defaultRole)
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
    score: ability.score || Math.floor(Math.random() * 60) + 40,
  })) || defaultRole.abilities.map(ability => ({
    name: ability.name,
    score: ability.score || Math.floor(Math.random() * 60) + 40,
  }))

  // 使用 Portal 将模态框直接挂载到 body
  return createPortal(
    <div className="ant-modal-root">
      <div
        className="ant-modal-mask fixed inset-0 z-[1000] bg-black/30"
        onClick={onClose}
      ></div>
      <div className="ant-modal-wrap fixed inset-0 z-[1000] flex items-center justify-center overflow-auto">
        <div
          className="ant-modal pointer-events-auto max-h-[92vh] w-full max-w-[90%] rounded-xl bg-white/70 shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          {/* 大盒子包裹所有内容 */}
          <div className="flex flex-col">
            {/* 第二部分：角色详细信息 */}
            <div className="rounded-[24px] p-6 backdrop-blur-[60px]">
              {/* 标题和角色等级 */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="flex items-center text-2xl font-bold text-[#6b47ff]">
                  {roleInfo?.title || defaultRole.title}
                  <div className="ml-2 flex h-[20px] w-[56px] items-center justify-center rounded px-1.5 text-xs font-medium bg-[#f0ebff] text-[#6b47ff]">
                    {roleInfo?.level === 1 ? '初级' : roleInfo?.level === 2 ? '中级' : '高级'}
                  </div>
                </h2>
                <Button
                  variant="ghost"
                  className="rounded-lg bg-[#ffffff]/0 px-2"
                  onClick={onClose}
                >
                  <RiCloseLine className="w-8 h-8" />
                </Button>
              </div>

              <div className="flex gap-8">
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
                      <RadarChart abilities={radarData} />
                    ) : (
                      <div className="text-[#6b47ff]">加载中...</div>
                    )}
                  </div>
                </div>

                {/* 中间人物盒子 */}
                <div className="relative -ml-6 w-[30%]">
                  {/* 添加机械风格装饰 */}
                  <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#6b47ff] opacity-70"></div>
                  <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[#6b47ff] opacity-70"></div>
                  <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[#6b47ff] opacity-70"></div>
                  <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[#6b47ff] opacity-70"></div>

                  {/* 添加扫描线效果 */}
                  <div className="overflow-hidden absolute inset-0 pointer-events-none">
                    <div className="absolute left-0 top-0 h-2 w-full animate-[scanline_2s_linear_infinite] bg-gradient-to-b from-[#6b47ff]/20 to-transparent"></div>
                  </div>

                  {/* 主卡片容器 */}
                  <div className="relative flex h-full flex-col items-center justify-center rounded-lg border-2 border-[#6b47ff]/30 p-6 backdrop-blur-sm">
                    {/* 添加机械风格装饰线 */}
                    <div className="absolute left-4 top-4 h-4 w-4 border-l-2 border-t-2 border-[#6b47ff]"></div>
                    <div className="absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-[#6b47ff]"></div>
                    <div className="absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-[#6b47ff]"></div>
                    <div className="absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-[#6b47ff]"></div>

                    {/* 添加发光效果 */}
                    <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-b from-[#6b47ff]/5 to-transparent"></div>

                    <img src='/roles/og_card.png' alt="" className="relative z-10 mb-4" />

                    {/* 添加能量条 */}
                    <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-[#e6e0ff]">
                      <div className="h-full w-[85%] animate-pulse rounded-full bg-gradient-to-r from-[#6b47ff] to-[#9c82ff]"></div>
                    </div>

                    <button 
                      onClick={() => {
                        onClose();
                        window.location.href = '/';
                      }}
                      className="group relative z-10 w-full overflow-hidden rounded-full bg-[#6b47ff] px-6 py-2.5 font-medium text-white transition-colors hover:bg-[#452cae]"
                    >
                      <span className="relative z-10">开始对话</span>
                      <div className="absolute inset-0 animate-[shimmer_1s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-[#ffffff]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </button>
                  </div>
                </div>

                {/* 右侧详情 */}
                <div className="relative ml-6 w-[30%]">
                  <div className="p-6 h-full rounded-lg">
                    <h2 className="mb-3 text-2xl font-bold">
                      {roleInfo?.title || defaultRole.title}
                    </h2>
                    <div className="mb-4 w-full border-b border-[rgba(0,0,0,0.08)]"></div>

                    {/* Core capabilities */}
                    <div className="relative mb-5">
                      <div className="absolute left-[-190px] top-[12px] flex items-center">
                        <div className="h-[2px] w-[180px] bg-gradient-to-r from-[#6b47ff] to-[#d0c2ff]"></div>
                        <div className="flex absolute right-0 justify-center items-center">
                          <div className="absolute h-4 w-4 animate-[pulse_1.5s_infinite] rounded-full border border-[#6b47ff] bg-[#f0ebff] shadow-[0_0_5px_#6b47ff]"></div>
                          <div className="absolute h-2 w-2 rounded-full bg-[#6b47ff]"></div>
                        </div>
                      </div>
                      <h3 className="mb-2 font-semibold text-[#6b47ff]">
                        核心能力
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {(roleInfo?.abilities || defaultRole.abilities).map(item => (
                          <div
                            key={item.id}
                            className="rounded-full bg-[#f0ebff] px-3 py-1 text-[#6b47ff]"
                          >
                            {item.name}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Role description */}
                    <div className="mb-5">
                      <h3 className="mb-2 font-semibold text-[#6b47ff]">
                        角色描述
                      </h3>
                      <p className="text-[14px] font-normal leading-[21px] text-[#666666]">
                        {roleInfo?.description || defaultRole.description}
                      </p>
                    </div>

                    {/* Knowledge base */}
                    <div className="relative mb-5 pt-[calc(45%-200px)]">
                      <div className="absolute left-[-160px] top-[32px] flex items-center">
                        <div className="h-[2px] w-[150px] bg-gradient-to-r from-[#6b47ff] to-[#d0c2ff]"></div>
                        <div className="flex absolute right-0 justify-center items-center">
                          <div className="absolute h-4 w-4 animate-[pulse_2s_infinite] rounded-full border border-[#6b47ff] bg-[#f0ebff] shadow-[0_0_5px_#6b47ff]"></div>
                          <div className="absolute h-2 w-2 rounded-full bg-[#6b47ff]"></div>
                        </div>
                      </div>
                      <h3 className="mb-2 font-semibold text-[#6b47ff]">
                        知识库
                      </h3>
                      <ul className="space-y-2">
                        {(roleInfo?.documents || defaultRole.documents).map((item) => {
                          const iconPath = 'M8 16H16V18H8V16ZM8 12H16V14H8V12ZM14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z';
                          return (
                            <li
                              key={item.id}
                              className="flex items-center rounded-lg border border-[#e6e0ff] p-2 transition-colors hover:bg-[#f9f7ff]"
                            >
                              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#f0ebff]">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d={iconPath} fill="#6b47ff"/>
                                </svg>
                              </div>
                              <span className="text-[14px] font-medium text-[#333333]">{item.title}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>

                    {/* Tools */}
                    <div className="relative mb-2 pt-[calc(75%-350px)]">
                      <div className="absolute left-[-140px] top-[30px] flex items-center">
                        <div className="h-[2px] w-[130px] bg-gradient-to-r from-[#6b47ff] to-[#d0c2ff]"></div>
                        <div className="flex absolute right-0 justify-center items-center">
                          <div className="absolute h-4 w-4 animate-[pulse_1.8s_infinite] rounded-full border border-[#6b47ff] bg-[#f0ebff] shadow-[0_0_5px_#6b47ff]"></div>
                          <div className="absolute h-2 w-2 rounded-full bg-[#6b47ff]"></div>
                        </div>
                      </div>
                      <h3 className="mb-2 font-semibold text-[#6b47ff]">
                        工具
                      </h3>
                      <ul className="space-y-2">
                        {(roleInfo?.tools || defaultRole.tools).map((item) => {
                          const iconPath = 'M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H9V17H7V10ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z';
                          return (
                            <li
                              key={item.id}
                              className="flex items-center rounded-lg border border-[#e6e0ff] p-2 transition-colors hover:bg-[#f9f7ff]"
                            >
                              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#f0ebff]">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d={iconPath} fill="#6b47ff"/>
                                </svg>
                              </div>
                              <span className="text-[14px] font-medium text-[#333333]">{item.name}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
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
