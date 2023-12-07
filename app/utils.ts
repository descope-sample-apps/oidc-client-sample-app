if (process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID === undefined) throw new Error('DESCOPE_PROJECT_ID is not defined');

const client_id: string = process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID;

const API_URL = process.env.NODE_ENV === 'production' ? '<add_deployed_url>' : 'http://localhost:3000';

export { client_id, API_URL }