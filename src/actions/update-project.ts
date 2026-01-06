'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const UpdateProjectSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    status: z.enum(['active', 'completed', 'paused']),
    total_budget: z.string().optional().nullable(),
})

export async function updateProject(projectId: string, prevState: any, formData: FormData) {
    const supabase = await createClient()

    // Verify authentication
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { message: 'Unauthorized' }
    }

    const validatedFields = UpdateProjectSchema.safeParse({
        name: formData.get('name'),
        status: formData.get('status'),
        total_budget: formData.get('total_budget'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Project.',
        }
    }

    const { name, status, total_budget } = validatedFields.data

    const { error } = await supabase
        .from('projects')
        .update({
            name,
            status,
            total_budget: total_budget ? parseFloat(total_budget) : null,
        })
        .eq('id', projectId)
        .eq('client_id', user.id)

    if (error) {
        console.error('Update Project Error:', error)
        return { message: 'Database Error: Failed to Update Project.' }
    }

    revalidatePath(`/dashboard/projects/${projectId}`)
    revalidatePath('/dashboard')
    return { message: 'success' }
}
