'use client'

import { signOut } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
    return (
        <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-primary"
            onClick={() => signOut()}
        >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
        </Button>
    )
}
