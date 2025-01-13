import React from 'react';
import { getInterests, getProjects, getUnits } from "@/lib/actions/dashboard.actions";
import DashboardPageClient from './DashboradPageClient';
import { interestsData, projectsData, unitData } from '@/dummyData'

export default async function DashboardPage() {

  // const projects = await getProjects()
  // const units = await getUnits()
  // const interests = await getInterests()



  // console.log("Projects from Dashboard", projects);
  // console.log("units from Dashboard", units);
  // console.log("interests from Dashboard", interests);

  return <DashboardPageClient projects={projectsData} units={unitData} interests={interestsData} />;
}