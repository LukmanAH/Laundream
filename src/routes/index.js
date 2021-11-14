import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen, LoginScreen} from '../pages';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      >
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{gesturesEnabled: false}}
      />
      
    </Stack.Navigator>
  );
};

export default Route;