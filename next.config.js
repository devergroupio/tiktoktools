require("./dotenv.config");
const withLess = require("@zeit/next-less");
const { getThemeVariables } = require("antd/dist/theme");
// const withPurgeCss = require("next-purgecss");
const customConfig = {
  publicRuntimeConfig: {
    BACKEND_URL: process.env.BACKEND_URL,
    // HASURA_GRAPHQL_ADMIN_SECRET: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  },
};
// const withCSS = require("@zeit/next-css");
const defaultConfig = {
  lessLoaderOptions: {
    javascriptEnabled: true,
    overrides: true,
    modifyVars: getThemeVariables({
      dark: true,
    }),
  },
  ...customConfig,
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) {
            return callback();
          }
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals),
      ];
      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader",
      });
    }
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
          name: "[name].[ext]",
        },
      },
    });
    return config;
  },
};
module.exports = withLess(defaultConfig);
