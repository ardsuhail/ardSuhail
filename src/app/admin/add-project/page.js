export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import React from 'react'
import AddProject from '@/component/AddProject'

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AddProject />
    </div>
  )
}

export default Page