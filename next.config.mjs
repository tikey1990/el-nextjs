/** @type {import('next').NextConfig} */

const nextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
    resolveExtensions: [
      ".mdx",
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".mjs",
      ".json",
      ".webp",
    ],
  },
  sassOptions: {
    includePaths: ["src/assets", "node_modules"], // Replace 'styles' with your Sass directory
    implementation: "sass-embedded",
  },
};

export default nextConfig;
