import React from "react";
import {Platform, ScrollView, TouchableOpacity, Text, StyleSheet, Image,ImageBackground, TextInput, SafeAreaView, KeyboardAvoidingView} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
const image = require('../../assets/Rojito.jpg');
const logo = require('../../assets/adaptatiteIcon1.png');
const logoGoogle = require('../../assets/icongoogle.png');

const Login = ({navigation, setLoggedIn}) =>{
    const [correo, YaEscritoEmail] = React.useState(null);
    const [contrasenha, YaEscritoContra] = React.useState(null);
    return(
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
            <ImageBackground source = {image} resizeMode="cover" style={styles.image}>
              <ScrollView>
                <Image
                  style={styles.logo}
                  source={logo}
                />
                <SafeAreaView  style={styles.cuadrito}>
                      
                      <Text style={styles.baseText}>
                          Bienvenido/@</Text>
                          <TextInput
                          style={styles.input}
                          onChangeText={YaEscritoEmail}
                          value={correo}
                          placeholder="Pon tu email"/>
                          <TextInput
                          style={styles.input}
                          onChangeText={YaEscritoContra}
                          value={contrasenha}
                          placeholder="Pon tu contraseña"/>
                      <TouchableOpacity 
                        style = {styles.button}
                        activeOpacity={0.5}
                          onPress = { () => {
                              setLoggedIn(true);
                              }}>
                                <Text
                                style={styles.textoboton}>Iniciar Sesion</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={styles.buttonGoogle}
                        activeOpacity={0.5}
                          onPress = { () => {
                            setLoggedIn(true)}}>
                                <Image
                                  source={logoGoogle}
                                  style={styles.buttonImageIconStyle}
                                />
                                <Text
                                style={styles.buttonTextStyle}>Iniciar Sesion con Google</Text>
                        </TouchableOpacity>
                  </SafeAreaView >
              </ScrollView>
            </ImageBackground>
            
        </SafeAreaView >
    </KeyboardAvoidingView>

        
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
      },
      image: {
        flex: 1, 
        justifyContent: "center",
      },
      cuadrito:{
        flex: 1, 
        backgroundColor: "#FFFFFF",
        marginTop:10,
        marginBottom:80,
        marginLeft:50,
        marginRight:50,
        borderRadius: 20,
        padding:10,
      },
      baseText:{
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        fontSize: 20,
        textAlign: "center",
      },
      textoboton:{
        fontFamily: 'Roboto',
        fontWeight: 'bold',
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#cdcdcd",
        color:'black',
      },
      button: {
        alignItems: 'center',
        backgroundColor: "#DDDDDD",
        padding: 10,
        borderRadius: 20,
        margin: 10,
        borderWidth: 0.5,
        borderColor: '#fff',
      },
      buttonGoogle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dc4e41',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        borderRadius:20,
        margin: 10,
      },
      buttonImageIconStyle: {
        padding: 10,
        margin: 10,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
      },
      buttonTextStyle: {
        color: '#fff',
        marginBottom: 4,
        marginLeft: 12,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
      },
      logo: {
        flex: 2, 
        width: 250,
        height: 250,
        marginLeft:70,
        marginTop:30,
      },
});

export default Login;