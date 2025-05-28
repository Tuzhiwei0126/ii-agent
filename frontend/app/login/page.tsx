'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/service/auth';
import { token } from '@/utils/token';
import { Form, Input, Button, Checkbox, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined } from '@ant-design/icons';
import Image from 'next/image';

type LoginMode = 'login' | 'register';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<LoginMode>('login');
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (mode === 'login') {
        const res = await login({ username: values.username, password: values.password });
        token.set(res.token);
        router.push('/');
      } else {
        // TODO: 实现注册逻辑
        message.success('注册成功！');
        setMode('login');
      }
    } catch (err: Error) {
      message.error(err.message || '操作失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* 左侧登录区域 */}
      <div className="w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">
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
              <Input prefix={<UserOutlined />} placeholder="用户名" size="large" />
            </Form.Item>

            {mode === 'register' && (
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="邮箱" size="large" />
              </Form.Item>
            )}

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="密码" size="large" />
            </Form.Item>

            {mode === 'register' && (
              <Form.Item
                name="privacy"
                valuePropName="checked"
                rules={[{ required: true, message: '请同意用户协议' }]}
              >
                <Checkbox>我已阅读并同意用户协议和隐私政策</Checkbox>
              </Form.Item>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
              >
                {mode === 'login' ? '登录' : '注册'}
              </Button>
            </Form.Item>

            <Divider>或</Divider>

            <Button
              icon={<GoogleOutlined />}
              block
              size="large"
              className="flex items-center justify-center"
            >
              使用 Google 账号登录
            </Button>

            <div className="text-center">
              <Button type="link" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
                {mode === 'login' ? '没有账号？立即注册' : '已有账号？立即登录'}
              </Button>
            </div>
          </Form>
        </div>
      </div>

      {/* 右侧图片区域 */}
      <div className="w-1/2 bg-gray-100 relative">
        <Image
          src="/login-banner.jpg"
          alt="Login Banner"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
    </div>
  );
} 