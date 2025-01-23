"use server";

import { PaginatedProjects, Project } from "@/types/map.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProjects = async () => {
  try {
    const response = await fetch(`${API_URL}/public/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data: PaginatedProjects = await response.json();
    const { items: projects } = data;
    return projects;
  } catch (error) {
    console.error(
      "An error occurred while getting projects from the API:",
      error
    );
    throw error;
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const response = await fetch(`${API_URL}/public/projects/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch project: ${response.statusText}`);
    }

    const data: { project: Project } = await response.json();

    return data.project;
  } catch (error) {
    console.error(
      "An error occurred while getting the project from the API:",
      error
    );
    throw error;
  }
};

export const getUnits = async () => {
  try {
    const response = await fetch("http://18.116.28.100/api/v1/public/units", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch units: ${response.statusText}`);
    }

    const units = await response.json();
    return units;
  } catch (error) {
    console.error(
      "An error occurred while getting the units from the API:",
      error
    );
    throw error;
  }
};

export const getUnitById = async (unitId: string) => {
  try {
    const response = await fetch(
      `http://18.116.28.100/api/v1/public/units/${unitId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch units: ${response.statusText}`);
    }

    const unit = await response.json();
    return unit;
  } catch (error) {
    console.error(
      "An error occurred while getting the unit from the API:",
      error
    );
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/v1/public/unit-category",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error(
      "An error occurred while getting the categories from the API:",
      error
    );
    throw error;
  }
};

export const getPlaces = async () => {
  try {
    const response = await fetch(
      "http://18.116.28.100/api/v1/public/project-facilities",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data = await response.json();
    const { items: places } = data;
    return places;

    return places;
  } catch (error) {
    console.error(
      "An error occurred while getting the categories from the API:",
      error
    );
    throw error;
  }
};
