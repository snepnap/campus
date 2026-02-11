export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://campus-steel.vercel.app';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
    return fetch(url, options);
}
