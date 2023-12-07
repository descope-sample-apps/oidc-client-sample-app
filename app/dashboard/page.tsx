'use client'

export default function Page() {
    // Example user info request for use in route handler
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
            return;
        } 
        const data = await res.json();
        console.log(data);
    }


    return <div className="w-full h-ful mt-20 text-center">
        <h1 className="font-bold text-xl">You are logged in!</h1>
        <p className="max-w-sm m-auto mb-4">Check the cookies for your current domain and you should see an `id_token`, `refresh_token`, `access_token`, and `expires_in` set.</p>
        <button 
        className="bg-gray-800 rounded-md px-2 py-2"
        onClick={() => {
            window.location.href = 'api/auth/logout';
        }}>Log out</button>
    </div>
}