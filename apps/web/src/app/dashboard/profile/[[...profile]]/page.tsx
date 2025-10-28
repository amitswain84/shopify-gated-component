import { UserProfile } from '@clerk/nextjs'

export default function ProfilePage() {
  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-4 md:py-6 flex justify-start">
      <div className="w-full max-w-3xl">
        <UserProfile />
      </div>
    </div>
  )
}
