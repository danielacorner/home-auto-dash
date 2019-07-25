module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo','module:metro-react-native-babel-preset'],
    plugins: [
    ["import", { libraryName: "@ant-design/react-native" }] // The difference with the Web platform is that you do not need to set the style
  ]
  };
};
