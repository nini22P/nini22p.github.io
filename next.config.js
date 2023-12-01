/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  // basePath: '/',
  // Optional: Add a trailing slash to all paths `/about` -> `/about/`
  trailingSlash: true,
  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
  images: { unoptimized: true }
}

// eslint-disable-next-line no-undef
module.exports = nextConfig