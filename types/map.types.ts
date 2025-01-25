import { PaginatedResponse } from "./api.types";

export type LatLng = [number, number];

export enum CommonStatusesEnum {
  posted = "posted",
  archived = "archived",
  deleted = "deleted",
}

type CommonStatuses = "posted" | "archived" | "deleted";

export interface Template {
  name: string;
  link: string;
  status: CommonStatuses;
}

export interface facility {
  name: string;
  lng: string;
  lat: string;
}

export interface Project {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  number: number;
  name: string;
  status: CommonStatuses;
  projectDocUrl: string | null;
  facilities: facility[];
  city: string;
  lng: string;
  lat: string;
}

export type PaginatedProjects = PaginatedResponse<Project>;

export type UnitsPriceRange = {
  maxPrice: number;
  minPrice: number;
};

export type UnitsSpaceRange = {
  maxSpace: number;
  minSpace: number;
};

//TODO: should be sold not saled we have typo in back-end
export type UnitStatus = "reserved" | "saled" | "available";

export enum UnitStatusEnum {
  reserved = "reserved",
  saled = "saled",
  available = "available",
}

export type Floor = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  index: number;
  imageUrl: string;
};

export type Unit = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  number: number;
  name: string;
  price: number;
  type: string;
  template: string;
  buildStatus: string;
  buildLevel: number;
  salesChannels: string[];
  size: [string, string];
  position: [string, string];
  //TODO: should be soldSpace not saled we have typo in back-end
  saledSpace: number | null; // handle it when reserved it should be null
  landSpace: number;
  buildSpace: number;
  status: UnitStatus;
  bedroomNumber: number;
  bathroomNumber: number;
  videoUrl: string | null;
  floorsNumber: number;
  advantages: string | null;
  project: Project;
  floors: Floor[];
  category: Categories;
};

export interface UnitsData {
  unitsPriceRange: UnitsPriceRange;
  unitsSpaceRange: UnitsSpaceRange;
  //TODO: should be reservedUnits, but we can change this when back-end fix it
  reverseUnits: Unit[];
  //TODO: should be soldUnits, but we can change this when back-end fix it
  saledUnits: Unit[];
  //TODO: should be availableUnits, but we can change this when back-end fix it
  avaliableUnits: Unit[];
}

export interface Categories {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  number: number;
  name: string;
  color: string;
  status: CommonStatuses;

  // position: LatLng[];
  // lat: number;
  // lng: number;
  // city: string;
  // projectDoCUrl: string;
  // units: [];
}

export type PaginatedCategories = PaginatedResponse<Categories>;

export interface Landmark {
  name: string;
  type: string;
  position: [number, number];
}

export interface MapProps {
  projects: Project[];
  basicLandmarks: Landmark[];
  landmarks: Landmark[];
}

export interface UnitsFilters {
  unitStatus: UnitStatus;
}
