export interface Project  {
  projectNumber: string;
  projectName: string;
  location: string;
  city: string;
  status: "مسودة" | "منشور" | "محذوف";
  model: string;
  date: Date;
};

export type Interest = {
  firstName: string
  surName: string
  phone: string
  email: string
  region: "المركز" | "الشرقي" | "الغربي"
  buildingNumber: number
  buildingStatus: "متاح" | "محجوز" | "مباع"
}

export type Category = {
  id: number;
  name: string;
  color: string;
  status: "مسودة" | "منشور" | "محذوف";
};

export interface Unit  {
  number: string;
  name: string;
  model: string;
  estate: string;
  landArea: string;
  buildingArea: string;
  totalArea: string;
  bedrooms: number;
  bathrooms: number;
  price: string;
  videoUrl: string;
  floors: number;
  floorsDesign: string[]
};

export type Operation = {
  number: number;
  operationType: string; 
  description: string;
  clientName: string; 
  date: string; 
  status: string; 
};
