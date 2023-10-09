import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox, Alert } from 'react-native';
import { useEffect } from "react";

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

import { useNetInfo } from "@react-native-community/netinfo";

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAdrXMFprwGuUMd31TRI-DrJNjzlyyp1UA",
    authDomain: "chatapp-b494a.firebaseapp.com",
    projectId: "chatapp-b494a",
    storageBucket: "chatapp-b494a.appspot.com",
    messagingSenderId: "700251460033",
    appId: "1:700251460033:web:0580c2835b9edac5cbdf40"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Start'
      >
        <Stack.Screen
          name='Start'
          component={Start}
        />
        <Stack.Screen
          name='Chat'
        >
          {(props) => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;
