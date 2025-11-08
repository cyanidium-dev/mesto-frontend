const withPWA = require("next-pwa")({
    dest: "public", // де буде створено service-worker і manifest
    register: true, // автоматична реєстрація SW
    skipWaiting: true, // SW одразу активується без очікування
    disable: process.env.NODE_ENV === "development", // вимкнути PWA в dev
    buildExcludes: [/middleware-manifest\.json$/], // уникнути помилок з middleware
});

module.exports = withPWA({
    reactStrictMode: true,
    // Improve hot reloading reliability
    webpack: (config, { dev, isServer }) => {
        if (dev && !isServer) {
            // Better file watching for Windows
            config.watchOptions = {
                poll: 1000, // Check for changes every second
                aggregateTimeout: 300, // Delay before rebuilding once the first file changed
                ignored: /node_modules/,
            };
        }
        return config;
    },
    // Experimental features for better HMR
    experimental: {
        // Ensure proper HMR behavior
        optimizePackageImports: ["@heroui/react"],
    },
});
