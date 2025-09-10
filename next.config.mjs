/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  async headers() {
    return [
      {
        source: '/api/bff/:path*',
        headers: [
          { key: 'Vary', value: 'x-app-version, x-device, Accept-Language' },
        ],
      },
    ];
  },
};

export default nextConfig;



