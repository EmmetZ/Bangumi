import axios from 'axios';
import { OAuthInfo } from '../types';
import { APP_ID, APP_SECRET } from '../constant';

const config = {
  redirectUri: 'http://localhost:5173/login',
  authBaseUrl: 'https://bgm.tv/oauth/authorize',
  tokenBaseUrl: 'https://bgm.tv/oauth/access_token',
  apiBaseUrl: 'https://api.bgm.tv',
};

export function getAuthUrl(): string {
  const redirectUri = encodeURIComponent(config.redirectUri);
  const state = Date.now();
  return `${config.authBaseUrl}?client_id=${APP_ID}&response_type=code&redirect_uri=${redirectUri}&state=${state}`;
}

export function getAccessToken(code: string) {
  return axios.post<OAuthInfo>(config.tokenBaseUrl, {
    grant_type: 'authorization_code',
    client_id: APP_ID,
    client_secret: APP_SECRET, 
    code: code,
    redirect_uri: config.redirectUri,
    state: Date.now(),
  });
}

// 使用访问令牌获取受保护的资源
// export async function fetchProtectedResource(
//   accessToken: string,
//   endpoint: string
// ) {
//   try {
//     const url = `${config.apiBaseUrl}${endpoint}`;
//     const response = await axios.get(url, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     console.log('Protected Resource:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching protected resource:', error);
//     throw new Error('Failed to retrieve protected resource');
//   }
// }
