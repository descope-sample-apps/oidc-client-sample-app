if (process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID === undefined) throw new Error('NEXT_PUBLIC_DESCOPE_PROJECT_ID is not defined');

const client_id: string = process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID;

function getApiUrlFromHeaders(headers: Headers): string {
    const host = headers.get('x-forwarded-host') ?? headers.get('host');
    const proto = headers.get('x-forwarded-proto') ?? (host?.startsWith('localhost') ? 'http' : 'https');
    return `${proto}://${host}`;
}

export { client_id, getApiUrlFromHeaders }