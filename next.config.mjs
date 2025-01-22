/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
        locale: false
      }
    ]
  },
  webpack: config => {
    config.resolve.alias.canvas = false

    return config
  }
}

export default nextConfig
