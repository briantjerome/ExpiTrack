
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NameInputScreen from './NameInputScreen';
import LoadingScreen from './LoadingScreen';
import ProductInputScreen from './ProductInputScreen';
import EditProductScreen from './EditProductScreen';
import HomeScreen from './Homescreen'; // Import the HomeScreen component
import LandingPage from './LandingPage'; // Import the LandingPage component

const Stack = createStackNavigator();

export default function App() {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Stack.Navigator initialRouteName="LandingPage">
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="ExpiTrack" component={HomeScreen} />
          <Stack.Screen name="Category" component={NameInputScreen} />
          <Stack.Screen name="ProductInput" component={ProductInputScreen} />
          <Stack.Screen name="EditProduct" component={EditProductScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}