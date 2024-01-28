/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import OnboardingScreen from './src/screen/Onboarding/OnboardingScreen';
import LoginScreen from './src/screen/Login/LoginScreen';
import RegisterScreen from './src/screen/Register/RegisterScreen';
import OtpScreen from './src/screen/Otp/OtpScreen';
import PasswordScreen from './src/screen/Password/PasswordScreen';
import SignUp from './src/screen/Dashboard/Signup';
import AlmostDone from './src/screen/Dashboard/AlmostDone';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './src/navigation/AuthNavigation';
import { Provider } from 'react-redux'
import { store } from './src/redux/store';


function App(): React.JSX.Element {


  return (
   <Provider store={store}>
     <NavigationContainer>
      <AuthNavigation/>
    </NavigationContainer>
   </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
