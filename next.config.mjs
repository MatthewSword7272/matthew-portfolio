import { fileURLToPath } from "url";
import { dirname } from "path";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // A stray package-lock.json in the user's home directory otherwise gets
  // picked as the workspace root for output file tracing.
  outputFileTracingRoot: __dirname,
  // Paper.js (used by /pulse) has Node-only entry files that pull in jsdom and
  // node-canvas. Its package.json stubs them out for browsers, but the server
  // compile doesn't read that field. The page only loads Paper in the browser,
  // so the same two files are stubbed out for every build.
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      [require.resolve("paper/dist/node/self.js")]: false,
      [require.resolve("paper/dist/node/extend.js")]: false,
    };
    return config;
  },
};

export default nextConfig;
