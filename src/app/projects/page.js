// src/app/projects/page.js
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

import Projects from "@/component/Projects"
import { getProjects } from "@/lib/getProjects"
const Page = async () => {
  const projects = await getProjects()
  return (
    <div>
      <Projects allProjects={projects} />
    </div>
  )
}

export default Page