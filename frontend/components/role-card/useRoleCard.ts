import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type LevelType = 'junior' | 'middle' | 'senior' | 'expert'

export const useRoleCard = (app: any) => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [appId, setAppId] = useState('')

  const getLevelType = (): LevelType => {
    const levelMap: Record<string, LevelType> = {
      1: 'junior',
      2: 'middle',
    }
    return levelMap[app.level] || 'junior'
  }

  const getLevelStyle = (type: LevelType) => {
    const styles = {
      junior: {
        bg: 'bg-[#F1F1F1]',
        text: 'text-[#333333]',
      },
      middle: {
        bg: 'bg-[#F0EBFF]',
        text: 'text-[#6B47FF]',
      },
      senior: {
        bg: 'bg-[#F0EBFF]',
        text: 'text-[#6B47FF]',
      },
      expert: {
        bg: 'bg-gradient-to-r from-[#6B48FF] to-[#A18CFF]',
        text: 'text-white',
      },
    }
    return styles[type]
  }

  const getLevelText = (type: LevelType) => {
    const textMap = {
      junior: t('level.junior', '初级'),
      middle: t('level.middle', '中级'),
      senior: t('level.senior', '高级'),
      expert: t('level.expert', '正高级'),
    }
    return textMap[type]
  }

  const levelType = getLevelType()
  const levelStyle = getLevelStyle(levelType)
  const levelText = getLevelText(levelType)

  const openModal = () => {
    setAppId(app.id)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return {
    isModalOpen,
    appId,
    levelType,
    levelStyle,
    levelText,
    openModal,
    closeModal,
  }
}
