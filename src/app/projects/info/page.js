// src/app/projects/info/page.js
import React from 'react'
import { getProjectById } from '@/lib/getProjects'
import ProjectInfo from '@/component/ProjectInfo'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ searchParams }) {
  const params = await searchParams
  const id = params?.id

  if (!id) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found',
    }
  }

  const project = await getProjectById(id)

  return {
    title: project?.seo?.metaTitle || project?.title || 'Project Details',
    description:
      project?.seo?.metaDescription || project?.shortDescription || 'Detailed view of the project',
    keywords:
      project?.seo?.keywords?.join(', ') || 'Project, Details, Tech Stack, Features',
  }
}

const page = async ({ searchParams }) => {

  // URL se id lo
  const params = await searchParams  // ← ye kaam karega
  const id = params?.id // ← ye bhi kaam karega

  if (!id) {
    return <div>Project ID not found</div>
  }
  const project = await getProjectById(id)

  return (
    <div>
      <ProjectInfo projectInfo={project} />
    </div>
  )
}

export default page

