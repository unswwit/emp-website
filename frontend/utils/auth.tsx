import { NextRouter } from 'next/router';
import { getAuthToken } from '../pages/api/session';
import { userRoles } from '../types/user';
import { getUserProfile } from '../pages/api/user';

export const checkValidUser = async (router?: NextRouter, promptLogin = false) => {
  const userInfo = await getUserProfile();

  if (userInfo == undefined) {
    router && setTimeout(() => rerouteUser(router, promptLogin), 750);
    return false;
  }

  router &&
    (checkAuthToken()
      ? rerouteUser(router, false, userInfo?.role)
      : rerouteUser(router, true, userRoles.GUEST));

  return true;
};

const checkAuthToken = () => {
  const res = getAuthToken();

  if (res == undefined) return false;
  return true;
};

export const rerouteUser = (router: NextRouter, promptLogin = false, role = userRoles.GUEST) => {
  if (promptLogin) {
    router.push('/user/login');
    return;
  }

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
};
