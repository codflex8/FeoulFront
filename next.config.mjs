import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "18.116.28.100",
        port: "",
        pathname: "/**",
      },
    ],
  },
  typescript:{
    ignoreBuildErrors: true,
  }
};

export default withNextIntl(nextConfig);
