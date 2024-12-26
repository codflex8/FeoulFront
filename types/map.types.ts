type LatLng = [number, number];

export interface Project {
  id: string;
  name: string;
  position: LatLng[];
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
