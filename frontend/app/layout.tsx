import type { Metadata } from "next";
import "../styles/globals.css";
import "@/lib/i18n";
import Providers from "@/providers";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { AuthGuard } from '@/components/auth-guard';
import { ThemeProvider } from '@/components/theme-provider';
import 'antd/dist/reset.css';

export const metadata: Metadata = {
  title: "II Agent",
  description: "Intelligent Interface Agent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
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
