"use server";

import { Project } from "@/types/dashboard.types";

// Projects
export const getProjects = async () => {
  try {
    const response = await fetch('http://18.116.28.100/api/v1/dashboard/projects', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();
    return data.items || data; // Handle both cases where data is nested or direct
  } catch (error) {
    console.error("An error occurred while getting projects from the API:", error);
    throw error;
  }
};

export const addProject = async (projectData: Project) => {
  try {
    const response = await fetch('http://18.116.28.100/api/v1/dashboard/projects', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData), // Include the request body
    });

    if (!response.ok) {
      throw new Error(`Failed to add new project: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while adding new project:", error);
    throw error;
  }
};

export const updateProject = async (projectId: string, projectData: Project) => {
  try {
    const response = await fetch(`http://18.116.28.100/api/v1/dashboard/project/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData), // Include the request body
    });

    if (!response.ok) {
      throw new Error(`Failed to update project: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while updating project:", error);
    throw error;
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const response = await fetch(`http://18.116.28.100/api/v1/dashboard/project/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete project: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while deleting project:", error);
    throw error;
  }
};

// Category
export const getCategories = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/dashboard/unit-category', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while getting the categories from the API:", error);
    throw error;
  }
};

export const addCategory = async (categoryData: any) => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/dashboard/unit-category', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData), // Include the request body
    });

    if (!response.ok) {
      throw new Error(`Failed to add new category: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while adding new category:", error);
    throw error;
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/dashboard/unit-category/${categoryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete category: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while deleting category:", error);
    throw error;
  }
};

// Interests
export const getInterests = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/dashboard/unit-intreset', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch interests: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while getting the interests from the API:", error);
    throw error;
  }
};

export const updateInterest = async (interestId: string, interestData: any) => {
  try {
    const response = await fetch(`http://18.116.28.100/api/v1/dashboard/unit-intreset/${interestId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(interestData), // Include the request body
    });

    if (!response.ok) {
      throw new Error(`Failed to update interest: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while updating interest:", error);
    throw error;
  }
};

export const deleteInterest = async (interestId: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/dashboard/unit-intreset/${interestId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete interest: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while deleting interest:", error);
    throw error;
  }
};

// Units
export const getUnits = async () => {
  try {
    const response = await fetch('http://18.116.28.100/api/v1/dashboard/units', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch units: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while getting the units from the API:", error);
    throw error;
  }
};

export const updateUnit = async (unitId: string, unitData: any) => {
  try {
    const response = await fetch(`http://18.116.28.100/api/v1/dashboard/unit/${unitId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(unitData), // Include the request body
    });

    if (!response.ok) {
      throw new Error(`Failed to update unit: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while updating unit:", error);
    throw error;
  }
};

export const deleteUnit = async (unitId: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/dashboard/unit/${unitId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete unit: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while deleting unit:", error);
    throw error;
  }
};

// Financial
export const getFinancial = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/dashboard/financial', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch financial data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while getting the financial data from the API:", error);
    throw error;
  }
};