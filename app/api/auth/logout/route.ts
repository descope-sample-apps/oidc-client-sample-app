import { API_URL, client_id } from "@/app/utils";
import { cookies } from "next/headers";

export async function GET() {
    const id_token = cookies().get('id_token')?.value;

    cookies().set('id_token', '', { expires: new Date(0) });
    cookies().set('access_token', '', { expires: new Date(0) });
    cookies().set('refresh_token', '', { expires: new Date(0) });
    cookies().set('expires_in', '', { expires: new Date(0) });

    const logoutUrl = `https://api.descope.com/oauth2/v1/logout?id_token_hint=${id_token}&post_logout_redirect_uri=` + API_URL;
    return new Response(null, {
        status: 302,
        headers: {
            'Location': logoutUrl,
        }
    });
  }


