'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { createAssetRecord } from '@/actions/asset'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Upload, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface UploadAssetDialogProps {
    projectId: string
}

export function UploadAssetDialog({ projectId }: UploadAssetDialogProps) {
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [type, setType] = useState<string>('other')
    const [isUploading, setIsUploading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    async function handleUpload() {
        if (!file) {
            toast.error('Please select a file')
            return
        }

        setIsUploading(true)

        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${projectId}/${fileName}`

            // Upload file to Supabase Storage
            const { data, error: uploadError } = await supabase.storage
                .from('assets')
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('assets')
                .getPublicUrl(filePath)

            // Create record in database
            const result = await createAssetRecord(
                projectId,
                file.name,
                publicUrl,
                type as any
            )

            if (result.error) {
                throw new Error(result.error)
            }

            toast.success('Asset uploaded successfully')
            setOpen(false)
            setFile(null)
            router.refresh()
        } catch (error: any) {
            console.error('Upload Error:', error)
            toast.error(error.message || 'Failed to upload asset')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Asset
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload Asset</DialogTitle>
                    <DialogDescription>
                        Add a new file or design to this project.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="file">File</Label>
                        <Input
                            id="file"
                            type="file"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="type">Type</Label>
                        <Select onValueChange={setType} defaultValue={type}>
                            <SelectTrigger id="type">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="design">Design</SelectItem>
                                <SelectItem value="document">Document</SelectItem>
                                <SelectItem value="invoice">Invoice</SelectItem>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleUpload} disabled={isUploading || !file}>
                        {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Upload
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
