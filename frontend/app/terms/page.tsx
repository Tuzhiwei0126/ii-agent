'use client';

import { Typography } from 'antd';
import { useTheme } from '@/utils/theme';

const { Title, Paragraph } = Typography;

export default function TermsPage() {
  const { theme: currentTheme } = useTheme();

  return (
    <div className={`min-h-screen p-8 ${
      currentTheme === 'dark' ? 'bg-background text-text-primary' : 'bg-background'
    }`}>
      <div className="max-w-4xl mx-auto">
        <Title level={1} className="text-center mb-8">用户协议</Title>
        
        <Paragraph>
          欢迎使用我们的服务！本协议是您与我们之间关于使用我们服务的法律协议。
        </Paragraph>

        <Title level={2}>1. 服务内容</Title>
        <Paragraph>
          我们提供的服务包括但不限于人工智能对话、内容生成等功能。具体服务内容由我们根据实际情况提供。
        </Paragraph>

        <Title level={2}>2. 用户义务</Title>
        <Paragraph>
          用户在使用我们的服务时，应当遵守中华人民共和国相关法律法规，不得利用我们的服务从事违法违规活动。
        </Paragraph>

        <Title level={2}>3. 知识产权</Title>
        <Paragraph>
          我们服务中的所有内容，包括但不限于文字、图片、音频、视频、软件、程序、数据等，均受知识产权法律法规保护。
        </Paragraph>

        <Title level={2}>4. 免责声明</Title>
        <Paragraph>
          我们不对因使用或无法使用我们的服务而导致的任何直接或间接损失承担责任。
        </Paragraph>

        <Title level={2}>5. 协议修改</Title>
        <Paragraph>
          我们保留随时修改本协议的权利，修改后的协议将在网站上公布。
        </Paragraph>
      </div>
    </div>
  );
} 