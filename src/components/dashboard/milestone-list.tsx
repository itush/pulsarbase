'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Circle, Clock } from 'lucide-react'
import type { Milestone } from '@/types'

interface MilestoneListProps {
    milestones: Milestone[]
}

export function MilestoneList({ milestones }: MilestoneListProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Milestones</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                {milestones.length === 0 && (
                    <p className="text-sm text-muted-foreground">No milestones created yet.</p>
                )}
                {milestones.map((milestone) => (
                    <div
                        key={milestone.id}
                        className="flex items-start space-x-4 rounded-md border p-4 transition-all hover:bg-muted/50"
                    >
                        <StatusIcon status={milestone.status} />
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium leading-none">{milestone.title}</p>
                                {milestone.amount && (
                                    <span className="text-sm text-muted-foreground">${milestone.amount}</span>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {milestone.description}
                            </p>
                            <div className="flex items-center gap-2 pt-2">
                                <Badge variant="outline" className="text-xs capitalize">{milestone.status.replace('_', ' ')}</Badge>
                                {milestone.is_approved && (
                                    <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">Approved</Badge>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

function StatusIcon({ status }: { status: string }) {
    if (status === 'completed') {
        return <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500" />
    }
    if (status === 'in_progress') {
        return <Clock className="mt-0.5 h-5 w-5 text-blue-500" />
    }
    return <Circle className="mt-0.5 h-5 w-5 text-muted-foreground" />
}
