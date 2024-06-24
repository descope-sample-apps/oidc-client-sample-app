import { client_id } from "@/app/utils";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    let baseURL = "api.descope.com"
    if (process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID.length >= 32) {
        const localURL = process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID.substring(1, 5)
        baseURL = [baseURL.slice(0, 4), localURL, ".", baseURL.slice(4)].join('') 
    }
    const tokenUrl = `https://${baseURL}/oauth2/v1/token`;

    const tokenData = {
        grant_type: 'authorization_code',
        code: code,
        client_id: client_id,
        code_verifier: state,
    };

    const res = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tokenData),
    })
    const data = await res.json()

    const { access_token, id_token, refresh_token, expires_in  } = data;

    cookies().set('id_token', id_token, { httpOnly: true, secure: true, sameSite: 'lax' })
    cookies().set('access_token', access_token, { httpOnly: true, secure: true, sameSite: 'lax' })
    cookies().set('refresh_token', refresh_token, { httpOnly: true, secure: true, sameSite: 'lax' })
    cookies().set('expires_in', expires_in, { httpOnly: true, secure: true, sameSite: 'lax' })


    return new Response(null, {
        status: 302,
        headers: {
            'Location': '/dashboard',
        }
    });
  }


