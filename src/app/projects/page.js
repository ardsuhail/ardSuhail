// src/app/projects/page.js
import Projects from "@/component/Projects"
import { getProjects } from "@/lib/getProjects"
const Page=async()=>{
  const projects = await getProjects()
  return(
    <div>
      <Projects allProjects={projects}/>
    </div>
  )
}

export default Page