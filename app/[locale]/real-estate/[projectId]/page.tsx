// app/projects/[projectId]/page.tsx (Server Component)
import React from "react";
import { getCategories, getProjectById } from "@/lib/actions/map.actions";
import BuildingPageClient from "./BuildingPageClient"; // Your Client Component
import { notFound } from "next/navigation";

export default async function BuildingPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const projectId = (await params).projectId;
  const project = await getProjectById(projectId);
  // const { categories } = await getCategories();

  // if (!project) {
  //   return <div>Project not found.</div>;
  // }

  if (!project) {
    // TODO: FIX the root layout issue and not-found page is not working!
    notFound();
  }

  // console.log("categories", categories);

  const categories = ["category-a", "category-b", "category-c", "category-d"];

  return <BuildingPageClient project={project} categories={categories} />;
}
