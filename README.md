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


### Note
The tokens returned from successful authentication via OIDC are simply stored via cookies directly without 
important security considerations like http only, secure, or same site lax. This is to streamline the testing
process.

In a production you should set httpOnly to `true`, secure to `true`, and sameSite to `Lax`.
```
cookies().set('id_token', id_token, { httpOnly: true, secure: true, sameSite: 'lax' });
```
