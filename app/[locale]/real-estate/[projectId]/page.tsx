// app/projects/[projectId]/page.tsx (Server Component)
import React from 'react';
import { getCategories, getProjectById } from '@/lib/actions/map.actions';
import BuildingPageClient from './BuildingPageClient'; // Your Client Component
import { Project } from '@/types/map.types';
import { notFound } from 'next/navigation';

export default async function BuildingPage({
  params,
}: {
  params: { projectId: string };
}) {
  
  const projectId = params.projectId;
  const { project } = await getProjectById(projectId);
  // const { categories } = await getCategories();

  if (!project) {
    notFound();
  }

  // console.log("project", project);
  // console.log("categories", categories);

  const categories = ["category-a", "category-b", "category-c", "category-d"]
  

  return <BuildingPageClient project={project} categories={categories}   />;
}