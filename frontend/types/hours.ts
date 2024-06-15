export interface hoursInfo {
  id: string;
  num_hours: number;
  description: string;
  timestamp: string;
  image_url: string;
  status: hoursStatus;
}

export interface hoursRequest {
  numHours: number;
  description: string;
  timestamp: string;
  imageUrl: string;
}

export enum hoursStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum hoursType {
  LOGGED = 'logged',
  REQUESTED = 'requested',
}
