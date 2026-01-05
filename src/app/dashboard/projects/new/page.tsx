import { NewProjectForm } from '@/components/dashboard/new-project-form'

export default function NewProjectPage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-lg font-semibold md:text-2xl">Create New Project</h1>
                <p className="text-sm text-muted-foreground">
                    Fill in the details to start tracking a new project.
                </p>
            </div>
            <div className="max-w-2xl rounded-lg border p-6">
                <NewProjectForm />
            </div>
        </div>
    )
}
