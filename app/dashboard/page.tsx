'use client'

import { useEffect } from "react"
import { API_URL } from "../utils";

export default function Page() {

    function getCookie(name: string) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    const getUserInfo = async (access_token: string) => {
        const userInfoUrl = 'https://api.descope.com/oauth2/v1/userinfo';

        const res = await fetch(userInfoUrl, {
        method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
        })
        if (!res.ok) {
            console.log("Error getting user info")
            if (res.status === 401) {
                console.log("User not authorized")
                window.location.href = API_URL;
            }
            return;
        } 
        const data = await res.json();
    }
    
    const getLogoutUrl = () => {
        const id_token = getCookie('id_token');
        const logoutUrl = `https://api.descope.com/oauth2/v1/logout?id_token_hint=${id_token}&post_logout_redirect_uri=` + API_URL;
        return logoutUrl;
    }
    useEffect(() => {
        const accessToken = getCookie('access_token');
        if (accessToken) {
            getUserInfo(accessToken);
        }
    }, [])

    return <div className="w-full h-ful mt-20 text-center">
        <h1 className="font-bold text-xl">You are logged in!</h1>
        <p className="max-w-sm m-auto mb-4">Check the cookies for your current domain and you should see an `id_token`, `refresh_token`, `access_token`, and `expires_in` set.</p>
        <button 
        className="bg-gray-800 rounded-md px-2 py-2"
        onClick={() => {
            const logoutUrl = getLogoutUrl();

            window.location.href = logoutUrl;
        }}>Log out</button>
    </div>
}