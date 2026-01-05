'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const CreateProjectSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    status: z.enum(['active', 'completed', 'paused']),
    total_budget: z.string().optional(), // Receive as string from input, convert later
    start_date: z.date().optional(),
})

export type CreateProjectState = {
    errors?: {
        name?: string[]
        status?: string[]
        total_budget?: string[]
        start_date?: string[]
        _form?: string[]
    }
    message?: string | null
}

export async function createProject(prevState: CreateProjectState, formData: FormData) {
    const validatedFields = CreateProjectSchema.safeParse({
        name: formData.get('name'),
        status: formData.get('status'),
        total_budget: formData.get('total_budget'),
        start_date: formData.get('start_date') ? new Date(formData.get('start_date') as string) : undefined,
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Project.',
        }
    }

    const { name, status, total_budget, start_date } = validatedFields.data

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return {
            message: 'User not authenticated',
        }
    }

    // Get Profile ID (assuming 1:1 map, but RLS uses auth.uid(), so we just need that)
    // Our table 'projects' uses client_id referencing profiles.id which references auth.users.id
    // So client_id IS user.id

    const { error } = await supabase.from('projects').insert({
        name,
        status,
        client_id: user.id,
        start_date: start_date ? start_date.toISOString() : new Date().toISOString(),
        total_budget: total_budget ? parseFloat(total_budget) : null,
        currency: 'USD'
    })

    if (error) {
        console.error('Database Error:', error)
        return {
            message: 'Database Error: Failed to Create Project.',
        }
    }

    revalidatePath('/dashboard')
    return { message: 'success' }
}
