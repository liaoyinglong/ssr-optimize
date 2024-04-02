const withBundleAnalyzer = require("@next/bundle-analyzer");
const { withSSROptimize } = require("ssr-optimize");

/** @type {import('next').NextConfig} */
let nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    // 在这个 example 中，我们会多次 build，禁用缓存方便对比观察
    config.cache = false;
    return config;
  },
};

if (process.env.optimize) {
  nextConfig = withSSROptimize({
    deps: {
      ethers: true,
      "@web3modal/ethers$": true,
      "@web3modal/ethers/react": true,
    },
  })(nextConfig);
}

if (process.env.ANALYZE) {
  nextConfig = withBundleAnalyzer()(nextConfig);
}

module.exports = nextConfig;
