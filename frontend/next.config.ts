import type { NextConfig } from "next";
const { codeInspectorPlugin } = require('code-inspector-plugin');

const nextConfig: NextConfig = {
  output: "standalone",
  webpack: (config, { dev, isServer }) => {
    config.plugins.push(codeInspectorPlugin({ bundler: 'webpack' ,  editor: 'cursor'}));
    return config;
  },
};

export default nextConfig;