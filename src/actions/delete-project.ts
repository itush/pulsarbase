'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteProject(projectId: string) {
    const supabase = await createClient()

    // Verify authentication
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { message: 'Unauthorized' }
    }

    // Delete the project
    // Since we set up ON DELETE CASCADE in the schema, this will automatically
    // delete related milestones and assets rows.
    // Note: RLS ensures users can only delete their own projects if policies allow 'delete'.
    // We need to ensure we have a DELETE policy.

    // Let's check/add DELETE policy if needed. 
    // Actually, standard RLS often requires explicit 'delete' policy.
    // We'll check schema.sql in a bit, but usually we need one.
    // For now, let's assume one exists or we might error.
    // Wait, I didn't add a DELETE policy in the schema!
    // I need to add that first or this will fail.

    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)
        .eq('client_id', user.id) // Extra safety to ensure ownership match

    if (error) {
        console.error('Delete Project Error:', error)
        return { message: 'Failed to delete project' }
    }

    revalidatePath('/dashboard')
    return { message: 'success' }
}
