'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createAssetRecord(
    projectId: string,
    name: string,
    fileUrl: string,
    type: 'design' | 'document' | 'invoice' | 'video' | 'other'
) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Not authenticated' }
    }

    const { error } = await supabase
        .from('assets')
        .insert({
            project_id: projectId,
            name,
            file_url: fileUrl,
            type
        })

    if (error) {
        console.error('Database Error:', error)
        return { error: 'Failed to create asset record' }
    }

    revalidatePath(`/dashboard/projects/${projectId}`)
    return { success: true }
}
