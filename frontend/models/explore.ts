export interface Character {
  id: string
  name: string
  title: string
  avatar_middle_url: string
}

export interface Team {
  id: string
  name: string
  description: string
}

export interface App {
  id: string
  name: string
  title: string
  description: string
  level: string | number
  avatar_url?: string
  team: Team
  characters: Character[]
}

export interface UserProfile {
  id: string
  name: string
  email: string
  [key: string]: string | number | boolean | null | undefined
}

export type AppCategory = string 