
import React, { useEffect, useState } from "react";
import { useDebounceFn } from "ahooks";
import s from "./style.module.css";
import cn from "@/utils/classnames";
import Category from "@/app/roles/category";
import TeamCard from "@/components/team-card";
import RoleCard from "@/components/role-card";
import { useAppContext } from "@/context/app-context";
import { Input, Button } from "antd";

const Loading = () => (
    <div className="flex justify-center items-center h-full">
      <div className="w-8 h-8 rounded-full border-b-2 border-blue-500 animate-spin"></div>
    </div>
  );
  
  const List = () => {
    const {
      roleList,
      mutateRoleList,
      teamList,
      mutateTeamList,
      loading,
      clearError,
      searchRoles,
      searchTeams,
    } = useAppContext();
  
    // 使用固定值避免水合错误
    const allCategoriesEn = "全部分类";
    const [keywords, setKeywords] = useState("");
    const [listType, setListType] = useState<string>("通用型");
    const [mounted, setMounted] = useState(false);
  
    // 组件挂载后再启用动态功能
    useEffect(() => {
      setMounted(true);
    }, []);
  
    // 初始化数据
    useEffect(() => {
      if (!mounted) return; // 等待组件挂载
  
      if (listType === "通用型" && !roleList) {
        mutateRoleList();
      } else if (listType === "团队" && !teamList) {
        mutateTeamList();
      }
    }, [listType, roleList, teamList, mutateRoleList, mutateTeamList, mounted]);
  
    // 搜索功能
    const { run: handleSearch } = useDebounceFn(
      async () => {
        if (!keywords.trim()) {
          // 如果搜索关键词为空，重新获取原始数据
          if (listType === "通用型") {
            mutateRoleList();
          } else {
            mutateTeamList();
          }
          return;
        }
  
        try {
          if (listType === "通用型") {
            await searchRoles(keywords.trim());
          } else {
            await searchTeams(keywords.trim());
          }
        } catch (error) {
          console.error("Search failed:", error);
        }
      },
      { wait: 500 }
    );
  
    const handleKeywordsChange = (value: string) => {
      setKeywords(value);
      handleSearch();
    };
  
    const handleListTypeChange = (value: string) => {
      setListType(value);
      setKeywords(""); // 切换类型时清空搜索关键词
      // clearError(); // 清除错误状态
    };
  
    // 获取当前显示的列表
    const currentList = listType === "通用型" ? roleList : teamList;
    const isEmpty = currentList && currentList.length === 0;
  
    
    return (
      <div className="flex flex-col h-full bg-white">
        {/* 搜索和筛选栏 */}
        <div className="flex justify-between items-center">
          <Category
            list={["通用型", "团队"]}
            value={listType}
            onChange={handleListTypeChange}
            allCategoriesEn={allCategoriesEn}
          />
          <Input
            placeholder={`搜索${listType}...`}
            className="max-w-[240px] w-full"
            value={keywords}
            onChange={(e) => handleKeywordsChange(e.target.value)}
            allowClear
            disabled={loading}
          />
        </div>
  
  
        {/* 内容区域 */}
        <div className="overflow-auto relative flex-1 p-6">
          {loading && !currentList ? (
            <Loading />
          ) : isEmpty ? (
            <div className="flex flex-col justify-center items-center h-full text-gray-500">
              <div className="mb-2 text-lg">
                {keywords
                  ? `没有找到与 "${keywords}" 相关的${listType}`
                  : `暂无${listType}数据`}
              </div>
              {keywords && (
                <Button type="link" onClick={() => setKeywords("")}>
                  清除搜索条件
                </Button>
              )}
            </div>
          ) : (
            <div
              className={cn(
                listType !== "团队"
                  ? s.appList
                  : "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2",
                "grid gap-4"
              )}
            >
              {currentList?.map((app) => {
                const CardComponent = listType === "通用型" ? RoleCard : TeamCard;
                return (
                  <CardComponent
                    key={app.id}
                    isExplore={true}
                    app={app}
                    canCreate={false}
                    onCreate={() => {}}
                  />
                );
              })}
            </div>
          )}
  
          {/* 加载中状态覆盖层 */}
          {loading && currentList && (
            <div className="flex absolute inset-0 justify-center items-center bg-white/50">
              <Loading />
            </div>
          )}
        </div>
      </div>
    );
  };
  export default List;