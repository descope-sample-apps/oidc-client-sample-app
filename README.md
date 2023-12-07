This is a sample app showing authentication via OIDC using Descope's hosted authentication flow page. It's written in NextJS.

## Getting Started


First, add your [Descope Project ID](https://app.descope.com/settings/project) to a `.env` file in the root folder.

```
NEXT_PUBLIC_DESCOPE_PROJECT_ID=<your_project_id>
```


Second, install packages, and run the development server:

```bash
npm i
npm run dev
```

Now, Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features
### Log in via OIDC

This entails redirecting to a Descope OIDC authorize endpoint which includes: generating a code challenge and verifier and including those along with your Descope Project ID and a callback url. The callback url is also included at `/api/auth/callback` and parses the code verifier and token returned via Descope OIDC after successful authentication. Then, it sets the `id_token`, `access_token`, `refresh_token`, and `expires_in` to cookies before redirecting to the dashboard.
### Log out via OIDC
  
This entails redirecting to `/api/auth/logout` which then fetches the `id_token` from the cookies before clearing them. Then it redirects to Descope's OIDC logout endpoint with the `id_token` as a parameter along with the url to return to after successful log out.

### Middleware for Routing
NextJS middleware that handles redirect between `/dashboard` and `/` depending on if a valid `access_token` exists in cookies.
