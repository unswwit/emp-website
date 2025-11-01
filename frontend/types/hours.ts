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
  tags: hoursTag[];
  status: hoursStatus;
}

// API request interfaces
export interface hoursRequest {
  numHours: number;
  description: string;
  timestamp: string;
  imageUrl: string;
  tags: hoursTag[];
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

export interface groupedHoursEntry {
  firstname: string;
  lastname: string;
  totalHours: number;
  entries: {
    timestamp: string;
    description: string;
    image_url: string;
  }[];
}

export interface cellHookData {
  column: { index: number };
  cell: {
    x: number;
    y: number;
    raw: any;
  };
}

export enum hoursTag {
  MENTOR = 'MENTOR',
  TRAINING = 'TRAINING',
  EVENT = 'EVENT',
}
