/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    RANDOM_SHA: process.env.RANDOM_SHA,
  },
};

module.exports = nextConfig;
