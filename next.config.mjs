import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
 turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
