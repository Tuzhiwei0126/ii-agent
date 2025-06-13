import React, { useState } from 'react';
import { CommentOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import SettingModal from '../setting';

const FloatMenu: React.FC = () => {
  const [isSettingOpen, setIsSettingOpen] = useState(false)

  return (
    <>
      <style jsx>{`
      :global(.ant-float-btn-body) {
        background-color: #6B47FF !important;
        border-color: #6B47FF !important;
        color: white !important;
      }
      :global(.ant-float-btn-body:hover) {
        background-color: #5A3AD6 !important;
        border-color: #5A3AD6 !important;
        color: white !important;
      }
      :global(.ant-float-btn-body .anticon) {
        color: white !important;
      }
      :global(.ant-float-btn-body:hover .anticon) {
        color: white !important;
      }
    `}</style>
    <FloatButton.Group
      type="default"
      style={{ insetInlineStart: -1820, zIndex: 20}}
      icon={<MenuUnfoldOutlined />}
    >
      <FloatButton icon={<MenuUnfoldOutlined />} onClick={() => setIsSettingOpen(true)} />
    </FloatButton.Group>
    
    <SettingModal 
  isOpen={isSettingOpen} 
  onClose={() => setIsSettingOpen(false)}
  defaultTab="account" // 可选，默认打开的标签页
/>
  </>

);
}

export default FloatMenu;