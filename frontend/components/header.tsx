import { ThemeToggle } from './theme-toggle'

export function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      {/* 其他头部内容 */}
      <ThemeToggle />
    </header>
  )
} 