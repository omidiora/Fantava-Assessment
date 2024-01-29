// mock-setup.js

// Mock any global setup needed for your tests
// For example, you might want to set up a mock for an API library or configure testing libraries

// Example: Mock AsyncStorage (React Native storage)
// This is just a basic example; you might need more sophisticated mocking based on your project's needs.
jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
  }));
  
  // You can add more global mocks or configurations based on your requirements.
  