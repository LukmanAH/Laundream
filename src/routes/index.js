import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen, LoginScreen, HomePage, RegisterScreen, KelolaOutlet} from '../pages';

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
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
        />
      <Stack.Screen
        name="HomePage"
        component={HomePage}
      />
      <Stack.Screen
        name="KelolaOutlet"
        component={KelolaOutlet}
        headerShown= {true}
      />
      
    </Stack.Navigator>
  );
};

export default Route;