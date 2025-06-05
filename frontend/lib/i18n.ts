'use client'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// 定义资源
const resources = {
  'zh-CN': {
    translation: {
      explore: {
        apps: {
          allCategories: '全部分类'
        }
      },
      level: {
        junior: '初级',
        middle: '中级', 
        senior: '高级',
        expert: '正高级'
      },
      team: {
        label: '团队'
      }
    }
  },
  en: {
    translation: {
      explore: {
        apps: {
          allCategories: 'All Categories'
        }
      },
      level: {
        junior: 'Junior',
        middle: 'Middle',
        senior: 'Senior', 
        expert: 'Expert'
      },
      team: {
        label: 'Team'
      }
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh-CN',
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false, // React已经安全处理了
    },
    
    react: {
      useSuspense: false, // 防止SSR问题
    },
    
    // 为了防止水合错误，我们在服务端和客户端使用相同的配置
    debug: false,
  })

export default i18n 