import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@gated/database'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload = headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400,
        })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET)

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error occured', {
            status: 400,
        })
    }

    // Get the ID and type
    const { id } = evt.data
    const eventType = evt.type

    console.log(`Webhook with and ID of ${id} and type of ${eventType}`)

    switch (eventType) {
        case 'user.created':
            try {
                await prisma.user.upsert({
                    where: { clerkId: evt.data.id },
                    update: {
                        email: evt.data.email_addresses[0].email_address,
                        firstName: evt.data.first_name,
                        lastName: evt.data.last_name,
                    },
                    create: {
                        clerkId: evt.data.id,
                        email: evt.data.email_addresses[0].email_address,
                        firstName: evt.data.first_name,
                        lastName: evt.data.last_name,
                    },
                })
                console.log(`User created (or updated via upsert): ${evt.data.id}`)
            } catch (error) {
                console.error('Error creating/updating user in DB:', error)
                return NextResponse.json({ error: 'Error processing user event' }, { status: 500 })
            }
            break

        case 'user.updated':
            try {
                await prisma.user.update({
                    where: { clerkId: evt.data.id },
                    data: {
                        email: evt.data.email_addresses[0].email_address,
                        firstName: evt.data.first_name,
                        lastName: evt.data.last_name,
                    },
                })
                console.log(`User updated: ${evt.data.id}`)
            } catch (error) {
                console.error('Error updating user in DB:', error)
                return NextResponse.json({ error: 'Error updating user' }, { status: 500 })
            }
            break

        case 'user.deleted':
            try {
                await prisma.user.delete({
                    where: { clerkId: evt.data.id },
                })
                console.log(`User deleted: ${evt.data.id}`)
            } catch (error) {
                console.error('Error deleting user in DB:', error)
                return NextResponse.json({ error: 'Error deleting user' }, { status: 500 })
            }
            break

        default:
            console.log(`Unhandled event type: ${eventType}`)
    }

    return new Response('', { status: 200 })
}
