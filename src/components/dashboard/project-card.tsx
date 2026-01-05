import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, DollarSign } from 'lucide-react'
import Link from 'next/link'
import type { Project } from '@/types'

interface ProjectCardProps {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between space-x-4">
                    <CardTitle className="text-base font-medium">{project.name}</CardTitle>
                    <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                        {project.status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(project.created_at).toLocaleDateString()}
                    </div>
                    {project.total_budget && (
                        <div className="flex items-center">
                            <DollarSign className="mr-1 h-3 w-3" />
                            {project.total_budget}
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full" variant="outline">
                    <Link href={`/dashboard/projects/${project.id}`}>View Project</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
