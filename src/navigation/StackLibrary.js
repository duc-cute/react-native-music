import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import LibraryScreen from '../screens/Library';
import Favorites from '../screens/Favorites';

const Stack = createNativeStackNavigator();

function StackLibrary() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          headerShown: false
        }}
      />
    <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerShown: false
        }}
        initialParams={{ title: 'Extraordinary Machine' }}
    />
    </Stack.Navigator>
  );
}

export default StackLibrary;
