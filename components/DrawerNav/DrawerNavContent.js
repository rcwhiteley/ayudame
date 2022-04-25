import react from "react"
import { View, StyleSheet } from 'react-native'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer"
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useAuthContext } from "../../contexts/AuthContext"
import { FontAwesome5 } from '@expo/vector-icons';

export function DrawerNavContent(props) {
    const navigation = useNavigation();
    const { logout } = useAuthContext();
    return (
        <View style={{ flex: 1, height: '100%', justifyContent: "center" }}>
            <View style={styles.content}>

                <View style={{
                    height: '100%',
                    marginBottom: 0,
                }}>
                    <View style={styles.userViewContainer}>
                        <Avatar.Image size={50} source={{ uri: "https://electronicssoftware.net/wp-content/uploads/user.png" }} style={styles.avatar} />
                        <View style={styles.userNameContainer}>
                            <Text style={styles.userName}>Usuario</Text>
                            <Text style={{color:'grey'}}>usuario@gmail.com</Text>
                        </View>
                    </View>
                    <DrawerItem
                        label="Mapa"
                        onPress={() => { navigation.navigate("MapScreen") }}
                        icon={() => (
                            <FontAwesome5 name="map-marked-alt" size={20} color="black" />
                        )}
                    />
                    <DrawerItem
                        label="Configuracion"
                        onPress={() => { navigation.navigate("Configuration") }}
                        icon={() => (
                            <FontAwesome5 style={{ padding: 0, marginHorizontal: 0 }} name="cog" size={20} color="black" />
                        )}
                    />
                </View>
            </View>
            <View>
                <DrawerItem
                    label="Cerrar sesion"

                    onPress={logout}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingTop: 30,
        height: '100%',
        padding: 0,
        flex: 1,
        justifyContent: 'space-between'
    },
    userViewContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 15
    },
    userNameContainer: {
        marginLeft: 10,
        justifyContent: 'center',

    },
    userName:{
        fontSize: 17,
        fontWeight: 'bold',
        marginHorizontal: 'auto'
    },  
    avatar: {
        alignSelf: 'flex-start',
    },
    logout: {
        marginBottom: 15,
        marginHorizontal: 'auto',
        alignSelf: 'flex-end'
    }
});