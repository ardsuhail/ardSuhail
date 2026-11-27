
import Projects from "@/component/public/Projects"
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