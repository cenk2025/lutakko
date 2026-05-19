/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only enable static-export for production builds.
  // Dev mode runs as a normal Next.js server so dynamic routes with
  // generateStaticParams() work the way the docs claim.
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
