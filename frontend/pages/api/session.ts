import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export function storeAuthToken(authToken: string) {
  setCookie('authToken', authToken);
}

export function getAuthToken() {
  const authToken = getCookie('authToken');
  return authToken;
}

export function deleteAuthToken() {
  deleteCookie('authToken');
}
