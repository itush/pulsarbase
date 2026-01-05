import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ProjectHeader } from '@/components/dashboard/project-header'
import { MilestoneList } from '@/components/dashboard/milestone-list'
import { AssetList } from '@/components/dashboard/asset-list'
import { Separator } from '@/components/ui/separator'
import type { Project, Milestone, Asset } from '@/types'

// Correct usage of params handling for Next.js App Router
// In current versions, params is a Promise or object depending on version. 
// Assuming fairly recent Next.js 15+, async params is best practice.
// But create-next-app outputted 15? Let's assume standard params.
// Actually, in strict TS + newer NextJS, we usually define props type carefully.

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { id } = await params
    const supabase = await createClient()

    // 1. Fetch Project
    const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

    if (!project) {
        notFound()
    }

    // 2. Fetch Milestones
    const { data: milestones } = await supabase
        .from('milestones')
        .select('*')
        .eq('project_id', id)
        .order('created_at', { ascending: true })

    // 3. Fetch Assets
    const { data: assets } = await supabase
        .from('assets')
        .select('*')
        .eq('project_id', id)
        .order('created_at', { ascending: false })

    return (
        <div className="flex flex-col gap-6">
            <ProjectHeader project={project as Project} />
            <Separator />

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    {/* Main Content: Milestones (The "Blueprint" Timeline) */}
                    <MilestoneList milestones={(milestones as Milestone[]) || []} />
                </div>
                <div className="md:col-span-1 space-y-6">
                    {/* Sidebar: Assets & Info */}
                    <AssetList assets={(assets as Asset[]) || []} />

                    {/* Could add Team member list or Activity feed here later */}
                </div>
            </div>
        </div>
    )
}
