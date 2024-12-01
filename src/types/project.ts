export interface Project {
  id: string;
  developerId: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  location: {
    city: string;
    cityEn: string;
    district: string;
    districtEn: string;
    coordinates?: {
      lat: number;
      lng: number;
    }
  };
  type: 'residential' | 'commercial' | 'mixed_use' | 'industrial';
  status: 'planned' | 'under_construction' | 'completed' | 'sold_out';
  startDate: string;
  completionDate: string;
  totalUnits: number;
  price: {
    min: number;
    max: number;
    currency: string;
  };
  features: string[];
  featuresEn: string[];
  media: {
    images: string[];
    videos: string[];
    brochure?: string;
  };
  createdAt: string;
  updatedAt: string;
}