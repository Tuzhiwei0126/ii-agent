'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { token } from '@/utils/token';

// 不需要登录就可以访问的路由
const publicRoutes = ['/login', '/register', '/forgot-password'];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 检查是否是公开路由
    const isPublicRoute = publicRoutes.includes(pathname);
    
    // 如果没有 token 且不是公开路由,重定向到登录页
    if (!token.has() && !isPublicRoute) {
      router.push('/login');
    }
    
    // 如果有 token 且是登录页,重定向到首页
    if (token.has() && pathname === '/login') {
      router.push('/');
    }
  }, [pathname, router]);

  return <>{children}</>;
} 