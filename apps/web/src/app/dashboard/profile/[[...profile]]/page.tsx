import { UserProfile } from '@clerk/nextjs'

export default function ProfilePage() {
  return (
    <div className="w-full p-4 md:p-6 lg:p-8 flex justify-start">
      <UserProfile />
    </div>
  )
}
