// Test Lemon Squeezy API connection
const fs = require('fs')
const path = require('path')

// Read .env.local
const envPath = path.join(__dirname, 'apps', 'web', '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')

const envVars = {}
envContent.split(/\r?\n/).forEach(line => {
  line = line.trim()
  if (!line || line.startsWith('#')) return
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) {
    envVars[match[1].trim()] = match[2].trim()
  }
})

const apiKey = envVars.LEMONSQUEEZY_API_KEY || envVars.LEMONSQUEEZY_API_KEY
const storeId = envVars.LEMONSQUEEZY_STORE_ID || envVars.LEMONSQUEEZY_STORE_ID
const variantId = envVars.LEMONSQUEEZY_VARIANT_ID || envVars.LEMONSQUEEZY_VARIANT_ID

console.log('\n🔍 Testing Lemon Squeezy API Connection...\n')

if (!apiKey || !storeId || !variantId) {
  console.error('❌ Missing credentials')
  process.exit(1)
}

console.log('✅ API Key:', apiKey.substring(0, 20) + '...')
console.log('✅ Store ID:', storeId)
console.log('✅ Variant ID:', variantId)

// Test API call
async function testCheckout() {
  try {
    const requestBody = {
      data: {
        type: 'checkouts',
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
              id: variantId,
            },
          },
        },
      },
    }

    console.log('\n📤 Making API request...\n')

    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    })

    console.log('Response status:', response.status, response.statusText)

    const data = await response.json()

    if (!response.ok) {
      console.error('\n❌ API Error:\n')
      console.error(JSON.stringify(data, null, 2))
      
      if (data.errors && data.errors.length > 0) {
        console.error('\nError details:', data.errors[0].detail)
      }
      process.exit(1)
    }

    console.log('\n✅ Success! Checkout created:\n')
    console.log('Checkout URL:', data.data.attributes.url)
    console.log('\n🎉 Lemon Squeezy API is working correctly!')
    
  } catch (error) {
    console.error('\n❌ Connection error:', error.message)
    process.exit(1)
  }
}

testCheckout()
