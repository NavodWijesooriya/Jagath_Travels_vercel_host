/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['firebasestorage.googleapis.com'], // Add Firebase Storage domain here
    },
    output: 'standalone',
  };
  
  export default nextConfig;
  