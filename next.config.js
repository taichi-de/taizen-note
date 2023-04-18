/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    access_key: process.env.ACCESS_KEY,
  },
}

module.exports = nextConfig
