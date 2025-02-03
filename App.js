import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import ModelsScreen from './screens/ModelsScreen';
import RunningModelsScreen from './screens/RunningModelsScreen';
import SettingsScreen from './screens/SettingsScreen';
import Svg, { Path } from 'react-native-svg';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export const ServerContext = createContext();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
  </Stack.Navigator>
);

const HomeIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24">
    <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor" />
  </Svg>
);

const ModelsIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24">
    <Path d="M12 2L2 7v9l10 5 10-5V7L12 2zm0 2.18l7.5 3.32v6.68L12 17.82 4.5 12.18V5.5L12 4.18z" fill="currentColor" />
  </Svg>
);

const RunningModelsIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24">
    <Path d="M13 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 2c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.14-7-7 3.14-7 7-7zm-1 3v4.59l3.29 3.3 1.41-1.42-2.7-2.7V8H12z" fill="currentColor" />
  </Svg>
);

const SettingsIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24">
    <Path d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.39.12-.59l-1.92-3.32c-.11-.2-.36-.27-.57-.2l-2.39.96c-.5-.38-1.04-.7-1.63-.94L14.5 2.5c-.05-.22-.25-.38-.48-.38h-4c-.23 0-.43.16-.48.38l-.38 2.46c-.59.24-1.13.56-1.63.94l-2.39-.96c-.21-.07-.46 0-.57.2l-1.92 3.32c-.11.2-.06.45.12.59l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.39-.12.59l1.92 3.32c.11.2.36.27.57.2l2.39-.96c.5.38 1.04.7 1.63.94l.38 2.46c.05.22.25.38.48.38h4c.23 0 .43-.16.48-.38l.38-2.46c.59-.24 1.13-.56 1.63-.94l2.39.96c.21.07.46 0 .57-.2l1.92-3.32c.11-.2.06-.45-.12-.59l-2.03-1.58zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" fill="currentColor" />
  </Svg>
);

export default function App() {
  const [server, setServer] = useState('192.168.1.4:8099');

  return (
    <ServerContext.Provider value={{ server, setServer }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="HomeTab"
            component={HomeStack}
            options={{
              headerShown: false,
              tabBarIcon: HomeIcon,
            }}
          />
          <Tab.Screen
            name="Models"
            component={ModelsScreen}
            options={{
              tabBarIcon: ModelsIcon,
            }}
          />
          <Tab.Screen
            name="Running Models"
            component={RunningModelsScreen}
            options={{
              tabBarIcon: RunningModelsIcon,
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: SettingsIcon,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ServerContext.Provider>
  );
}

// import React, { useState, createContext } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './screens/HomeScreen';
// import ChatScreen from './screens/ChatScreen';
// import ModelsScreen from './screens/ModelsScreen';
// import RunningModelsScreen from './screens/RunningModelsScreen';
// import SettingsScreen from './screens/SettingsScreen';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();
// export const ServerContext = createContext();

// const HomeStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="Home" component={HomeScreen} />
//     <Stack.Screen name="Chat" component={ChatScreen} />
//   </Stack.Navigator>
// );

// export default function App() {
//   const [server, setServer] = useState('192.168.1.4:8099');

//   return (
//     <ServerContext.Provider value={{ server, setServer }}>
//       <NavigationContainer>
//         <Tab.Navigator>
//           <Tab.Screen name="HomeTab" component={HomeStack} options={{ headerShown: false }} />
//           <Tab.Screen name="Models" component={ModelsScreen} />
//           <Tab.Screen name="Running Models" component={RunningModelsScreen} />
//           <Tab.Screen name="Settings" component={SettingsScreen} />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </ServerContext.Provider>
//   );
// }
