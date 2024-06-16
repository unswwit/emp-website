export enum userRoles {
  ADMIN = 'admin',
  MENTEE = 'mentee',
  GUEST = 'guest',
}

export interface userProfile {
  email: string;
  zid: string;
  firstname: string;
  lastname: string;
  role: userRoles;
  year: string;
  mentor: undefined;
}
