/** @type {import('next').NextConfig} */
// next.config.mjs
const nextConfig = {
    env: {
      NEXT_PUBLIC_FASTAPI_URL: 'http://127.0.0.1:8000', // URL del servidor FastAPI
    },
  };
  
  export default nextConfig;
  
