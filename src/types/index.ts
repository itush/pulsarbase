export type Role = 'admin' | 'client'

export interface Profile {
  id: string
  email: string
  role: Role
  full_name?: string
  avatar_url?: string
  created_at: string
}

export type ProjectStatus = 'active' | 'completed' | 'paused'

export interface Project {
  id: string
  client_id: string
  name: string
  status: ProjectStatus
  start_date: string
  currency: string
  total_budget?: number
  created_at: string
}

export type MilestoneStatus = 'pending' | 'in_progress' | 'completed'

export interface Milestone {
  id: string
  project_id: string
  title: string
  description?: string
  status: MilestoneStatus
  amount?: number
  is_approved: boolean
  approved_at?: string
  due_date?: string
  created_at: string
}

export type AssetType = 'design' | 'document' | 'invoice' | 'video' | 'other'

export interface Asset {
  id: string
  project_id: string
  name: string
  file_url: string
  type: AssetType
  created_at: string
}
