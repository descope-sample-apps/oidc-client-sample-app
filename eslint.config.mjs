import nextConfig from "eslint-config-next/core-web-vitals";

const config = [
  { ignores: ["next-js-sample-app/**", ".next/**", "node_modules/**"] },
  ...(Array.isArray(nextConfig) ? nextConfig : [nextConfig]),
];

export default config;
