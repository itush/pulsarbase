'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Image as ImageIcon, Video, File } from 'lucide-react'
import type { Asset } from '@/types'
import Link from 'next/link'

interface AssetListProps {
    assets: Asset[]
}

export function AssetList({ assets }: AssetListProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Assets & Files</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
                {assets.length === 0 && (
                    <p className="text-sm text-muted-foreground">No assets uploaded yet.</p>
                )}
                {assets.map((asset) => (
                    <Link
                        key={asset.id}
                        href={asset.file_url}
                        target="_blank"
                        className="flex items-center space-x-4 rounded-md border p-3 hover:bg-muted font-medium text-sm transition-colors"
                    >
                        <FileIcon type={asset.type} />
                        <span className="flex-1 truncate">{asset.name}</span>
                    </Link>
                ))}
            </CardContent>
        </Card>
    )
}

function FileIcon({ type }: { type: string }) {
    switch (type) {
        case 'video':
            return <Video className="h-4 w-4 text-blue-500" />
        case 'design':
            return <ImageIcon className="h-4 w-4 text-pink-500" />
        case 'invoice':
            return <FileText className="h-4 w-4 text-green-500" />
        default:
            return <File className="h-4 w-4 text-muted-foreground" />
    }
}
