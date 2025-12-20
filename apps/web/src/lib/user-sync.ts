import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@gated/database'

export async function syncUser() {
    try {
        const user = await currentUser()

        if (!user) {
            return null
        }

        // Upsert ensures we create if missing, or update if exists
        // This makes it idempotent and safe to run on dashboard load
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

        return dbUser
    } catch (error) {
        console.error('Automatic user sync failed:', error)
        // We don't throw here to avoid crashing the dashboard if DB is temporarily down
        // The user just won't be able to access Pro features in that specific moment
        return null
    }
}
