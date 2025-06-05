"use client";

import React from "react";
import MainLayout from "@/components/layout/main-layout";
import List from "@/app/roles/list";


const RolesPage=() => {
  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        {/* 页面标题 */}
        <div className="mb-4 text-2xl font-bold text-gray-900">角色库</div>
        {/* 角色列表内容 */}

        <List />
      </div>
    </MainLayout>
  );
};

export default RolesPage;
