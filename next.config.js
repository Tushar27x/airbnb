/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[
            "avatars.githubuser.com",
            "res.cloudinary.com"
        ]
    },
    async rewrites() {
        return [
          {
            source: '/(.*)',
            destination: '/', // Change 'fallback' to the route you want to use as default
          },
        ];
      },
}

module.exports = nextConfig
