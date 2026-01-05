import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, DollarSign, MoreHorizontal } from 'lucide-react'
import type { Project } from '@/types'
import Link from 'next/link'

interface ProjectHeaderProps {
    project: Project
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
                    <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                        {project.status}
                    </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Started {new Date(project.created_at).toLocaleDateString()}</span>
                    </div>
                    {project.total_budget && (
                        <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{project.total_budget} Budget</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Edit Project</Button>
                <Button size="sm">Add Milestone</Button>
            </div>
        </div>
    )
}
