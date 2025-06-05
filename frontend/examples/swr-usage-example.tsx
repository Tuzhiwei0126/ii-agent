// 使用示例：展示如何使用优化后的SWR hooks

import React, { useState } from 'react'
import { 
  useRoleList, 
  useTeamList, 
  useAppList, 
  useUserProfile,
  useSearchableRoleList,
  useRoleDetail,
  useTeamMembers
} from '@/hooks/useSWRData'

// 示例1：基础列表组件
export const RoleListExample = () => {
  const { data: roles, error, isLoading, mutate } = useRoleList()

  if (isLoading) return <div>加载中...</div>
  if (error) return <div>错误: {error.message}</div>

  return (
    <div>
      <button onClick={() => mutate()}>刷新数据</button>
      {roles?.map(role => (
        <div key={role.id}>{role.name}</div>
      ))}
    </div>
  )
}

// 示例2：带搜索功能的组件
export const SearchableRoleList = () => {
  const [keyword, setKeyword] = useState('')
  const { data: roles, error, isLoading } = useSearchableRoleList(keyword)

  return (
    <div>
      <input 
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="搜索角色..."
      />
      {isLoading && <div>搜索中...</div>}
      {error && <div>搜索失败: {error.message}</div>}
      {roles?.map(role => (
        <div key={role.id}>{role.name}</div>
      ))}
    </div>
  )
}

// 示例3：角色详情组件
export const RoleDetailExample = ({ roleId }: { roleId: string }) => {
  const { data: roleDetail, error, isLoading } = useRoleDetail(roleId)

  if (isLoading) return <div>加载角色详情...</div>
  if (error) return <div>加载失败: {error.message}</div>
  if (!roleDetail) return <div>未找到角色信息</div>

  return (
    <div>
      <h1>{roleDetail.name}</h1>
      <p>{roleDetail.description}</p>
      <div>
        <h3>能力列表:</h3>
        {roleDetail.abilities.map(ability => (
          <span key={ability.id}>{ability.name}</span>
        ))}
      </div>
    </div>
  )
}

// 示例4：团队成员组件
export const TeamMembersExample = ({ teamId }: { teamId: string }) => {
  const { data: teamData, error, isLoading } = useTeamMembers(teamId)

  if (isLoading) return <div>加载团队成员...</div>
  if (error) return <div>加载失败: {error.message}</div>
  if (!teamData?.data) return <div>未找到团队信息</div>

  return (
    <div>
      <h2>团队成员</h2>
      {teamData.data.characters.map(character => (
        <div key={character.id}>
          <h3>{character.name}</h3>
          <p>{character.title}</p>
          <p>{character.description}</p>
        </div>
      ))}
    </div>
  )
}

// 示例5：综合使用多个hooks的组件
export const DashboardExample = () => {
  const { data: roles, isLoading: rolesLoading } = useRoleList({ skip: 0, limit: 5 })
  const { data: teams, isLoading: teamsLoading } = useTeamList({ skip: 0, limit: 5 })
  const { data: apps, isLoading: appsLoading } = useAppList({ page: 1, limit: 10, name: '' })
  const { data: userProfile, isLoading: profileLoading } = useUserProfile()

  const isLoading = rolesLoading || teamsLoading || appsLoading || profileLoading

  return (
    <div>
      <h1>控制台</h1>
      
      {isLoading && <div>加载中...</div>}
      
      {userProfile && (
        <div>
          <h2>欢迎, {userProfile.name || '用户'}</h2>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        <div>
          <h3>最新角色 ({roles?.length || 0})</h3>
          {roles?.slice(0, 3).map(role => (
            <div key={role.id}>{role.name}</div>
          ))}
        </div>

        <div>
          <h3>最新团队 ({teams?.length || 0})</h3>
          {teams?.slice(0, 3).map(team => (
            <div key={team.id}>{team.name}</div>
          ))}
        </div>

        <div>
          <h3>最新应用 ({apps?.length || 0})</h3>
          {apps?.slice(0, 3).map(app => (
            <div key={app.id}>{app.name}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 使用原始的 AppContext 方式（用于对比）
export const ContextBasedExample = () => {
  // 现在可以这样使用：
  const {
    roleList,
    roleListLoading,
    roleListError,
    mutateRoleList,
    teamList,
    teamListLoading,
    teamListError,
    searchRoles,
    searchTeams
  } = useAppContext()

  return (
    <div>
      <h2>基于Context的方式</h2>
      
      <button onClick={() => mutateRoleList()}>刷新角色列表</button>
      <button onClick={() => searchRoles('开发')}>搜索开发相关角色</button>
      <button onClick={() => searchTeams('技术')}>搜索技术团队</button>

      {(roleListLoading || teamListLoading) && <div>加载中...</div>}
      {roleListError && <div>角色列表错误: {roleListError}</div>}
      {teamListError && <div>团队列表错误: {teamListError}</div>}
      
      <div>
        <h3>角色列表</h3>
        {roleList?.map(role => (
          <div key={role.id}>{role.name}</div>
        ))}
      </div>

      <div>
        <h3>团队列表</h3>
        {teamList?.map(team => (
          <div key={team.id}>{team.name}</div>
        ))}
      </div>
    </div>
  )
}

import { useAppContext } from '@/context/app-context' 