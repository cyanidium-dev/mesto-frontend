import { LatLngExpression } from "leaflet";

export interface Business {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  position: LatLngExpression;
}
