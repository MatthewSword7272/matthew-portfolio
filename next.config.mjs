import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

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
};

export default nextConfig;
