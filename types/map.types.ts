export type LatLng = [number, number];

export interface Project {
  id: string;
  name: string;
  position: LatLng[];
  lat: number;
  lng: number;
  city: string;
  projectDoCUrl: string;
  status: "posted" | "draft" | "deleted",
  units: []
}

export interface Categories {
  id: string;
  name: string;
  position: LatLng[];
  lat: number;
  lng: number;
  city: string;
  projectDoCUrl: string;
  status: "posted" | "draft" | "deleted",
  units: []
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
