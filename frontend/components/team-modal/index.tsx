'use client'

// import RadarChart from "@/components/radar-chart"
import { RiCloseLine } from '@remixicon/react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { fetchTeamsMemberData } from '@/service/common'
import RadarChart from '../role-model/radar-chart'
import cn from '@/utils/classnames'
import { t } from 'i18next'
import { useRouter } from 'next/navigation'

export default function TeamModal({
  isOpen,
  onClose,
  teamId,
  teamInfo,
}: {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
  teamInfo: TeamMember;
}) {
  // 防止滚动
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (teamId) {
      setLoading(true)
      fetchTeamsMemberData({
        url: '/team_members',
        params: { team_id: teamId },
      })
        .then(({ data }) => {
          console.log('teamData', data)
          setTeamMembers(data)
        })
        .catch((error) => {
          console.error('获取角色数据失败:', error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [teamId])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  // 添加当前选中的角色状态
  const [activeTab, setActiveTab] = useState(
    teamMembers?.characters?.[0]?.name,
  )

  // 使用 teamMembers?.characters 替代模拟角色数据
  const roles = teamMembers?.characters || [
    {
      id: '1',
      name: '张全蛋',
      avatar: '张',
      title: '行政经理',
      level: '初级',
      description: '专注于处理日常行政事务，协调会议安排',
      avatar_small_url: '/roles/og_act5.png',
      avatar_large_url: '/roles/og_card.png',
    },
    {
      id: '2',
      name: '李小明',
      avatar: '李',
      title: '技术专家',
      level: '高级',
      description: '解决复杂技术问题，提供专业技术支持',
      avatar_small_url: '/roles/og_act3.png',
      avatar_large_url: '/roles/og_card.png',
    },
    {
      id: '3',
      name: '王大锤',
      avatar: '王',
      title: '营销顾问',
      level: '中级',
      description: '制定营销策略，分析市场趋势',
      avatar_small_url: '/roles/og_act4.png',
      avatar_large_url: '/roles/og_card.png',
    },
    {
      id: '4',
      name: '赵四海',
      avatar: '赵',
      title: '财务分析师',
      level: '高级',
      description: '财务规划与分析，成本控制',
      avatar_small_url: '/roles/og_act5.png',
      avatar_large_url: '/roles/og_card.png',
    },
  ]
  const activeRole = roles.find(role => role.name === activeTab) || roles[0]
  const getLevelType = (): LevelType => {
    const levelMap: Record<string, LevelType> = {
      1: 'junior',
      2: 'middle',
    }
    return levelMap[activeRole.level] || 'junior'
  }

  const getLevelStyle = (type: LevelType) => {
    const styles = {
      junior: {
        bg: 'bg-[#F1F1F1]',
        text: 'text-[#333333]',
      },
      middle: {
        bg: 'bg-[#F0EBFF]',
        text: 'text-[#6B47FF]',
      },
      senior: {
        bg: 'bg-[#F0EBFF]',
        text: 'text-[#6B47FF]',
      },
      expert: {
        bg: 'bg-gradient-to-r from-[#6B48FF] to-[#A18CFF]',
        text: 'text-white',
      },
    }
    return styles[type]
  }

  const getLevelText = (type: LevelType) => {
    const textMap = {
      junior: t('level.junior', '初级'),
      middle: t('level.middle', '中级'),
      senior: t('level.senior', '高级'),
      expert: t('level.expert', '正高级'),
    }
    return textMap[type]
  }
  console.log('teamInfo', teamInfo)
  const router = useRouter()
  const levelType = getLevelType( )
  const levelStyle = getLevelStyle(levelType)
  const levelText = getLevelText(levelType)
  // 准备雷达图数据
  let radarData = []

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
  // 获取
  if (!isOpen) return null

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
            {/* 第一部分：团队信息和角色选择 - 带有更强的模糊效果 */}
            <div className="relative rounded-[24px] p-6 pb-0 !backdrop-blur-[25px]">
              {/* 关闭按钮 - 移到上面盒子右上角 */}
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  className="rounded-lg bg-[#ffffff]/0 px-2"
                  onClick={onClose}
                >
                  <RiCloseLine className="w-8 h-8" />
                </Button>
              </div>

              {/* 上部分：名称和头像列表 */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-6 items-start">
                  {/* 头像列表移到最左侧 */}
                  <div className="flex mr-4 -space-x-3">
                    {roles.map(role => (
                      <div
                        key={role.id}
                        className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#d9d0ff]"
                      >
                        <img src={role.avatar_small_url} alt="" />
                      </div>
                    ))}
                  </div>

                  {/* 团队名称和描述 */}
                  <div>
                    <h1 className="mb-2 text-3xl font-bold text-[#6b47ff]">
                      {teamInfo.name}
                    </h1>
                    <p className="text-gray-600">{teamInfo.description}</p>
                  </div>
                </div>
              </div>

              {/* 底部：角色切换标签页 */}
              <div className="border-b border-[rgba(0,0,0,0.08)]">
                <div className="flex justify-center items-center">
                  {roles.map(role => (
                    <button
                      key={role.id}
                      className={`px-2 pb-3 font-medium ${
                        activeTab === role.name
                          ? 'border-b-2 border-[#6b47ff] text-[#6b47ff]'
                          : 'text-gray-500'
                      }`}
                      onClick={() => setActiveTab(role.name)}
                    >
                      {role.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 中间透明分隔区域 - 只占位不显示样式 */}

            {/* 第二部分：角色详细信息 */}
            <div className="rounded-[24px] p-6 pt-0 backdrop-blur-[60px]">
              {/* 标题和角色等级 */}
              <div className="flex items-center mb-6">
                <h2 className="flex items-center text-2xl font-bold text-[#6b47ff]">
                  {activeRole.name}
                  <div
                    className={cn(
                      'ml-2 flex h-[20px] w-[56px] items-center justify-center rounded px-1.5 text-xs font-medium',
                      levelStyle.bg,
                      levelStyle.text,
                    )}
                  >
                    {levelText}
                  </div>
                </h2>
              </div>

              <div className="flex gap-8">
                {/* 左侧雷达图 */}
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
                      <RadarChart
                        abilities={radarData}
                        className="mb-10 ml-10"
                      />
                    ) : (
                      <div className="text-[#6b47ff]">加载中...</div>
                    )}
                  </div>
                </div>

                {/* 中间人物盒子 - 保留机械风格但移除连接线和连接点 */}
                <div className="relative -ml-6 w-[30%]">
                  {/* 移除右侧连接线和连接点 */}

                  {/* 添加机械风格装饰 - 左上角 */}
                  <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#6b47ff] opacity-70"></div>

                  {/* 添加机械风格装饰 - 右上角 */}
                  <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[#6b47ff] opacity-70"></div>

                  {/* 添加机械风格装饰 - 左下角 */}
                  <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[#6b47ff] opacity-70"></div>

                  {/* 添加机械风格装饰 - 右下角 */}
                  <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[#6b47ff] opacity-70"></div>

                  {/* 添加扫描线效果 */}
                  <div className="overflow-hidden absolute inset-0 pointer-events-none">
                    <div className="absolute left-0 top-0 h-2 w-full animate-[scanline_2s_linear_infinite] bg-gradient-to-b from-[#6b47ff]/20 to-transparent"></div>
                  </div>

                  {/* 移除数据流动效果 */}

                  {/* 主卡片容器 */}
                  <div className="relative flex h-full flex-col items-center justify-center rounded-lg border-2 border-[#6b47ff]/30 p-6 backdrop-blur-sm">
                    {/* 添加角色等级标识 */}
                    {/* 添加机械风格装饰线 */}
                    <div className="absolute left-4 top-4 h-4 w-4 border-l-2 border-t-2 border-[#6b47ff]"></div>
                    <div className="absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-[#6b47ff]"></div>
                    <div className="absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-[#6b47ff]"></div>
                    <div className="absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-[#6b47ff]"></div>

                    {/* 添加发光效果 */}
                    <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-b from-[#6b47ff]/5 to-transparent"></div>

                    {/* <img src={activeRole.avatar_large_url} alt="" className="relative z-10 mb-4" />
                     */}
                    <img src='/roles/og_card.png' alt="" className="relative z-10 mb-4" />

                    {/* 添加能量条 */}
                    <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-[#e6e0ff]">
                      <div className="h-full w-[85%] animate-pulse rounded-full bg-gradient-to-r from-[#6b47ff] to-[#9c82ff]"></div>
                    </div>

                    <button onClick={() => {
                      router.push('/')
                    }} className="group relative z-10 w-full overflow-hidden rounded-full bg-[#6b47ff] px-6 py-2.5 font-medium text-white transition-colors hover:bg-[#452cae]">
                      <span className="relative z-10">开始对话</span>
                      <div className="absolute inset-0 animate-[shimmer_1s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-[#ffffff]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </button>
                  </div>
                </div>

                {/* 右侧详情 - 添加左侧线条连接点 */}
                <div className="relative ml-6 w-[30%]">
                  {/* 移除原有的连接点和连接线 */}

                  <div className="p-6 h-full rounded-lg">
                    <h2 className="mb-3 text-2xl font-bold">
                      {activeRole.title}
                    </h2>
                    <div className="mb-4 w-full border-b border-[rgba(0,0,0,0.08)]"></div>

                    {/* Core capabilities - 添加左侧线条连接点 */}
                    <div className="relative mb-5">
                      {/* 添加左侧线条和同心圆连接点 - 核心能力线条更长 */}
                      <div className="absolute left-[-190px] top-[12px] flex items-center">
                        <div className="h-[2px] w-[180px] bg-gradient-to-r from-[#6b47ff] to-[#d0c2ff]"></div>
                        <div className="flex absolute right-0 justify-center items-center">
                          {/* 外圆 */}
                          <div className="absolute h-4 w-4 animate-[pulse_1.5s_infinite] rounded-full border border-[#6b47ff] bg-[#f0ebff] shadow-[0_0_5px_#6b47ff]"></div>
                          {/* 内圆 */}
                          <div className="absolute h-2 w-2 rounded-full bg-[#6b47ff]"></div>
                        </div>
                      </div>
                      <h3 className="mb-2 font-semibold text-[#6b47ff]">
                        核心能力
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {activeRole?.abilities
                          && activeRole?.abilities?.map(item => (
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
                        {activeRole.description}
                      </p>
                    </div>

                    {/* Knowledge base - 添加左侧线条连接点 */}
                    <div className="relative mb-5 pt-[calc(45%-200px)]">
                      {/* 添加左侧线条和同心圆连接点 */}
                      <div className="absolute left-[-160px] top-[32px] flex items-center">
                        <div className="h-[2px] w-[150px] bg-gradient-to-r from-[#6b47ff] to-[#d0c2ff]"></div>
                        <div className="flex absolute right-0 justify-center items-center">
                          {/* 外圆 */}
                          <div className="absolute h-4 w-4 animate-[pulse_2s_infinite] rounded-full border border-[#6b47ff] bg-[#f0ebff] shadow-[0_0_5px_#6b47ff]"></div>
                          {/* 内圆 */}
                          <div className="absolute h-2 w-2 rounded-full bg-[#6b47ff]"></div>
                        </div>
                      </div>
                      <h3 className="mb-2 font-semibold text-[#6b47ff]">
                        知识库
                      </h3>
                      <ul className="space-y-2">
                        {activeRole?.documents && activeRole?.documents?.length > 0 
                          ? activeRole?.documents?.map((item) => {
                            // 根据文档类型选择不同图标
                            let iconPath
                            if (item.title.includes('PDF') || item.title.includes('pdf'))
                              iconPath = 'M8 16H16V18H8V16ZM8 12H16V14H8V12ZM14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z'
                             else if (item.title.includes('网站') || item.title.includes('Web'))
                              iconPath = 'M16.36 14C16.44 13.34 16.5 12.68 16.5 12C16.5 11.32 16.44 10.66 16.36 10H19.74C19.9 10.64 20 11.31 20 12C20 12.69 19.9 13.36 19.74 14H16.36ZM14.59 19.56C15.19 18.45 15.65 17.25 15.97 16H18.92C17.96 17.65 16.43 18.93 14.59 19.56ZM14.34 14H9.66C9.56 13.34 9.5 12.68 9.5 12C9.5 11.32 9.56 10.65 9.66 10H14.34C14.43 10.65 14.5 11.32 14.5 12C14.5 12.68 14.43 13.34 14.34 14ZM12 19.96C11.17 18.76 10.5 17.43 10.09 16H13.91C13.5 17.43 12.83 18.76 12 19.96ZM8 8H5.08C6.03 6.34 7.57 5.06 9.4 4.44C8.8 5.55 8.35 6.75 8 8ZM5.08 16H8C8.35 17.25 8.8 18.45 9.4 19.56C7.57 18.93 6.03 17.65 5.08 16ZM4.26 14C4.1 13.36 4 12.69 4 12C4 11.31 4.1 10.64 4.26 10H7.64C7.56 10.66 7.5 11.32 7.5 12C7.5 12.68 7.56 13.34 7.64 14H4.26ZM12 4.03C12.83 5.23 13.5 6.57 13.91 8H10.09C10.5 6.57 11.17 5.23 12 4.03ZM18.92 8H15.97C15.65 6.75 15.19 5.55 14.59 4.44C16.43 5.07 17.96 6.34 18.92 8ZM12 2C6.47 2 2 6.5 2 12C2 17.5 6.47 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z'
                             else
                              iconPath = 'M19 5V19H5V5H19ZM21 3H3V21H21V3ZM17 7H7V9H17V7ZM17 11H7V13H17V11ZM13 15H7V17H13V15Z'

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
                          })
                          : [
                              { id: 'doc1', title: '精准营销策略指南.PDF' },
                              { id: 'doc2', title: '客户画像分析报告.PDF' }
                            ].map((item) => {
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
                            })
                        }
                      </ul>
                    </div>

                    {/* Tools - 添加左侧线条连接点 */}
                    <div className="relative mb-2 pt-[calc(75%-350px)]">
                      {/* 添加左侧线条和同心圆连接点 */}
                      <div className="absolute left-[-140px] top-[30px] flex items-center">
                        <div className="h-[2px] w-[130px] bg-gradient-to-r from-[#6b47ff] to-[#d0c2ff]"></div>
                        <div className="flex absolute right-0 justify-center items-center">
                          {/* 外圆 */}
                          <div className="absolute h-4 w-4 animate-[pulse_1.8s_infinite] rounded-full border border-[#6b47ff] bg-[#f0ebff] shadow-[0_0_5px_#6b47ff]"></div>
                          {/* 内圆 */}
                          <div className="absolute h-2 w-2 rounded-full bg-[#6b47ff]"></div>
                        </div>
                      </div>
                      <h3 className="mb-2 font-semibold text-[#6b47ff]">
                        工具
                      </h3>
                      <ul className="space-y-2">
                        {activeRole.tools && activeRole.tools.length > 0
                          ? activeRole?.tools?.slice(0, 3).map((item) => {
                            // 根据工具类型选择不同图标
                            let iconPath
                            if (item.name.includes('搜索') || item.name.includes('查询'))
                              iconPath = 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'
                             else if (item.name.includes('计算') || item.name.includes('分析'))
                              iconPath = 'M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H9V17H7V10ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z'
                             else
                              iconPath = 'M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C10.1 1 7.1 0.6 4.7 1.7L9 6L6 9L1.6 4.7C0.4 7.1 0.9 10.1 2.9 12.1C4.8 14 7.5 14.5 9.8 13.6L18.9 22.7C19.3 23.1 19.9 23.1 20.3 22.7L22.6 20.4C23.1 20 23.1 19.3 22.7 19Z'

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
                          })
                          : [
                              { id: 'tool1', name: '市场数据分析' },
                              { id: 'tool2', name: '客户行为搜索' }
                            ].map((item) => {
                              const iconPath = item.name.includes('搜索') 
                                ? 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'
                                : 'M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H9V17H7V10ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z';
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
                            })
                        }
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
