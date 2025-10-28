/**
 * Lemon Squeezy API Integration
 */

const LEMONSQUEEZY_API_URL = 'https://api.lemonsqueezy.com/v1'

interface CheckoutOptions {
  variantId: string
  customData?: Record<string, string>
  checkoutData?: {
    email?: string
    name?: string
    custom?: Record<string, string>
  }
  redirectUrl?: string
}

interface CreateCheckoutResponse {
  data: {
    id: string
    type: string
    attributes: {
      url: string
      store_id: number
      variant_id: number
      custom_price: number | null
      [key: string]: any
    }
  }
}

/**
 * Create a checkout session with Lemon Squeezy
 */
export async function createCheckoutSession(
  options: CheckoutOptions
): Promise<string> {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY || process.env.LEMONSQUEEZY_API_KEY
  const storeIdStr = process.env.LEMONSQUEEZY_STORE_ID || process.env.LEMONSQUEEZY_STORE_ID

  if (!apiKey || !storeIdStr) {
    console.error('Missing Lemon Squeezy configuration:', {
      hasApiKey: !!apiKey,
      hasStoreId: !!storeIdStr,
    })
    throw new Error('Missing Lemon Squeezy configuration. Please check LEMONSQUEEZY_API_KEY and LEMONSQUEEZY_STORE_ID environment variables.')
  }

  // Validate that values are not placeholder
  if (storeIdStr === 'xxx' || apiKey.includes('xxx')) {
    throw new Error('Lemon Squeezy credentials are not configured. Please update your .env file with valid API credentials.')
  }

  // Convert store ID to string (Lemon Squeezy API expects string)
  const storeId = storeIdStr.toString()

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const redirectUrl = options.redirectUrl || `${appUrl}/dashboard?upgrade=success`

  console.log('Creating Lemon Squeezy checkout with:', {
    storeId,
    variantId: options.variantId,
    redirectUrl,
    email: options.checkoutData?.email,
  })

  try {
    // Lemon Squeezy API format - only include attributes if we have data
    const attributes: any = {}
    
    // Add checkout data if provided
    if (options.checkoutData) {
      attributes.checkout_data = {}
      if (options.checkoutData.email) {
        attributes.checkout_data.email = options.checkoutData.email
      }
      if (options.checkoutData.name) {
        attributes.checkout_data.name = options.checkoutData.name
      }
      if (options.checkoutData.custom) {
        attributes.checkout_data.custom = options.checkoutData.custom
      }
    }
    
    // Add product options with redirect
    attributes.product_options = {
      redirect_url: redirectUrl,
    }

    const requestBody = {
      data: {
        type: 'checkouts',
        ...(Object.keys(attributes).length > 0 && { attributes }),
        relationships: {
          store: {
            data: {
              type: 'stores',
              id: storeId,
            },
          },
          variant: {
            data: {
              type: 'variants',
              id: options.variantId,
            },
          },
        },
      },
    }

    console.log('Lemon Squeezy request body:', JSON.stringify(requestBody, null, 2))

    const response = await fetch(`${LEMONSQUEEZY_API_URL}/checkouts`, {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Lemon Squeezy API error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      })
      
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`
      try {
        const errorJson = JSON.parse(errorText)
        if (errorJson.errors && errorJson.errors.length > 0) {
          errorMessage = errorJson.errors[0].detail || errorMessage
        }
      } catch (e) {
        // Error text is not JSON, use default message
      }
      
      throw new Error(`Failed to create checkout: ${errorMessage}`)
    }

    const data: CreateCheckoutResponse = await response.json()
    console.log('Lemon Squeezy response:', JSON.stringify(data, null, 2))
    
    if (!data.data?.attributes?.url) {
      throw new Error('No checkout URL in response')
    }
    
    return data.data.attributes.url
  } catch (error) {
    console.error('Error creating checkout:', error)
    throw error
  }
}

/**
 * Verify a Lemon Squeezy webhook signature
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string | null
): boolean {
  if (!signature) return false
  
  const crypto = require('crypto')
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || process.env.LEMONSQUEEZY_WEBHOOK_SECRET
  
  if (!secret) return false

  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(payload).digest('hex')
  
  return signature === digest
}

/**
 * Map Lemon Squeezy subscription status to our internal status
 */
export function mapSubscriptionStatus(status: string): string {
  const statusMap: Record<string, string> = {
    'active': 'ACTIVE',
    'cancelled': 'CANCELLED',
    'expired': 'EXPIRED',
    'past_due': 'PAST_DUE',
    'paused': 'PAUSED',
    'on_trial': 'ACTIVE', // Treat trial as active
  }
  
  return statusMap[status] || 'ACTIVE'
}

/**
 * Extract user ID from Lemon Squeezy webhook custom data
 */
export function extractUserIdFromWebhook(data: any): string | null {
  // Check multiple possible locations for user_id
  // Order webhooks vs subscription webhooks have different structures
  return (
    data.attributes?.custom_data?.user_id ||
    data.meta?.custom_data?.user_id ||
    data.attributes?.user_id ||
    data.meta?.user_id ||
    null
  )
}
