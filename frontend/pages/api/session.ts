import { setCookie, getCookie } from 'cookies-next';

export async function storeAuthToken(authToken: string) {
  setCookie('authToken', authToken);
}

export async function getAuthToken() {
  const authToken = getCookie('authToken');
  return authToken;
}
