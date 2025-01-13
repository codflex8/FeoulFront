import { getProjects } from "@/lib/actions/dashboard.actions";
import { projectsData } from '@/dummyData'
import ProjectsPageClient from './ProjectsPageClient';

export default async function DashboardPage() {

  // const projects = await getProjects()

  // console.log("Projects from Dashboard", projects);

  return <ProjectsPageClient projects={projectsData} />;
}