import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@gated/database'
import { NextResponse } from 'next/server'

export async function GET() {
    const user = await currentUser()

    if (!user) {
        return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
    }

    try {
        const dbUser = await prisma.user.upsert({
            where: { clerkId: user.id },
            update: {
                email: user.emailAddresses[0]?.emailAddress,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            create: {
                clerkId: user.id,
                email: user.emailAddresses[0]?.emailAddress,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        })

        return NextResponse.json({
            success: true,
            message: 'User synced to Supabase',
            user: dbUser
        })
    } catch (error) {
        console.error('Manual sync failed:', error)
        return NextResponse.json({ error: 'Sync failed', details: String(error) }, { status: 500 })
    }
}
