import { registerRootComponent } from 'expo';
import 'expo-dev-client';
//import { AppRegistry } from 'react-native';
import App from './frontend/App';
//import { name as SalaperMovil } from './app.json';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
