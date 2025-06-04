'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/service/auth';
import { token } from '@/utils/token';
import { Form, Input, Button, Checkbox, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, BulbOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useTheme } from '@/utils/theme';

type LoginMode = 'login' | 'register';

type LoginFormValues = {
  username: string;
  password: string;
  email?: string;
  remember?: boolean;
  privacy?: boolean;
};

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<LoginMode>('login');
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [form] = Form.useForm();
  const { theme: currentTheme, toggleTheme } = useTheme();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccess) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowSuccess(false);
            setMode('login');
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showSuccess]);

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      if (mode === 'login') {
        console.log('尝试登录:', values);
        const res = await login({ 
          username: values.username, 
          password: values.password,
          remember: values.remember 
        });
        console.log('登录响应:', res);
        token.set(res.token);
        router.push('/');
      } else {
        // TODO: 实现注册逻辑
        setShowSuccess(true);
      }
    } catch (err: any) {
      console.error('登录错误:', err);
      message.error(err.message || '操作失败');
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className={`min-h-screen flex ${
        currentTheme === 'dark' ? 'bg-background-dark' : 'bg-background'
      }`}>
        <div className="flex justify-center items-center p-8 w-1/2">
          <div className="w-full max-w-md text-center">
            <div className="flex justify-end mb-4">
              <Button
                type="text"
                icon={<BulbOutlined />}
                onClick={toggleTheme}
                className="text-text-secondary hover:text-text-primary"
              />
            </div>
            
            <h1 className="mb-4 text-3xl font-bold text-text-primary">
              注册申请已提交 ✅
            </h1>
            <p className="mb-8 text-text-secondary">
              管理员审核通过后，即可登录
            </p>
            <Button
              type="primary"
              onClick={() => {
                setShowSuccess(false);
                setMode('login');
              }}
              className="text-white bg-primary hover:bg-primary-light"
            >
              {countdown}秒后返回登录
            </Button>
          </div>
        </div>

        <div className={`w-1/2 relative ${
          currentTheme === 'dark' ? 'bg-background-dark' : 'bg-primary-lighter'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r to-transparent from-primary/10" />
          <Image
            src={currentTheme === 'dark' ? '/login-banner-dark.jpg' : '/login-banner.jpg'}
            alt="Login Banner"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex ${
      currentTheme === 'dark' ? 'bg-background-dark' : 'bg-background'
    }`}>
      {/* 左侧登录区域 */}
      <div className="flex justify-center items-center p-8 w-1/2">
        <div className="w-full max-w-md">
          <div className="flex justify-end mb-4">
            <Button
              type="text"
              icon={<BulbOutlined />}
              onClick={toggleTheme}
              className="text-text-secondary hover:text-text-primary"
            />
          </div>
          
          <h1 className="mb-8 text-3xl font-bold text-center text-text-primary">
            {mode === 'login' ? '欢迎回来' : '创建账号'}
          </h1>

          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            className="space-y-4"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input 
                prefix={<UserOutlined className="text-text-tertiary" />} 
                placeholder="用户名" 
                size="large"
                className="!bg-[#FAFAFA] rounded-xl border-[1px] !border-transparent hover:!border-purple-500 focus:!border-purple-500 !focus:shadow-purple-100 [&.ant-input-status-error]:!border-red-500 [&.ant-input-affix-wrapper-status-error]:!border-red-500" 
              />
            </Form.Item>

            {mode === 'register' && (
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' }
                ]}
              >
                <Input 
                  prefix={<MailOutlined className="text-text-tertiary" />} 
                  placeholder="邮箱" 
                  size="large"
                  className="!bg-[#FAFAFA] rounded-xl border-[1px] !border-transparent hover:!border-purple-500 focus:!border-purple-500 !focus:shadow-purple-100 [&.ant-input-status-error]:!border-red-500 [&.ant-input-affix-wrapper-status-error]:!border-red-500" 
                />
              </Form.Item>
            )}

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password 
                prefix={<LockOutlined className="text-text-tertiary" />} 
                placeholder="密码" 
                size="large"
                className="!bg-[#FAFAFA] rounded-xl border-[1px] !border-transparent hover:!border-purple-500 focus:!border-purple-500 !focus:shadow-purple-100 [&.ant-input-status-error]:!border-red-500 [&.ant-input-affix-wrapper-status-error]:!border-red-500" 
              />
            </Form.Item>
            {mode === 'login' && (
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox className="text-text-secondary">记住我</Checkbox>
              </Form.Item>
            )}

            {mode === 'register' && (
              <Form.Item
                name="privacy"
                valuePropName="checked"
                rules={[{ required: true, message: '请同意用户协议和隐私政策' }]}
              >
                <Checkbox className="text-text-secondary">
                  我已阅读并同意
                  <Button type="link" className="p-0 h-auto" onClick={(e) => {
                    e.preventDefault();
                    window.open('/terms', '_blank');
                  }}>
                    用户协议
                  </Button>
                  和
                  <Button type="link" className="p-0 h-auto" onClick={(e) => {
                    e.preventDefault();
                    window.open('/privacy', '_blank');
                  }}>
                    隐私政策
                  </Button>
                </Checkbox>
              </Form.Item>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
                className="text-white bg-primary hover:bg-primary-light"
              >
                {mode === 'login' ? '登录' : '注册'}
              </Button>
            </Form.Item>

            <Divider className="border-border text-text-tertiary">或</Divider>

            <Button
              icon={<GoogleOutlined />}
              block
              size="large"
              className="flex justify-center items-center hover:border-primary text-text-secondary hover:text-text-primary"
            >
              使用 Google 账号登录
            </Button>

            <div className="text-center">
              <Button 
                type="link" 
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-primary hover:text-primary-light"
              >
                {mode === 'login' ? '没有账号？立即注册' : '已有账号？立即登录'}
              </Button>
            </div>
          </Form>
        </div>
      </div>

      {/* 右侧图片区域 */}
      <div className={`w-1/2 relative ${
        currentTheme === 'dark' ? 'bg-background-dark' : 'bg-primary-lighter'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r to-transparent from-primary/10" />
        <Image
          src={currentTheme === 'dark' ? '/login-banner-dark.jpg' : '/login-banner.jpg'}
          alt="Login Banner"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
    </div>
  );
} 