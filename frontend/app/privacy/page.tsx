'use client';

import { Typography } from 'antd';
import { useTheme } from '@/utils/theme';

const { Title, Paragraph } = Typography;

export default function PrivacyPage() {
  const { theme: currentTheme } = useTheme();

  return (
    <div className={`min-h-screen p-8 ${
      currentTheme === 'dark' ? 'bg-background text-text-primary' : 'bg-background'
    }`}>
      <div className="max-w-4xl mx-auto">
        <Title level={1} className="text-center mb-8">隐私政策</Title>
        
        <Paragraph>
          我们非常重视您的隐私保护。本隐私政策说明了我们如何收集、使用和保护您的个人信息。
        </Paragraph>

        <Title level={2}>1. 信息收集</Title>
        <Paragraph>
          我们收集的信息包括但不限于：账号信息、使用记录、设备信息等。这些信息将用于提供和改进我们的服务。
        </Paragraph>

        <Title level={2}>2. 信息使用</Title>
        <Paragraph>
          我们使用收集的信息来：提供、维护和改进服务；开发新的服务和功能；保护用户和公众的安全。
        </Paragraph>

        <Title level={2}>3. 信息保护</Title>
        <Paragraph>
          我们采取各种安全措施来保护您的个人信息，防止未经授权的访问、使用或披露。
        </Paragraph>

        <Title level={2}>4. 信息共享</Title>
        <Paragraph>
          除非获得您的明确同意，我们不会与第三方共享您的个人信息。
        </Paragraph>

        <Title level={2}>5. Cookie 使用</Title>
        <Paragraph>
          我们使用 Cookie 和类似技术来改善用户体验，记住您的偏好设置。
        </Paragraph>
      </div>
    </div>
  );
} 