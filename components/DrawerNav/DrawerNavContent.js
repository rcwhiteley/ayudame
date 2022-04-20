import react from "react"
import { View, StyleSheet } from 'react-native'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer"
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useAuthContext } from "../../contexts/AuthContext"


export function DrawerNavContent(props) {
    const navigation = useNavigation();
    const {logout} = useAuthContext();
    return (
        <DrawerContentScrollView {...props}>
            {/* <DrawerItemList {...props}>
                
            </DrawerItemList> */}
            <DrawerItem 
                    label="Mapa"
                    onPress={()=> {navigation.navigate("MapScreen")}}
                />
                <DrawerItem 
                    label="Configuracion"
                    onPress={()=> {navigation.navigate("Configuration")}}
                />
                <DrawerItem 
                label="Cerrar Sesion"
                
                onPress={()=> {logout()}}
            />
        </DrawerContentScrollView>
    );
}