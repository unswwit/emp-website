export interface hoursInfo {
  id: string;
  zid: string;
  timestamp: string;
  num_hours: number;
  description: string;
  status: hoursStatus;
  image_url: string;
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
