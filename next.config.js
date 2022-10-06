const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
});

const nextConfig = withPWA({
    // next config
});
module.exports = nextConfig;

// const withImages = require('next-images')
// const withPWA = require("next-pwa");
// const runtimeCaching = require("next-pwa/cache");

// const withTM = require('next-transpile-modules')([
  
// ]);

// const nextConfig = withPWA({
//   reactStrictMode: false,
//   swcMinify: true,
//   pwa: {
//     runtimeCaching,
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//   },
// });

// module.exports = withTM(
//   withImages(
//     nextConfig
//   )
// );