/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')

const nextConfig = {
  // OAuth 요청 등도 2번씩 보내고 있어서... 일단 끔
  reactStrictMode: false,
  webpack(config) {
    config.resolve.modules.push(__dirname) // 추가
    return config
  },
}

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: '/public',
          register: true,
          skipWaiting: true,
          disable: process.env.NODE_ENV === 'development',
        },
      },
    ],
  ],
  nextConfig,
)
