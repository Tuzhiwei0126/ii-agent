'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useDebounceFn } from 'ahooks'
import s from './style.module.css'
import cn from '@/utils/classnames'
import Category from './category' 
import TeamCard from '../team-card'
import RoleCard from '../role-card'
import Loading from '@/app/components/base/loading'
import { useAppContext } from '@/context/app-context'
import Input from 'antd'
type AppsProps = {
  onSuccess?: () => void;
}

export enum PageType {
  EXPLORE = 'explore',
  CREATE = 'create',
}

const Apps = ({ onSuccess }: AppsProps) => {
  const { t } = useTranslation()
  const {
    roleList,
    mutateRoleList,
    userProfileData,
    teamList,
  } = useAppContext()
  const { push } = useRouter()
  const allCategoriesEn = t('explore.apps.allCategories', { lng: 'en' })

  const [keywords, setKeywords] = useState('')
  const [searchKeywords, setSearchKeywords] = useState('')

  useEffect(() => {
    mutateRoleList()
  }, [roleList, userProfileData, teamList])
  const { run: handleSearch } = useDebounceFn(
    () => {
      setSearchKeywords(keywords)
    },
    { wait: 500 },
  )

  const handleKeywordsChange = (value: string) => {
    setKeywords(value)
    handleSearch()
  }
  const [listType, setListType] = useState<string>('通用型')


  const [currApp, setCurrApp] = React.useState<App | null>(null)

  if (roleList && roleList.length === 0) {
    return (
      <div className="flex items-center h-full">
        <Loading type="area" />
      </div>
    )
  }
  return (
    <div
      className={cn(
        'flex h-full flex-col border-l-[0.5px] border-divider-regular',
        'rounded-[10px] shadow-inner shadow-[#E1DAFF80] backdrop-blur-[8px]',
      )}
    >
      <div className={cn('flex justify-between items-center px-6 mt-6')}>
        <>
          <Category
            list={['通用型', '团队']}
            value={listType}
            onChange={setListType}
            allCategoriesEn={allCategoriesEn}
          />
        </>
        <Input
          showLeftIcon
          showClearIcon
          wrapperClassName="w-[200px]"
          value={keywords}
          onChange={e => handleKeywordsChange(e.target.value)}
          onClear={() => handleKeywordsChange('')}
        />
      </div>

      <div
        className={cn(
          'flex overflow-auto relative flex-col flex-1 pb-6 mt-4 shrink-0 grow',
        )}
      >
        <nav
          className={cn(
            listType !== '团队'
              ? s.appList
              : 'grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2',
            'mt-2 grid shrink-0 content-start gap-4 px-6',
          )}
        >

          {listType === '通用型' ? (
            roleList?.map(app => (
              <RoleCard
                key={app.id}
                isExplore
                app={app}
              />
            ))
          ) : (
            teamList?.map(app => (
              <TeamCard
                key={app.id}
                isExplore
                app={app}
              />
            ))
          )}
        </nav>
      </div>
    </div>
  )
}

export default React.memo(Apps)
