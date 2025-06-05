import useSWR from 'swr'
import { 
  fetchRoleList, 
  fetchTeamList, 
  fetchAppList, 
  fetchUserProfile,
  fetchRoleData,
  fetchTeamsMemberData
} from '@/service/common'

// 角色列表hook
export const useRoleList = (params = { skip: 0, limit: 10 }) => {
  return useSWR(
    { url: '/character/generic', params },
    fetchRoleList,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1分钟内去重
    }
  )
}

// 团队列表hook
export const useTeamList = (params = { skip: 0, limit: 10 }) => {
  return useSWR(
    { url: '/character/team', params },
    fetchTeamList,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  )
}

// 应用列表hook
export const useAppList = (params = { page: 1, limit: 30, name: '' }) => {
  return useSWR(
    { url: '/apps', params },
    fetchAppList,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  )
}

// 用户资料V1 hook
export const useUserProfile = () => {
  return useSWR(
    { url: '/login/test-token', params: {} },
    fetchUserProfile,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000,
    }
  )
}

// 角色详情hook
export const useRoleDetail = (roleId: string) => {
  return useSWR(
    roleId ? { url: '/character', params: { character_id: roleId } } : null,
    fetchRoleData,
    {
      revalidateOnFocus: false,
    }
  )
}

// 团队成员数据hook
export const useTeamMembers = (teamId: string) => {
  return useSWR(
    teamId ? { url: '/team_members', params: { team_id: teamId } } : null,
    fetchTeamsMemberData,
    {
      revalidateOnFocus: false,
    }
  )
}

// 带搜索功能的角色列表hook
export const useSearchableRoleList = (keyword = '', params = { skip: 0, limit: 10 }) => {
  const searchParams = keyword 
    ? { ...params, search: keyword }
    : params
  
  return useSWR(
    { url: '/character/generic', params: searchParams },
    fetchRoleList,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // 搜索结果30秒内去重
    }
  )
}

// 带搜索功能的团队列表hook
export const useSearchableTeamList = (keyword = '', params = { skip: 0, limit: 10 }) => {
  const searchParams = keyword 
    ? { ...params, search: keyword }
    : params
  
  return useSWR(
    { url: '/character/team', params: searchParams },
    fetchTeamList,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    }
  )
} 