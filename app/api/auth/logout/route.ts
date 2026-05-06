import { getApiUrlFromHeaders } from "@/app/utils";
import { cookies, headers } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    const id_token = cookieStore.get('id_token')?.value;

    cookieStore.set('id_token', '', { expires: new Date(0) });
    cookieStore.set('access_token', '', { expires: new Date(0) });
    cookieStore.set('refresh_token', '', { expires: new Date(0) });
    cookieStore.set('expires_in', '', { expires: new Date(0) });

    let baseURL = "api.descope.com"
    if (process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID && process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID.length >= 32) {
      const localURL = process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID.substring(1, 5)
      baseURL = [baseURL.slice(0, 4), localURL, ".", baseURL.slice(4)].join('')
    }
    const apiUrl = getApiUrlFromHeaders(await headers());
    const logoutUrl = `https://${baseURL}/oauth2/v1/logout?id_token_hint=${id_token}&post_logout_redirect_uri=` + apiUrl;
    return new Response(null, {
        status: 302,
        headers: {
            'Location': logoutUrl,
        }
    });
  }


