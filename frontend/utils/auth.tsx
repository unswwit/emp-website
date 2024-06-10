import { NextRouter } from 'next/router';
import { getAuthToken } from '../pages/api/session';

export const checkAuth = (router: NextRouter) => {
  getAuthToken().then((res) => res == undefined && router.push('/'));
};
