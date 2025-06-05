'use client'
import { useTranslation } from 'react-i18next'
import cn from '@/utils/classnames'
import type { App } from '@/models/explore'
import TeamModal from '../team-modal'
import { useState, useEffect } from 'react'
export type AppCardProps = {
  app: App;
  canCreate: boolean;
  onCreate: () => void;
  isExplore: boolean;
}

const TeamCard = ({ app }: AppCardProps) => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [teamId, setTeamId] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 在挂载前显示静态文本，避免水合错误
  const teamLabel = mounted ? t('team.label', '团队') : '团队'

  return (
    <>
      <div
        className="relative"
        onClick={() => {
          setTeamId(app.team.id)
          setIsModalOpen(true)
        }}
      >
        <div
          className={cn(
            'group relative flex h-[300px] w-full cursor-pointer flex-col overflow-hidden rounded-[8px] rounded-lg border-t-[4px] border-components-panel-border border-t-[#6B48FF] bg-components-panel-on-panel-item-bg shadow-[0px_4px_15px_#6B48FF05,0px_8px_15px_#6B48FF08] transition-all duration-200 ease-in-out hover:shadow-[0px_8px_30px_#6B48FF10,0px_16px_30px_#6B48FF15]',
          )}
        >
          <div className="flex flex-col p-4 h-full">
            {/* 第一行：名称和标签 */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div
                  className="text-lg font-semibold leading-6 truncate text-text-primary"
                  title={app.team.name}
                >
                  {app.team.name}
                </div>
              </div>
              <div
                className={cn(
                  'flex h-[24px] w-[80px] items-center justify-center rounded px-2 text-xs font-medium',
                  'bg-[#F0EBFF]',
                  'text-[#6B47FF]',
                )}
              >
                {teamLabel}
              </div>
            </div>

            {/* 第二行：说明 */}
            <div className="mb-4 text-sm text-text-secondary">
              <div className="line-clamp-2">{app.team.description}</div>
            </div>
            {/* 第三行：卡片列表 */}
            <div className="mt-auto">
              <div
                className="flex overflow-x-auto pb-2"
                style={{ scrollbarWidth: 'none' }}
              >
                <div className="flex space-x-3">
                  {/* 这里可以循环团队成员，这里只是示例 */}

                  {
                    app?.characters.map(item => (
                      <div
                        key={item.id}
                        className="relative h-[180px] w-[130px] shrink-0 rounded-[20px] border border-gray-200 bg-white"
                      >
                        <img
                          src={item.avatar_middle_url}
                          className="mb-2 h-[180px] w-[130px] rounded-[4px]"
                        />
                        {/* 添加名字和职位的覆盖层 */}
                        <div className="absolute bottom-0 left-0 right-0 rounded-b-[20px] bg-gradient-to-t from-[#251B51] to-[#251B5100] p-2 text-white">
                          <div className="text-xs font-medium truncate">

                            {item.name}
                          </div>
                          <div className="text-xs truncate opacity-80">
                            {item.title}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <TeamModal
          teamInfo={app.team}
          isOpen={isModalOpen}
          teamId={teamId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

export default TeamCard
