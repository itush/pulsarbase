import { createClient } from '@/lib/supabase/server'
import { ProjectCard } from '@/components/dashboard/project-card'
import { Button } from '@/components/ui/button'
import { Plus, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Project } from '@/types'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    // Fetch only recent 3 projects for overview
    const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3)

    const typedProjects = (projects as Project[]) || []

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Welcome, Client</h1>
                    <p className="text-muted-foreground">Here&apos;s an overview of your projects.</p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/projects/new">
                        <Plus className="mr-2 h-4 w-4" />
                        New Project
                    </Link>
                </Button>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold tracking-tight">Recent Projects</h2>
                    <Link href="/dashboard/projects" className="text-sm font-medium text-primary hover:underline flex items-center">
                        View All <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {typedProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {typedProjects.length === 0 && (
                    <div className="flex h-[200px] shrink-0 items-center justify-center rounded-md border border-dashed bg-muted/40">
                        <p className="text-sm text-muted-foreground">No active projects found.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
