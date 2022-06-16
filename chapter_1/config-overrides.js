const webpack = require("webpack")

module.exports = function override(config, env) {
    // define polyfill fallbacks 
    config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
        crypto: require.resolve("crypto-browserify")
    }

    config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"]

    // define plugins 
    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
    ]

    return config
}
