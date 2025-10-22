export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
import React from 'react'
import AddProject from '@/component/AddProject';

const page = () => {
  return (
    <div>
     <AddProject/>
    </div>
  )
}

export default page
