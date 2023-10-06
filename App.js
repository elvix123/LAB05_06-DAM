import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';


import HomeScreen from './screens/HomeScreen';
import UploadScreen from './screens/UploadScreen';
import DetailsScreen from './screens/DetailsScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Upload" component={UploadScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Fotos') {
              iconName = focused ? 'ios-images' : 'ios-images-outline';
            } else if (route.name === 'Subir Foto') {
              iconName = focused ? 'ios-cloud-upload' : 'ios-cloud-upload-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Fotos" component={HomeStackScreen}  />
        <Tab.Screen name="Subir Foto" component={UploadScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
