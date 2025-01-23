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

export interface Categories {
  id: string;
  name: string;
  position: LatLng[];
  lat: number;
  lng: number;
  city: string;
  projectDoCUrl: string;
  status: CommonStatuses;
  units: [];
}

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
