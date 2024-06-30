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

export interface userRegisterRequest {
  email: string;
  zid: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface userLoginRequest {
  userId: string;
  password: string;
}
