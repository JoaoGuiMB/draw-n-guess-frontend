/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "github.com",
        pathname: "/joaoguimb.png",
      },
    ],
  },
};

module.exports = nextConfig;
