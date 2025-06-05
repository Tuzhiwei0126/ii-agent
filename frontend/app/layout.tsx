import type { Metadata } from "next";
import "../styles/globals.css";
import "@/lib/i18n";
import Providers from "@/providers";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { AuthGuard } from '@/components/auth-guard';
import { ThemeProvider } from '@/components/theme-provider';
import 'antd/dist/reset.css';

export const metadata: Metadata = {
  title: "GoAgent",
  description: "GoAgent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider>
          <AuthGuard>
            <AntdRegistry>
              <Providers>{children}</Providers>
            </AntdRegistry>
          </AuthGuard>
        </ThemeProvider>
      </body>
    </html>
  );
}
