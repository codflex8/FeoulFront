import { getCategories, getProjects } from "@/lib/actions/dashboard.actions";
import { categoriesData } from '@/dummyData'
import CategoriesPageClient from "./CategoriesPageClient";

export default async function DashboardPage() {

  // const categories = await getCategories()

  // console.log("Projects from Dashboard", projects);

  return <CategoriesPageClient categories={categoriesData} />;
}