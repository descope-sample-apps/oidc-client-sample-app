'use client'

import { API_URL, client_id } from "./utils";

export default function Home() {
  function generateCodeVerifier() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const charactersLength = characters.length;
  
    for (let i = 0; i < 128; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }
  
  function generateCodeChallenge(verifier: string) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))
      .then(arrayBuffer => {
        const base64Url = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
          .replace(/=/g, '')
          .replace(/\+/g, '-')
          .replace(/\//g, '_');
        return base64Url;
      });
  }
  

  const getAuthUrl = async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const redirect_uri = API_URL + '/api/auth/callback';
    const authUrl = `https://api.descope.com/oauth2/v1/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=openid&code_challenge=${codeChallenge}&code_challenge_method=S256&state=${codeVerifier}`;
    console.log(authUrl);
    
    return authUrl;
  }

  const onClick = async () => {
    const authUrl = await getAuthUrl();
    window.location.href = authUrl;
  }


  return (
    <div className="w-full h-ful mt-20 text-center">
      <button onClick={onClick} className="bg-white px-4 py-2 text-black rounded-md">Login via OIDC</button>
    </div>
  )
}





