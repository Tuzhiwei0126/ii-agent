"use client";

import { Suspense } from "react";

import Home from "@/components/home";
import MainLayout from "@/components/layout/main-layout";

export default function Page() {
  return (
    <MainLayout>
      <Suspense fallback={<></>}>
        <Home />
      </Suspense>
    </MainLayout>
  );
}
