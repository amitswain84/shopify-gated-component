// Check checklist items in database
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('\n🔍 Checking Checklist Items in Database...\n')

  const items = await prisma.checklistItem.findMany({
    orderBy: {
      order: 'asc',
    },
  })

  if (items.length === 0) {
    console.log('❌ No checklist items found in database!')
    console.log('\nRun this to seed the database:')
    console.log('cd packages/database && pnpm db:seed')
    return
  }

  console.log(`✅ Found ${items.length} checklist items:\n`)

  const freeItems = items.filter(item => !item.isPro)
  const proItems = items.filter(item => item.isPro)

  console.log(`📋 FREE Items (${freeItems.length}):`)
  freeItems.forEach((item, i) => {
    console.log(`   ${i + 1}. ${item.title} [${item.icon}]`)
  })

  console.log(`\n⭐ PRO Items (${proItems.length}):`)
  proItems.forEach((item, i) => {
    console.log(`   ${i + 1}. ${item.title} [${item.icon}]`)
  })

  console.log('\n✅ Checklist items are ready in the database!')
  console.log('\nNow start your dev server and visit:')
  console.log('http://localhost:3000/dashboard/shopify-checklist')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
