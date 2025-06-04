'use client'
import cn from '@/utils/classnames'
import type { App } from '@/models/explore'
import RoleModel from '../role-model'
import { useRoleCard } from './useRoleCard'

export type AppCardProps = {
  app: App;
  canCreate: boolean;
  onCreate: () => void;
  isExplore: boolean;
}

const AppCard = ({ app }: AppCardProps) => {
  const {
    isModalOpen,
    appId,
    levelStyle,
    levelText,
    openModal,
    closeModal,
  } = useRoleCard(app)

  return (
    <>
      <div
        className="relative"
        onClick={() => {
          openModal()
        }}
      >
        <div
          className={cn(
            'group relative flex h-[120px] w-full cursor-pointer overflow-hidden rounded-[8px] rounded-lg border-l-[2px] border-components-panel-border border-l-[#6B48FF] bg-components-panel-on-panel-item-bg shadow-[0px_4px_15px_#6B48FF05,0px_8px_15px_#6B48FF08] transition-all duration-200 ease-in-out hover:shadow-[0px_8px_30px_#6B48FF10,0px_16px_30px_#6B48FF15]',
          )}
        >
          <div className="flex p-4">
            <div className="relative shrink-0">
              <img
                src={app.avatar_url || '/role/og_act.png'}
                className="h-[88px] w-[88px] rounded-[4px]"
              />
            </div>
            <div className="ml-4 flex flex-col justify-between overflow-hidden">
              <div>
                <div className="flex items-center justify-between text-sm font-semibold leading-5 text-text-secondary">
                  <div className="truncate" title={app.name}>
                    {app.name}
                  </div>
                  <div
                    className={cn(
                      'ml-2 flex h-[20px] w-[56px] items-center justify-center rounded px-1.5 text-xs font-medium',
                      levelStyle.bg,
                      levelStyle.text,
                    )}
                  >
                    {levelText}
                  </div>
                </div>
                <div className="mt-1 flex items-center text-[12px] font-medium leading-[18px] text-text-tertiary">
                  {app.title}
                </div>
              </div>
              <div className="overflow-hidden text-xs text-text-tertiary">
                <div className="line-clamp-2">{app.description}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <RoleModel
          isOpen={isModalOpen}
          roleId={appId}
          onClose={closeModal}
        />
      )}
    </>
  )
}

export default AppCard
