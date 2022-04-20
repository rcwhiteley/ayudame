import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './views/login/Login';
import Main from './navigations/main/Main';
import React, {useState} from 'react'


const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn)
  if(loggedIn == false) 
    return (<Login setLoggedIn={setLoggedIn}></Login>)
  else
    return (
    <NavigationContainer>
      <Main></Main>
    </NavigationContainer>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
