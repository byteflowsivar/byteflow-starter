import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Needed for @byteflow-ui packages to work correctly when resolved as
  // workspace symlinks (i.e., during local monorepo development).
  // Turbopack does not follow symlinks outside the project root by default.
  transpilePackages: [
    "@byteflow-ui/alert",
    "@byteflow-ui/badge",
    "@byteflow-ui/button",
    "@byteflow-ui/card",
    "@byteflow-ui/input",
    "@byteflow-ui/sidebar",
  ],
};

export default nextConfig;
