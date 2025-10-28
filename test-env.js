// Quick test to verify Lemon Squeezy environment variables
const fs = require('fs')
const path = require('path')

console.log('\n🔍 Checking Lemon Squeezy Configuration...\n')

// Read .env.local file
const envPath = path.join(__dirname, 'apps', 'web', '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')

// Parse env variables (handle both \n and \r\n)
const envVars = {}
envContent.split(/\r?\n/).forEach(line => {
  // Skip comments and empty lines
  line = line.trim()
  if (!line || line.startsWith('#')) return
  
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) {
    const key = match[1].trim()
    const value = match[2].trim()
    envVars[key] = value
  }
})

const config = {
  'API Key': envVars.LEMONSQUEEZY_API_KEY || envVars.LEMONSQUEEZY_API_KEY,
  'Store ID': envVars.LEMONSQUEEZY_STORE_ID || envVars.LEMONSQUEEZY_STORE_ID,
  'Variant ID': envVars.LEMONSQUEEZY_VARIANT_ID || envVars.LEMONSQUEEZY_VARIANT_ID,
  'Webhook Secret': envVars.LEMONSQUEEZY_WEBHOOK_SECRET || envVars.LEMONSQUEEZY_WEBHOOK_SECRET,
}

let allGood = true

for (const [key, value] of Object.entries(config)) {
  const status = value && value !== 'xxx' ? '✅' : '❌'
  const display = value 
    ? (value.length > 50 ? value.substring(0, 47) + '...' : value)
    : 'MISSING'
  
  console.log(`${status} ${key}: ${display}`)
  
  if (!value || value === 'xxx') {
    allGood = false
  }
}

console.log('\n' + '='.repeat(50))

if (allGood) {
  console.log('✅ All credentials configured correctly!')
  console.log('\nNext steps:')
  console.log('1. Restart your dev server if running')
  console.log('2. Sign in to your app')
  console.log('3. Click "Upgrade to Pro"')
  console.log('4. Should redirect to Lemon Squeezy checkout')
} else {
  console.log('❌ Some credentials are missing or invalid')
  console.log('\nPlease update apps/web/.env.local with valid values')
}

console.log('='.repeat(50) + '\n')
