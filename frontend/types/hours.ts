// API response interfaces
export interface hoursInfo {
  id: string;
  zid: string;
  firstname: string;
  lastname: string;
  num_hours: number;
  description: string;
  timestamp: string;
  image_url: string;
  status: hoursStatus;
}

// API request interfaces
export interface hoursRequest {
  numHours: number;
  description: string;
  timestamp: string;
  imageUrl: string;
}

export interface hoursApproveRequest {
  hourId: string;
  status: string;
}

// Frequently used hours related interfaces
export enum hoursStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface hoursImage {
  imageSrc: string;
  imageAlt: string;
}

export interface hoursAdminActions {
  approveAction: (hourId: string) => void;
  rejectAction: (hourId: string) => void;
}
