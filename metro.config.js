const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

// Modificar configuración de resolución
defaultConfig.resolver = {
  ...defaultConfig.resolver,
  extraNodeModules: {
    crypto: require.resolve('react-native-crypto'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer/'),
  },
  // Agregamos extensiones soportadas
  sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs', 'gql', 'graphql'],
};

// Configuración del transformador
defaultConfig.transformer = {
  ...defaultConfig.transformer,
  babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
};

defaultConfig.resolver.extraNodeModules = {
  ...defaultConfig.resolver.extraNodeModules,
  src: path.resolve(__dirname, 'src'),
};

module.exports = defaultConfig;
