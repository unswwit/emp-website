import { NextRouter } from 'next/router';
import { getAuthToken } from '../pages/api/session';
import { userRoles } from '../types/user';

export const checkAuth = (router: NextRouter, role?: userRoles) => {
  getAuthToken().then((res) => {
    if (res == undefined) router.push('/');
    else {
      switch (role) {
        case userRoles.MENTEE:
          router.push('/mentee/home');
          break;
        case userRoles.ADMIN:
          router.push('/admin/home');
          break;
        default:
          router.push('/');
      }
    }
  });
};
