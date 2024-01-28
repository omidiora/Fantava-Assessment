import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from '../screen/Register/RegisterScreen';
import LoginScreen from '../screen/Login/LoginScreen';
import OtpScreen from '../screen/Otp/OtpScreen';
import PasswordScreen from '../screen/Password/PasswordScreen';
import SignUp from '../screen/Dashboard/Signup';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} /> */}
      {/* <Stack.Screen name="Otp" component={OtpScreen} /> */}
      <Stack.Screen name="CreatePassword" component={PasswordScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
