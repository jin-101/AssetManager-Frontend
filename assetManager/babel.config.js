module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@assets": "./assets",
            "@components": "./components",
            "@constants": "./constants",
            "@pages": "./pages",
            "@reducers": "reducers",
            "@services": "services",
            "@styles": "styles",
            "@utils": "utils",
            "@views": "./views",
          },
        },
      ],
    ],
  };
};
