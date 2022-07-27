/** @type {import('next').NextConfig} */
const nextConfig = {
  // OAuth 요청 등도 2번씩 보내고 있어서... 일단 끔
  reactStrictMode: false,
  webpack(config) {
    config.resolve.modules.push(__dirname) // 추가
    return config
  },
}

module.exports = nextConfig
