import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './views/login/Login';

import Main from './navigations/main/Main';
import React, { useState } from 'react'
import { AuthContextProvider } from './contexts/AuthContext';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthContextProvider>
      
        <Main></Main>
      
    </AuthContextProvider>

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
