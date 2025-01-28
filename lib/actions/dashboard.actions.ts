"use server";

import { Project } from "@/types/dashboard.types";
import { cookies } from "next/headers";
// Projects

export const getProjects = async () => {
  const cookieStore =await cookies();
  const token = cookieStore.get("authToken")?.value;
  console.log(token);
  try {
    const response = await fetch('http://18.116.28.100/api/v1/dashboard/projects', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
    const cookieStore =await cookies();
  const token = cookieStore.get("authToken")?.value;
  try {
    const response = await fetch('http://18.116.28.100/api/v1/dashboard/projects', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
    const cookieStore =await cookies();
  const token = cookieStore.get("authToken")?.value;
  try {
    const response = await fetch(`http://18.116.28.100/api/v1/dashboard/project/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
    const cookieStore =await cookies();
  const token = cookieStore.get("authToken")?.value;
  try {
    const response = await fetch(`http://18.116.28.100/api/v1/dashboard/project/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
    const cookieStore =await cookies();
  const token = cookieStore.get("authToken")?.value;
  try {
    const response = await fetch('http://18.116.28.100/api/v1/dashboard/unit-category', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  console.log("Category Data:", categoryData);

  try {
    const payload = {
      ...categoryData,
      status: categoryData.status === "منشورة" ? "published" : categoryData.status === "مسودة" ? "draft" : "deleted",
    };

    const response = await fetch('http://18.116.28.100/api/v1/dashboard/unit-category', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();
    console.log("Response Data:", responseData);

    if (!response.ok) {
      console.error("Server Error:", responseData);
      throw new Error(`Failed to add new category: ${response.statusText}`);
    }

    return responseData;
  } catch (error) {
    console.error("An error occurred while adding new category:", error);
    throw error;
  }
};

export const deleteCategory = async (categoryId: string) => {
    const cookieStore =await cookies();
  const token = cookieStore.get("authToken")?.value;
  try {
    const response = await fetch(`http://18.116.28.100/api/v1/dashboard/unit-category/${categoryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
export const updateCategory = async (categoryId: string, updatedData: any) => {
  const cookieStore = await cookies();  
  const token = cookieStore.get("authToken")?.value;
  console.log("Category ID:", categoryId);
  console.log("Updated Data:", updatedData);
  
  if (!token) {
    throw new Error("Authentication token is missing");
  }

  try {
    const response = await fetch(
      `http://18.116.28.100/api/v1/dashboard/unit-category/${categoryId}`,  
      {
        method: "PUT",  
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  
        },
        body: JSON.stringify(updatedData), 
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from server:", errorData);
      throw new Error(`Failed to update category: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Updated category:", data);
    return data;  
  } catch (error) {
    console.error("An error occurred while updating the category:", error);
    throw error;
  }
};

// Interests
export const getInterests = async () => {
  const cookieStore =await cookies();
  const token = cookieStore.get("authToken")?.value;
  console.log(token);
  try {
    const response = await fetch('http://18.116.28.100/api/v1/dashboard/unit-intreset', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();
    return data.items || data;  
  } catch (error) {
    console.error("An error occurred while getting projects from the API:", error);
    throw error;
  }
};
export const updateInterest = async (interestId: string, interestData: any) => {
    const cookieStore =await cookies();
  const token = cookieStore.get("authToken")?.value;
  try {
    const response = await fetch(`http://18.116.28.100/api/v1/dashboard/unit-intreset/${interestId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
    const cookieStore =await cookies();
  const token = cookieStore.get("authToken")?.value;
  try {
    const response = await fetch(`http://18.116.28.100/api/v1/dashboard/unit-intreset/${interestId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
    const cookieStore =await cookies();
  const token = cookieStore.get("authToken")?.value;
  try {
    const response = await fetch('http://18.116.28.100/api/v1/dashboard/units', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
    const cookieStore =await cookies();
  const token = cookieStore.get("authToken")?.value;
  try {
    const response = await fetch(`http://18.116.28.100/api/v1/dashboard/unit/${unitId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
    const cookieStore =await cookies();
  const token = cookieStore.get("authToken")?.value;
  try {
    const response = await fetch(`http://18.116.28.100/api/v1/dashboard/unit/${unitId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
    const cookieStore =await cookies();
  const token = cookieStore.get("authToken")?.value;
  try {
    const response = await fetch('http://18.116.28.100/api/v1/dashboard/financial', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
 export const getFloor = async (unitId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  try {
    const response = await fetch(
      `http://18.116.28.100/api/v1/dashboard/unit-floor?unitId=${unitId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch floor designs");
    }

    const data = await response.json();
    return data?.floors || [];  
  } catch (error) {
    console.error("An error occurred while fetching floor designs:", error);
    throw error;  
  }
};


