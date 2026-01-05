import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { Package2 } from "lucide-react"

export default function LoginPage() {
    return (
        <div className="flex min-h-screen w-full flex-col justify-center gap-6 py-12 px-4 sm:px-6 lg:px-8 bg-muted/40 transition-colors">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="flex justify-center flex-col items-center gap-2">
                    <div className="flex items-center gap-2 font-bold text-2xl">
                        <Package2 className="h-8 w-8 text-primary" />
                        <span>Pulsarbase</span>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
                        Sign in to your account
                    </h2>
                </Link>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-[400px]">
                <div className="bg-card px-4 py-8 shadow-sm ring-1 ring-border sm:rounded-lg sm:px-10">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
