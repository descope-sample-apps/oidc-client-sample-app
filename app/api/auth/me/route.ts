import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const access_token = cookieStore.get('access_token')?.value;

  if (!access_token) {
    return new Response(JSON.stringify({ error: 'unauthenticated' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let baseURL = 'api.descope.com';
  if (process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID && process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID.length >= 32) {
    const localURL = process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID.substring(1, 5);
    baseURL = [baseURL.slice(0, 4), localURL, '.', baseURL.slice(4)].join('');
  }

  const userInfoUrl = `https://${baseURL}/oauth2/v1/userinfo`;
  const res = await fetch(userInfoUrl, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'userinfo_failed' }), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
