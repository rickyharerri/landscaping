/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

// Sanitize basePath: remove leading/trailing slashes and reject "/"
let basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
if (basePath === '/') {
  basePath = ''; // Convert "/" to empty string
} else if (basePath) {
  basePath = basePath.replace(/^\/+|\/+$/g, ''); // Remove leading/trailing slashes
}

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: isProd ? basePath : '',
  assetPrefix: isProd && basePath ? `${basePath}/` : undefined,
};

export default nextConfig;