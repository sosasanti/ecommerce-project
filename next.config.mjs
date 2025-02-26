/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol:'https',
        hostname:'jhjvoj8r6z.ufs.sh',
        port:'',
      }
    ]
  }
};

export default nextConfig;