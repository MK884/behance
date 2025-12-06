module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        root:['./app'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
          "@components": "./app/components",
          "@screens": "./app/screens",
          "@assets": "./app/assets",
          "@utils": "./app/utils",
          "@services": "./app/services",
          "@hooks": "./app/hooks",
          "@navigation": "./app/navigation",
          "@api": "./app/api",
          "@appTypes": "./app/types",
        }
      }
    ]
    ,"react-native-worklets/plugin"]
};
