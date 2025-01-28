export interface Project  {
  number: string;
  name: string;
  lat: string;
  lng: string;
  location: string;
  city: string;
  status: "مسودة" | "منشور" | "محذوف";
  model: string;
  updatedAt: Date;
  createdAt: Date;
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
  landSpace: string;
  buildSpace: string;
  totalArea: string;
  bedroomNumber: number;
  bathroomNumber: number;
  template: string;
  price: string;
  videoUrl: string;
  floors: number;
  floorsDesign: string[]
};

export type Operation = {
  number: number;
  name: string;
  price: number;
  operationType: string; 
  description: string;
  clientName: string; 
  date: string; 
  status: string; 
};
