import { Component } from '../content/config'

export interface UserAccessContext {
    userId?: string | null
    isPro?: boolean
    plan?: 'FREE' | 'PAID'
}

/**
 * Single source of truth for component access control.
 * 
 * @param component The component to check access for
 * @param user The user context (optional)
 * @returns boolean indicating if the user can access the component
 */
export function canAccessComponent(
    component: { access?: 'free' | 'paid'; isFree?: boolean; category?: string },
    user?: UserAccessContext
): boolean {
    // Free components are available to everyone
    if (component.access === 'free') {
        return true
    }

    // Fallback for backward compatibility if access field is missing but isFree exists
    if (component.access === undefined && component.isFree) {
        return true
    }

    // Pro components require a valid user with Pro status
    if (component.access === 'paid' || component.isFree === false) {
        return !!user?.isPro
    }

    // Default to restricted if we can't determine
    return false
}
