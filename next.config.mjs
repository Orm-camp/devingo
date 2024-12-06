/** @type {import('next').NextConfig} */
const prefix =
  process.env.NODE_ENV === 'production' ? 'https://Orm-camp.github.io/devingo/' : ''

const nextConfig = {
  output: 'export',
  assetPrefix: prefix,
  }
export default nextConfig;
