const path = require("path");
var ManifestPlugin = require('webpack-manifest-plugin');
const dotenv = require("dotenv");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");



/**
 * Obtain client id for OAuth link in React
 *
 * If in development mode or local production mode, search the .env file for
 * client id. If using Docker, pass a build arg.
 *
 */
const getEnvFromDotEnvFile = dotenv.config();
let envKeys;
if (getEnvFromDotEnvFile.error) {
  console.log("Getting environment variables from build args for production"); // eslint-disable-line
  envKeys = {
    "process.env.CLIENT_ID": JSON.stringify(process.env.CLIENT_ID),
    "process.env.NODE_ENV": JSON.stringify("production"),
  };
} else {
  envKeys = { "process.env.CLIENT_ID": JSON.stringify(getEnvFromDotEnvFile.parsed["CLIENT_ID"]) };
}

module.exports = {
  /**
   * Entry
   *
   * Webpack will look at index.tsx for the entrypoint of the app.
   */
  entry: ["./src/index.tsx"],

  /**
   * Output
   *
   * Webpack will output the assets and bundles to the dist folder.
   */
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[hash].bundle.js",
    publicPath: "/",
  },

  module: {
    rules: [
      /**
       * TypeScript (.ts/.tsx files)
       *
       * The TypeScript loader will compile all .ts/.tsx files to .js. Babel is
       * not necessary here since TypeScript is taking care of all transpiling.
       */
      {
        test: /\.ts(x?)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },

      // {
      //   test: /\.ts(x?)$/,
      //   loader: 'awesome-typescript-loader',
        // options: {
        //     getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
        // }
      // },

      /**
       * Fonts
       *
       * Inline font files.
       */
      {
        test: /\.(woff2|woff|eot|ttf|otf)$/,
        loader: 'file-loader'
      },

      /**
       * Markdown
       *
       * Parse raw string.
       */
      {
        test: /\.md$/,
        use: "raw-loader",
      },
    ],
  },

  resolve: {
    // Resolve in this order
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx", ".md"],
    // Allow `@/` to map to `src/`
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "@resources": path.resolve(__dirname, "../src/assets"),
    },
  },

  plugins: [
    // Get environment variables in React
    new webpack.DefinePlugin(envKeys),
    /**
     * CleanWebpackPlugin
     *
     * Removes/cleans build folders and unused assets when rebuilding.
     */
    new CleanWebpackPlugin(),

    new ManifestPlugin({
      // fileName: 'site.webmanifest',
      basePath: '/',
      seed: {
        name: 'PWA EMPTY PROJECT',
        short_name: 'PWA EMPTY PROJECT',
        start_url: '/',
        serviceworker: {
          src: './service-worker.js',
          scope: '/',
          type: '',
          update_via_cache: 'none',
        },
        display: 'fullscreen',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        theme_color: '#F2F3F5',
        background_color: '#F2F3F5',
        apple_mobile_web_app_capable: 'yes',
        apple_mobile_web_app_status_bar_style: 'black-translucent',
        display: 'standalone',
      },
    }),
    /**
     * CopyWebpackPlugin
     *
     * Will copy everything from the public folder to an assets folder in dist.
     */
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: ".",
          // Ignore some files to prevent unnecessary duplication
          globOptions: {
            ignore: ["*.DS_Store", "favicon.ico", "template.html"],
          },
        }
      ],
    }),
    
  ],
};
