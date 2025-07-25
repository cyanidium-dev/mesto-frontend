const withPWA = require("next-pwa")({
  dest: "public", // де буде створено service-worker і manifest
  register: true, // автоматична реєстрація SW
  skipWaiting: true, // SW одразу активується без очікування
  disable: process.env.NODE_ENV === "development", // вимкнути PWA в dev
  buildExcludes: [/middleware-manifest\.json$/], // уникнути помилок з middleware
});

module.exports = withPWA({
  reactStrictMode: true,
});
