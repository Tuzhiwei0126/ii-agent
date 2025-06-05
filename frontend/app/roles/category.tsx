'use client'
import type { FC } from 'react'
import React from 'react'
import cn from '@/utils/classnames'
import type { AppCategory } from '@/models/explore'


export type ICategoryProps = {
  className?: string
  list: AppCategory[]
  value: string
  onChange: (value: AppCategory | string) => void
  /**
   * default value for search param 'category' in en
   */
  allCategoriesEn: string
}

const Category: FC<ICategoryProps> = ({
  className,
  list,
  value,
  onChange,
  allCategoriesEn,
}) => {
  const itemClassName = (isSelected: boolean) => cn(
    'flex h-[32px] cursor-pointer items-center rounded-lg border-[0.5px] border-transparent px-3 py-[7px] font-medium leading-[18px] text-gray-700 hover:bg-gray-200',
    isSelected && 'border-gray-200 bg-[#6B48FF33] shadow-xs hover:bg-[#6B48FF33]',
  )

  return (
    <div className={cn(className, 'flex gap-2 text-[18px]')}>
      {list.filter(name => name !== allCategoriesEn).map(name => (
        <div
          key={name}
          className={itemClassName(name === value)}
          onClick={() => onChange(name)}
        >
          { name}
        </div>
      ))}
    </div>
  )
}

export default React.memo(Category)
