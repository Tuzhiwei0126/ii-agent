"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RiSendPlaneFill } from "@remixicon/react";

interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'number' | 'email' | 'url';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  defaultValue?: string | number | boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
}

interface FormConfig {
  title?: string;
  description?: string;
  fields: FormField[];
  submitButton?: {
    text: string;
    variant?: 'default' | 'secondary' | 'outline';
  };
}

interface DynamicFormProps {
  formConfig: FormConfig;
  onSubmit: (formData: Record<string, string | number | boolean>) => void;
  isSubmitting?: boolean;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  formConfig,
  onSubmit,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState<Record<string, string | number | boolean>>(() => {
    const initialData: Record<string, string | number | boolean> = {};
    formConfig.fields.forEach(field => {
      if (field.defaultValue !== undefined) {
        initialData[field.id] = field.defaultValue;
      } else if (field.type === 'checkbox') {
        initialData[field.id] = false;
      } else {
        initialData[field.id] = '';
      }
    });
    return initialData;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (fieldId: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    // 清除错误信息
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateField = (field: FormField, value: string | number | boolean): string | null => {
    if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return `${field.label}为必填项`;
    }

    if (field.validation) {
      const { min, max, pattern, minLength, maxLength } = field.validation;
      
      if (typeof value === 'string') {
        if (minLength && value.length < minLength) {
          return `${field.label}最少需要${minLength}个字符`;
        }
        if (maxLength && value.length > maxLength) {
          return `${field.label}最多允许${maxLength}个字符`;
        }
        if (pattern && !new RegExp(pattern).test(value)) {
          return `${field.label}格式不正确`;
        }
      }
      
      if (typeof value === 'number') {
        if (min !== undefined && value < min) {
          return `${field.label}不能小于${min}`;
        }
        if (max !== undefined && value > max) {
          return `${field.label}不能大于${max}`;
        }
      }
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证所有字段
    const newErrors: Record<string, string> = {};
    formConfig.fields.forEach(field => {
      const error = validateField(field, formData[field.id]);
      if (error) {
        newErrors[field.id] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const renderField = (field: FormField) => {
    const value = formData[field.id];
    const error = errors[field.id];

    const baseInputClass = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
      error ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
    }`;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'url':
        return (
          <input
            type={field.type}
            id={field.id}
            value={value || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={baseInputClass}
            required={field.required}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            id={field.id}
            value={value || ''}
            onChange={(e) => handleInputChange(field.id, parseFloat(e.target.value) || '')}
            placeholder={field.placeholder}
            className={baseInputClass}
            required={field.required}
            min={field.validation?.min}
            max={field.validation?.max}
          />
        );

      case 'textarea':
        return (
          <textarea
            id={field.id}
            value={value || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={`${baseInputClass} min-h-[100px] resize-y`}
            required={field.required}
            minLength={field.validation?.minLength}
            maxLength={field.validation?.maxLength}
          />
        );

      case 'select':
        return (
          <select
            id={field.id}
            value={value || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={baseInputClass}
            required={field.required}
          >
            <option value="">请选择...</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              id={field.id}
              checked={value || false}
              onChange={(e) => handleInputChange(field.id, e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              required={field.required}
            />
            <span className="text-sm text-gray-700">{field.label}</span>
          </label>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map(option => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={field.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  required={field.required}
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/95 backdrop-blur-sm border border-purple-200 rounded-lg p-6 shadow-lg"
    >
      {formConfig.title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {formConfig.title}
        </h3>
      )}
      
      {formConfig.description && (
        <p className="text-gray-600 mb-4 text-sm">
          {formConfig.description}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {formConfig.fields.map(field => (
          <div key={field.id} className="space-y-1">
            {field.type !== 'checkbox' && (
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}
            
            {renderField(field)}
            
            {errors[field.id] && (
              <p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>
            )}
          </div>
        ))}

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                提交中...
              </>
            ) : (
              <>
                <RiSendPlaneFill className="w-4 h-4" />
                {formConfig.submitButton?.text || '提交'}
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default DynamicForm; 