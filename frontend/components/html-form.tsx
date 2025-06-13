"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RiSendPlaneFill, RiCheckLine } from "@remixicon/react";
import { Languages } from "lucide-react";

interface HtmlFormProps {
  htmlContent: string;
  onSubmit: (formData: Record<string, unknown>) => void;
  isSubmitting?: boolean;
}

const HtmlForm: React.FC<HtmlFormProps> = ({
  htmlContent,
  onSubmit,
  isSubmitting = false,
}) => {
  const formRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [showAutoSubmitWarning, setShowAutoSubmitWarning] = React.useState(true);

  // 默认表单数据
  const defaultFormData: Record<string, string> = {
    Languages: "zh",
    message: ""
  };

  useEffect(() => {
    // 清除之前的定时器
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 设置5秒后自动提交的定时器
    timerRef.current = setTimeout(() => {
      if (!isSubmitting) {
        onSubmit(defaultFormData);
      }
    }, 10000);

    // 组件卸载时清除定时器
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isSubmitting, onSubmit]);

  // 3秒后隐藏提示信息
  useEffect(() => {
    const warningTimer = setTimeout(() => {
      setShowAutoSubmitWarning(false);
    }, 3000);

    return () => clearTimeout(warningTimer);
  }, []);

  useEffect(() => {
    if (formRef.current) {
      // 安全地设置HTML内容
      formRef.current.innerHTML = htmlContent;
      
      // 为所有表单元素添加事件监听器
      const formElement = formRef.current.querySelector('form');
      if (formElement) {
        const inputs = formElement.querySelectorAll('input, select, textarea');
        
        inputs.forEach((input) => {
          const element = input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
          
          // 如果已提交，设置为只读
          if (isSubmitting) {
            element.disabled = true;
            element.classList.add('submitted-state');
          } else {
            element.classList.remove('submitted-state');
          }
        });
        
        // 防止表单默认提交
        formElement.addEventListener('submit', (e) => {
          e.preventDefault();
        });
      }
    }
  }, [htmlContent, isSubmitting]);

  const handleSubmit = () => {
    // 收集所有表单数据
    const currentFormData: Record<string, string> = {};
    
    if (formRef.current) {
      const formElement = formRef.current.querySelector('form');
      if (formElement) {
        const inputs = formElement.querySelectorAll('input, select, textarea');
        
        inputs.forEach((input) => {
          const element = input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
          if (element.name) {
            if (element.type === 'checkbox') {
              const checkbox = element as HTMLInputElement;
              currentFormData[element.name] = checkbox.checked ? checkbox.value : '';
            } else if (element.type === 'radio') {
              const radio = element as HTMLInputElement;
              if (radio.checked) {
                currentFormData[element.name] = radio.value;
              }
            } else {
              currentFormData[element.name] = element.value;
            }
          }
        });
      }
    }
    
    onSubmit(currentFormData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="overflow-hidden relative p-6 bg-gradient-to-br from-white via-white rounded-2xl border shadow-xl backdrop-blur-xl to-purple-50/30 border-purple-200/60 shadow-purple-500/10"
    >
      {/* 装饰性背景 */}
      <div className="absolute inset-0 bg-gradient-to-br via-transparent pointer-events-none from-purple-500/5 to-blue-500/5" />
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br to-transparent rounded-bl-full pointer-events-none from-purple-400/10" />
      
      {/* 渲染HTML表单 */}
      <div className="relative z-10">
        {showAutoSubmitWarning && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 mb-4 text-sm text-amber-700 bg-amber-50 rounded-lg border border-amber-200"
          >
            <div className="flex gap-2 items-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>若5秒内未进行操作，系统将自动采用通用模式提交</span>
            </div>
          </motion.div>
        )}
        <div 
          ref={formRef}
          className="space-y-4 html-form-container"
        />
        
        {/* 提交按钮区域 */}
        <motion.div 
          className="flex justify-end pt-4 mt-6 from-transparent to-transparent border-t border-gradient-to-r via-purple-200/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isSubmitting ? (
            <motion.div 
              className="flex gap-3 items-center px-6 py-3 text-sm font-medium text-emerald-700 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border shadow-lg border-emerald-200/60 shadow-emerald-500/10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.3 }}
            >
              <div className="relative">
                <RiCheckLine className="w-5 h-5" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-emerald-400/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              表单已提交
            </motion.div>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex overflow-hidden relative gap-3 items-center px-8 py-3 font-medium text-white bg-gradient-to-r from-purple-600 via-purple-700 to-violet-700 rounded-xl shadow-lg transition-all duration-300 transform group hover:from-purple-700 hover:via-purple-800 hover:to-violet-800 shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <RiSendPlaneFill className="w-5 h-5 text-white transition-transform group-hover:translate-x-1" />
              <span className="text-white">提交表单</span>
            </Button>
          )}
        </motion.div>
      </div>
      
      <style jsx global>{`
        /* 输入框基础字体样式 */
        .html-form-container input,
        .html-form-container select,
        .html-form-container textarea {
          width: 100% !important;
          padding: 10px 14px !important;
          border: 1px solid transparent !important;
          border-radius: 10px !important;
          font-family: 
            'SF Pro Text',
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            'PingFang SC',
            'Source Han Sans CN',
            'Roboto',
            sans-serif !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          line-height: 1.3 !important;
          letter-spacing: 0.01em !important;
          color: #1f2937 !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          background: linear-gradient(135deg, #ffffff, #fafbff) !important;
          background-clip: padding-box !important;
          box-shadow: 
            0 1px 2px rgba(0, 0, 0, 0.05),
            0 2px 4px rgba(139, 92, 246, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.6) !important;
          position: relative !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
          outline: none !important;
        }

        /* 输入框边框渐变效果 */
        .html-form-container input,
        .html-form-container select,
        .html-form-container textarea {
          border: 2px solid transparent !important;
          background-image: linear-gradient(white, white), linear-gradient(135deg, #e5e7eb, #f3f4f6, #e5e7eb) !important;
          background-origin: border-box !important;
          background-clip: padding-box, border-box !important;
        }

        /* 悬停效果 */
        .html-form-container input:hover:not(:focus):not(.submitted-state),
        .html-form-container select:hover:not(:focus):not(.submitted-state),
        .html-form-container textarea:hover:not(:focus):not(.submitted-state) {
          transform: translateY(-2px) !important;
          background-image: linear-gradient(white, white), linear-gradient(135deg, #f3f4f6, #f8faff) !important;
          color: #111827 !important;
          font-weight: 520 !important;
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.08),
            0 8px 24px rgba(139, 92, 246, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;
        }

        /* 聚焦效果 */
        .html-form-container input:focus,
        .html-form-container select:focus,
        .html-form-container textarea:focus {
          outline: none !important;
          transform: translateY(-3px) scale(1.01) !important;
          background-image: linear-gradient(white, white), linear-gradient(135deg, #8b5cf6, #6366f1, #a855f7) !important;
          color: #111827 !important;
          font-weight: 550 !important;
          box-shadow: 
            0 0 0 4px rgba(139, 92, 246, 0.15),
            0 8px 25px rgba(139, 92, 246, 0.2),
            0 16px 40px rgba(139, 92, 246, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 1) !important;
        }

        /* 文本输入框特殊样式 */
        .html-form-container input[type="text"],
        .html-form-container input[type="email"],
        .html-form-container input[type="password"],
        .html-form-container input[type="number"],
        .html-form-container input[type="tel"],
        .html-form-container input[type="url"] {
          padding-left: 36px !important;
          background-image: 
            linear-gradient(white, white),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238b5cf6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'%3E%3C/path%3E%3C/svg%3E") !important;
          background-repeat: no-repeat, no-repeat !important;
          background-position: center, 10px center !important;
          background-size: cover, 14px 14px !important;
        }
        
        /* 字体基础设置 */
        .html-form-container {
          font-family: 
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            'PingFang SC',
            'Hiragino Sans GB',
            'Microsoft YaHei',
            'Helvetica Neue',
            Helvetica,
            Arial,
            sans-serif !important;
          font-feature-settings: 
            'liga' 1,
            'kern' 1,
            'calt' 1,
            'ss01' 1 !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
          text-rendering: optimizeLegibility !important;
        }
        
        .html-form-container h3 {
          margin: 0 0 20px 0 !important;
          font-size: 18px !important;
          line-height: 1.2 !important;
        }
        
        .html-form-container h4 {
          margin: 0 0 16px 0 !important;
          font-size: 16px !important;
          line-height: 1.3 !important;
        }
        
        .html-form-container h5, .html-form-container h6 {
          margin: 0 0 12px 0 !important;
          font-size: 14px !important;
          line-height: 1.4 !important;
        }
        
        .html-form-container p {
          margin: 0 0 12px 0 !important;
          font-size: 13px !important;
          line-height: 1.4 !important;
        }
        
        .html-form-container label {
          display: block !important;
          margin-bottom: 6px !important;
          font-family: inherit !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          line-height: 1.3 !important;
          letter-spacing: 0.01em !important;
          color: #374151 !important;
          position: relative !important;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.04) !important;
        }
        
        .html-form-container label::before {
          content: '' !important;
          position: absolute !important;
          left: -12px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          width: 3px !important;
          height: 14px !important;
          background: linear-gradient(135deg, #8b5cf6, #6366f1) !important;
          border-radius: 2px !important;
          opacity: 0.8 !important;
        }
        
        /* 文本域特殊样式 */
        .html-form-container textarea {
          resize: vertical !important;
          min-height: 80px !important;
          padding: 10px 14px !important;
          line-height: 1.5 !important;
          font-family: 
            'SF Mono',
            'Monaco',
            'Cascadia Code',
            'Roboto Mono',
            'Consolas',
            'Courier New',
            monospace !important;
          font-size: 13px !important;
          font-weight: 450 !important;
          letter-spacing: 0.01em !important;
          word-spacing: 0.1em !important;
        }
        
        /* 已提交状态 */
        .html-form-container .submitted-state {
          background: linear-gradient(135deg, #f3f4f6, #f9fafb) !important;
          border-color: #d1d5db !important;
          color: #6b7280 !important;
          font-weight: 400 !important;
          cursor: not-allowed !important;
          opacity: 0.8 !important;
          transform: none !important;
          box-shadow: 
            0 1px 3px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
        }
        
        .html-form-container .submitted-state::before {
          background: linear-gradient(135deg, #d1d5db, #e5e7eb) !important;
        }
        
        /* Placeholder样式 */
        .html-form-container input::placeholder,
        .html-form-container textarea::placeholder {
          color: #9ca3af !important;
          font-weight: 400 !important;
          font-style: italic !important;
          font-size: 15px !important;
          letter-spacing: 0.005em !important;
          opacity: 0.85 !important;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.04) !important;
        }
        
        .html-form-container input:focus::placeholder,
        .html-form-container textarea:focus::placeholder {
          color: #c4b5fd !important;
          font-weight: 350 !important;
          transform: translateX(4px) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          opacity: 0.7 !important;
        }
        
        /* Checkbox和Radio按钮样式 */
        .html-form-container input[type="checkbox"],
        .html-form-container input[type="radio"] {
          width: 20px !important;
          height: 20px !important;
          margin-right: 12px !important;
          transform: scale(1) !important;
          accent-color: #8b5cf6 !important;
          cursor: pointer !important;
          position: relative !important;
          background: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          font-size: inherit !important;
        }
        
        .html-form-container input[type="checkbox"]:checked,
        .html-form-container input[type="radio"]:checked {
          background: linear-gradient(135deg, #8b5cf6, #6366f1) !important;
          border-color: #8b5cf6 !important;
          box-shadow: 
            0 0 0 3px rgba(139, 92, 246, 0.2),
            0 2px 4px rgba(139, 92, 246, 0.3) !important;
        }
        
        /* 表单字段容器 */
        .html-form-container div[style*="margin-bottom"] {
          margin-bottom: 16px !important;
          position: relative !important;
        }
        
        /* 错误状态样式 */
        .html-form-container input:invalid:not(:placeholder-shown),
        .html-form-container select:invalid:not(:placeholder-shown),
        .html-form-container textarea:invalid:not(:placeholder-shown) {
          border-color: #ef4444 !important;
          color: #dc2626 !important;
          font-weight: 520 !important;
          box-shadow: 
            0 0 0 3px rgba(239, 68, 68, 0.1),
            0 1px 3px rgba(239, 68, 68, 0.2) !important;
        }
        
        /* 成功状态样式 */
        .html-form-container input:valid:not(:placeholder-shown),
        .html-form-container select:valid:not(:placeholder-shown),
        .html-form-container textarea:valid:not(:placeholder-shown) {
          border-color: #10b981 !important;
          color: #059669 !important;
          font-weight: 520 !important;
          box-shadow: 
            0 0 0 2px rgba(16, 185, 129, 0.1),
            0 1px 3px rgba(16, 185, 129, 0.15) !important;
        }
        
        /* 特殊文本样式 */
        .html-form-container small {
          font-family: inherit !important;
          font-size: 13px !important;
          font-weight: 400 !important;
          line-height: 1.4 !important;
          letter-spacing: 0.005em !important;
          color: #9ca3af !important;
          opacity: 0.9 !important;
        }
        
        .html-form-container strong, .html-form-container b {
          font-weight: 700 !important;
          color: #374151 !important;
          letter-spacing: -0.005em !important;
        }
        
        .html-form-container em, .html-form-container i {
          font-style: italic !important;
          color: #6b7280 !important;
          font-weight: 450 !important;
        }
        
        /* 响应式字体设计 */
        @media (max-width: 768px) {
          .html-form-container h3 {
            font-size: 22px !important;
            line-height: 1.25 !important;
            margin-bottom: 24px !important;
          }
          
          .html-form-container label {
            font-size: 14px !important;
            line-height: 1.5 !important;
          }
          
          .html-form-container input,
          .html-form-container select,
          .html-form-container textarea {
            padding: 16px 18px !important;
            font-size: 16px !important;
            line-height: 1.4 !important;
          }
          
          .html-form-container input[type="text"],
          .html-form-container input[type="email"],
          .html-form-container input[type="password"],
          .html-form-container input[type="number"],
          .html-form-container input[type="tel"],
          .html-form-container input[type="url"] {
            padding-left: 46px !important;
          }
          
          .html-form-container select {
            padding-left: 46px !important;
            padding-right: 46px !important;
          }
          
          .html-form-container textarea {
            padding: 18px 18px !important;
            min-height: 120px !important;
          }
        }
        
        @media (max-width: 480px) {
          .html-form-container h3 {
            font-size: 20px !important;
          }
          
          .html-form-container input,
          .html-form-container select,
          .html-form-container textarea {
            font-size: 16px !important;
            padding: 14px 16px !important;
          }
          
          .html-form-container input[type="text"],
          .html-form-container input[type="email"],
          .html-form-container input[type="password"],
          .html-form-container input[type="number"],
          .html-form-container input[type="tel"],
          .html-form-container input[type="url"] {
            padding-left: 42px !important;
          }
          
          .html-form-container select {
            padding-left: 42px !important;
            padding-right: 42px !important;
          }
        }
        
        /* 高DPI屏幕优化 */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .html-form-container {
            -webkit-font-smoothing: subpixel-antialiased !important;
          }
          
          .html-form-container input,
          .html-form-container select,
          .html-form-container textarea {
            -webkit-font-smoothing: subpixel-antialiased !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default HtmlForm;

 