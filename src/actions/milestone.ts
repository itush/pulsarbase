'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const CreateMilestoneSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string().min(3, 'Title is required'),
  description: z.string().optional(),
  amount: z.string().optional(), // Receive as string, parse to number
  due_date: z.string().optional(), // Receive as date string
  status: z.enum(['pending', 'in_progress', 'completed']),
})

export type MilestoneState = {
  errors?: {
    title?: string[]
    description?: string[]
    amount?: string[]
    due_date?: string[]
    status?: string[]
    _form?: string[]
  }
  message?: string | null
}

export async function createMilestone(prevState: MilestoneState, formData: FormData) {
  const rawData = {
    projectId: formData.get('projectId'),
    title: formData.get('title'),
    description: formData.get('description'),
    amount: formData.get('amount'),
    due_date: formData.get('due_date'),
    status: formData.get('status'),
  }

  const validatedFields = CreateMilestoneSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Milestone.',
    }
  }

  const { projectId, title, description, amount, due_date, status } = validatedFields.data

  const supabase = await createClient()

  const { error } = await supabase.from('milestones').insert({
    project_id: projectId,
    title,
    description,
    amount: amount ? parseFloat(amount) : null,
    due_date: due_date ? new Date(due_date).toISOString() : null,
    status,
  })

  if (error) {
    console.error('Database Error:', error)
    return {
      message: 'Database Error: Failed to Create Milestone.',
    }
  }

  revalidatePath(`/dashboard/projects/${projectId}`)
  return { message: 'success' }
}
