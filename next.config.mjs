import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'pub-2d2c2a5ee08a4562851348b30767ab78.r2.dev',
        pathname: '**',
      },
      
    ],
  },
 turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
