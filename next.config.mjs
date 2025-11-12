/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
    domains: ['res.cloudinary.com'],
    // Ya phir better approach - remotePatterns use karo
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },

};

export default nextConfig;
