'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { createProject } from '@/actions/create-project'
import { useActionState } from 'react'

const formSchema = z.object({
    name: z.string().min(3, {
        message: 'Project name must be at least 3 characters.',
    }),
    status: z.enum(['active', 'completed', 'paused']),
    total_budget: z.string().optional(),
})

export function NewProjectForm() {
    // We are using a simple client-side wrapper around the Server Action for now
    // or we can just stick to standard form submission if we want progressive enhancement
    // But for better UX with Shadcn Form, we often bind it.

    // Actually, Shadcn Form is best used with onSubmit handler.
    // To mix Server Actions + Shadcn Form (RHF), we usually invoke the action in onSubmit.

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            status: 'active',
            total_budget: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('status', values.status)
        if (values.total_budget) formData.append('total_budget', values.total_budget)

        // We call the server action directly here
        // In a real app we might want to handle loading state/errors better with useTransition
        await createProject({}, formData)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Website Redesign" {...field} />
                            </FormControl>
                            <FormDescription>
                                The public name of the project.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="paused">Paused</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="total_budget"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Budget (USD)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="5000" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Create Project</Button>
            </form>
        </Form>
    )
}
