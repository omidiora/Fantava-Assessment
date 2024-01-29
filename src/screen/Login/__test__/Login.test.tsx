// __tests__/YourComponent.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer, NavigationContainerProps } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import YourComponent from '../YourComponent';
import RegisterScreen from '../../Register/RegisterScreen';
import OtpScreen from '../../Otp/OtpScreen';

// Define your RootParamList
type RootParamList = {
  Register: undefined;
  Otp: undefined;
};

const Stack = createNativeStackNavigator<RootParamList>();

const renderWithNavigation = (component: React.ReactNode) => {
  return render(
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mockNavigate = jest.fn();

// Mock the navigation prop
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: (): NavigationContainerProps<RootParamList> => ({
    navigate: mockNavigate,
  }),
}));

describe('YourComponent', () => {
  it('navigates when TouchableOpacity is clicked', () => {
    const { getByText } = renderWithNavigation(<RegisterScreen />);

    const proceedButton = getByText('Proceed');

    // Simulate TouchableOpacity press
    fireEvent.press(proceedButton);

    // Check if navigation was called with the correct screen name
    expect(mockNavigate).toHaveBeenCalledWith('OtpScreen');
  });
});
