import React, { useState, useContext } from 'react'
import { View, Button, Text } from "react-native";
import { DrawerRouter, NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MapScreen from "../../views/map-screen/MapScreen";
import Configuration from "../../views/configuration/Configuration";
import { DrawerNavContent } from "../../components/DrawerNav/DrawerNavContent";
import Login from "../../views/login/Login";
import { useAuthContext } from '../../contexts/AuthContext';
const Drawer = createDrawerNavigator();

const Main = () => {
    const {token } = useAuthContext();
    return (
        <>
            {token == null ? (
                <Login />
            ) : (

                <NavigationContainer>
                    <Drawer.Navigator backBehavior="history" useLegacyImplementation drawerContent={(props) => <DrawerNavContent {...props} />}>
                        <Drawer.Screen name="MapScreen" component={MapScreen} />
                        <Drawer.Screen name="Configuration" component={Configuration} />
                        <Drawer.Screen name="Login" component={Login} />
                    </Drawer.Navigator>
                </NavigationContainer>
            )

            }</>
    )
}

export default Main;