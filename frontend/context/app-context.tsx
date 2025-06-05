'use client'

import React, { createContext, useContext } from 'react'
import useSWR from 'swr'
import { 
  fetchRoleList, 
  fetchTeamList, 
  fetchUserProfile 
} from '@/service/common'
import type { App, UserProfile } from '@/models/explore'

interface AppContextType {
  // 角色列表相关
  roleList: App[] | undefined
  roleListLoading: boolean
  roleListError: string | null
  mutateRoleList: () => Promise<App[] | undefined>
  
  // 团队列表相关
  teamList: App[] | undefined
  teamListLoading: boolean
  teamListError: string | null
  mutateTeamList: () => Promise<App[] | undefined>
  
  
  // 用户资料相关
  userProfile: UserProfile | undefined
  userProfileLoading: boolean
  userProfileError: string | null
  mutateUserProfile: () => Promise<UserProfile | undefined>
  
  // 搜索功能
  searchRoles: (keyword: string) => Promise<void>
  searchTeams: (keyword: string) => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 角色列表 SWR
  const { 
    data: roleListResponse, 
    mutate: mutateRoleList,
    error: roleListSWRError,
    isLoading: roleListLoading
  } = useSWR(
    { url: '/character/generic', params: { skip: 0, limit: 10 } },
    fetchRoleList,
  )
  
  // 团队列表 SWR
  const { 
    data: teamListResponse, 
    mutate: mutateTeamList,
    error: teamListSWRError,
    isLoading: teamListLoading
  } = useSWR(
    { url: '/character/team', params: { skip: 0, limit: 10 } },
    fetchTeamList,
  )
  

  
  // 用户资料V1 SWR
  const { 
    data: userProfileResponse, 
    mutate: mutateUserProfile,
    error: userProfileV1SWRError,
    isLoading: userProfileV1Loading
  } = useSWR(
    { url: '/login/test-token', params: {} },
    fetchUserProfile,
  )

  // 错误处理函数
  const getErrorMessage = (error: Error | null): string | null => {
    if (!error) return null
    return error.message || '请求失败'
  }

  // 搜索角色
  const searchRoles = async (keyword: string) => {
    // TODO: 实现基于关键词的搜索逻辑
    console.log('搜索角色关键词:', keyword)
    try {
      await mutateRoleList()
    } catch (error) {
      console.error('搜索角色失败:', error)
    }
  }

  // 搜索团队
  const searchTeams = async (keyword: string) => {
    // TODO: 实现基于关键词的搜索逻辑
    console.log('搜索团队关键词:', keyword)
    try {
      await mutateTeamList()
    } catch (error) {
      console.error('搜索团队失败:', error)
    }
  }

  const value: AppContextType = {
    // 角色列表
    roleList: roleListResponse,
    roleListLoading,
    roleListError: getErrorMessage(roleListSWRError),
    mutateRoleList,
    
    // 团队列表
    teamList: teamListResponse,
    teamListLoading,
    teamListError: getErrorMessage(teamListSWRError),
    mutateTeamList,
    
    // 用户资料V1
    userProfile: userProfileResponse,
    userProfileLoading: userProfileV1Loading,
    userProfileError: getErrorMessage(userProfileV1SWRError),
    mutateUserProfile,
    
    // 搜索功能
    searchRoles,
    searchTeams,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

// 导出类型以便在其他地方使用
export type { AppContextType }
