export type PropertyType = 
  | 'apartment'
  | 'villa'
  | 'land'
  | 'commercial'
  | 'office'
  | 'warehouse';

export type PropertyStatus =
  | 'available'
  | 'sold'
  | 'rented'
  | 'under_contract'
  | 'maintenance';

export interface Property {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  area: number;
  location: {
    city: string;
    cityEn: string;
    district: string;
    districtEn: string;
    address: string;
    addressEn: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  features: {
    bedrooms?: number;
    bathrooms?: number;
    parkingSpaces?: number;
    yearBuilt?: number;
    hasPool?: boolean;
    hasGarden?: boolean;
    hasElevator?: boolean;
    isFurnished?: boolean;
  };
  media: {
    images: string[];
    videos?: string[];
    virtualTour?: string;
  };
  owner: {
    name: string;
    nameEn: string;
    phone: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}