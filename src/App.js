import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Route from './routes';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-native-paper';

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <StatusBar />
        <Route />
      </NavigationContainer>
    </Provider>
  );
}
