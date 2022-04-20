import React, {useState} from 'react'
import { View, Button, Text } from "react-native";
import { DrawerRouter, NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MapScreen from "../../views/map-screen/MapScreen";
import Configuration from "../../views/configuration/Configuration";
import { DrawerNavContent } from "../../components/DrawerNav/DrawerNavContent";
import Login from "../../views/login/Login";
const Drawer = createDrawerNavigator();

const Main = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <Drawer.Navigator backBehavior="history" useLegacyImplementation drawerContent={(props) => <DrawerNavContent {...props}/>}>
            <Drawer.Screen name="MapScreen" component={MapScreen}  />
            <Drawer.Screen name="Configuration" component={Configuration} />
            <Drawer.Screen name="Login" component={Login}/>
        </Drawer.Navigator>
    )
}

export default Main;