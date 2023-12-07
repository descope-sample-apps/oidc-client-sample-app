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

        console.log("Get user info")
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
        console.log("Got user info")
        console.log(data)
    }
    
    const getLogoutUrl = () => {
        const id_token = getCookie('id_token');
        console.log(id_token)
        const logoutUrl = `https://api.descope.com/oauth2/v1/logout?id_token_hint=${id_token}&post_logout_redirect_uri=` + API_URL;
        return logoutUrl;
    }
    useEffect(() => {
        const accessToken = getCookie('access_token');
        if (accessToken) {
            getUserInfo(accessToken);
        }
    }, [])

    return <div className="dashboard-container flex flex-col">
        <div 
        className="flex flex-row w-full justify-between items-center px-4 py-2"
        style={{backgroundColor: 'black', width: '100%', height: '10%', paddingTop: '1%', top: 0, position: 'absolute', marginBottom: '5%'}}
        >
					<div>
                        <div className="px-2">
                        Dashboard
                        </div>
                    </div>
                    <button 
                    className="bg-gray-800 rounded-md px-2 py-2"
                    onClick={() => {
                       const logoutUrl = getLogoutUrl();

                        window.location.href = logoutUrl;
                    }}>Log out</button>
				</div>
    
    </div>
}