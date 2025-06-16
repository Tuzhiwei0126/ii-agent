import React, { useEffect, useState } from "react";
import { useDebounceFn } from "ahooks";
import s from "./style.module.css";
import cn from "@/utils/classnames";
import Category from "@/app/roles/category";
import TeamCard from "@/components/team-card";
import RoleCard from "@/components/role-card";
import { useAppContext } from "@/context/app-context";
import { Input, Button } from "antd";

// 营销策略团队角色数据
const marketingRoles = [
  {
    id: "role-1",
    name: "张总",
    title: "营销策略总监（团队协调版）",
    description: "营销策略总监作为团队协调者，负责接收用户需求和产品材料，对任务进行分析和分发给团队成员，并在最终阶段整合各专员的分析结果。具备市场洞察力、项目管理、需求分析、任务优先级排序、团队协调和成果整合的专业技能。",
    level: "3",
    avatar_url: "/roles/og_team1.png",
    team: {
      id: "marketing-team-1",
      name: "营销策略团队",
      description: "专业的营销策略团队，由营销策略总监领导，整合市场调研、产品分析和市场推广三大核心能力。"
    },
    characters: [
      {
        id: "member-1",
        name: "张总",
        title: "营销策略总监",
        avatar_middle_url: "/roles/og_team1.png"
      }
    ]
  },
  {
    id: "role-3",
    name: "李专员",
    title: "市场调研专员",
    description: "市场调研专员专注于市场环境分析和竞争对手研究，负责定制适合用户产品的营销方案。精通行业趋势分析、竞争对手研究、目标客户定位和营销策略制定。能够通过全面的市场调研，识别市场机会和威胁，分析同类产品的营销策略优劣。",
    level: "初级",
    avatar_url: "/roles/og_team2.png",
    team: {
      id: "marketing-team-1",
      name: "营销策略团队",
      description: "专业的营销策略团队，由营销策略总监领导，整合市场调研、产品分析和市场推广三大核心能力。"
    },
    characters: [
      {
        id: "member-2",
        name: "李专员",
        title: "市场调研专员",
        avatar_middle_url: "/roles/og_team2.png"
      }
    ]
  },
  {
    id: "role-4",
    name: "王分析",
    title: "产品分析师",
    description: "产品分析师专注于分析用户提供的产品材料，发现产品优势和不足。精通产品功能评估、用户体验分析、价值主张梳理和产品定位。能够从营销角度审视产品，识别关键卖点和改进机会，为市场营销提供产品层面的支持和建议。",
    level: "高级",
    avatar_url: "/roles/og_team3.png",
    team: {
      id: "marketing-team-1",
      name: "营销策略团队",
      description: "专业的营销策略团队，由营销策略总监领导，整合市场调研、产品分析和市场推广三大核心能力。"
    },
    characters: [
      {
        id: "member-3",
        name: "王分析",
        title: "产品分析师",
        avatar_middle_url: "/roles/og_team3.png"
      }
    ]
  },
  {
    id: "role-5",
    name: "赵专员",
    title: "市场推广专员",
    description: "市场推广专员专注于制定具体可行的营销推广策略和执行计划。精通多渠道营销策略、内容营销、社交媒体推广、效果广告和品牌活动策划。能够根据市场调研结果和产品分析，设计针对性的推广活动和传播方案。",
    level: "3",
    avatar_url: "/roles/og_team4.png",
    team: {
      id: "marketing-team-1",
      name: "营销策略团队",
      description: "专业的营销策略团队，由营销策略总监领导，整合市场调研、产品分析和市场推广三大核心能力。"
    },
    characters: [
      {
        id: "member-4",
        name: "赵专员",
        title: "市场推广专员",
        avatar_middle_url: "/roles/og_team4.png"
      }
    ]
  }
];

// 营销策略团队数据
const marketingTeam = {
  id: "marketing-team-1",
  name: "营销策略团队",
  title: "营销策略团队",
  description: "专业的营销策略团队，由营销策略总监领导，整合市场调研、产品分析和市场推广三大核心能力。",
  level: "高级",
  avatar_url: "/roles/og_team1.png",
  team: {
    id: "marketing-team-1",
    name: "营销策略团队",
    description: "专业的营销策略团队，由营销策略总监领导，整合市场调研、产品分析和市场推广三大核心能力。"
  },
  characters: [
    {
      id: "member-1",
      name: "张总",
      title: "营销策略总监",
      avatar_middle_url: "/roles/og_team1.png"
    },
    {
      id: "member-2",
      name: "李专员",
      title: "市场调研专员",
      avatar_middle_url: "/roles/og_team2.png"
    },
    {
      id: "member-3",
      name: "王分析",
      title: "产品分析师",
      avatar_middle_url: "/roles/og_team3.png"
    },
    {
      id: "member-4",
      name: "赵专员",
      title: "市场推广专员",
      avatar_middle_url: "/roles/og_team4.png"
    }
  ]
};

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

    // 暂时注释掉接口调用
    // if (listType === "通用型" && !roleList) {
    //   mutateRoleList();
    // } else if (listType === "团队" && !teamList) {
    //   mutateTeamList();
    // }
  }, [listType, roleList, teamList, mutateRoleList, mutateTeamList, mounted]);

  // 搜索功能
  const { run: handleSearch } = useDebounceFn(
    async () => {
      if (!keywords.trim()) {
        // 如果搜索关键词为空，重新获取原始数据
        // if (listType === "通用型") {
        //   mutateRoleList();
        // } else {
        //   mutateTeamList();
        // }
        return;
      }

      try {
        // if (listType === "通用型") {
        //   await searchRoles(keywords.trim());
        // } else {
        //   await searchTeams(keywords.trim());
        // }
        console.log('搜索关键词:', keywords.trim());
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
  };

  // 获取当前显示的列表
  const currentList = listType === "通用型" 
    ? marketingRoles
    : [marketingTeam];
  const isEmpty = currentList && currentList.length === 0;
  const isLoading = false; // 暂时注释掉加载状态

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
          disabled={isLoading}
        />
      </div>

      {/* 内容区域 */}
      <div className="overflow-auto relative flex-1 p-6">
        {isLoading && !currentList ? (
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
        {isLoading && currentList && (
          <div className="flex absolute inset-0 justify-center items-center bg-white/50">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default List;