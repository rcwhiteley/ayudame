import React from "react";
import { Platform, ScrollView, TouchableOpacity, Text, StyleSheet, Image, ImageBackground, TextInput, SafeAreaView, KeyboardAvoidingView } from "react-native";
import { useAuthContext } from "../../contexts/AuthContext";
import { NavigationContainer } from '@react-navigation/native';
const image = require('../../assets/Rojito.jpg');
const logo = require('../../assets/adaptatiteIcon1.png');
const logoGoogle = require('../../assets/icongoogle.png');
const logoincognito = require('../../assets/modoincognito.png');

import FontAwesome from '@expo/vector-icons/FontAwesome';

const Login = ({ navigation, setLoggedIn }) => {
  //const [correo, YaEscritoEmail] = React.useState(null);
  //const [contrasenha, YaEscritoContra] = React.useState(null);
  const { login } = useAuthContext();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <ScrollView>
            <Image
              style={styles.logo}
              source={logo}
            />
            <SafeAreaView style={styles.cuadrito}>

              <Text style={styles.baseText}>
                Bienvenido/@</Text>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={() => {
                  login("TOKEN_USUARIO");
                }}>
                  <Image
                  source={logoincognito}
                  style={styles.buttonImageIconStyle}
                  />
                <Text
                  style={styles.textoboton}>Iniciar sesión modo invitado</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonGoogle}
                activeOpacity={0.5}
                onPress={() => {
                  login("TOKEN_USUARIO_GOOGLE")
                }}>
                <Image
                  source={logoGoogle}
                  style={styles.buttonImageIconStyle}
                />
                <Text
                  style={styles.buttonTextStyle}>Iniciar sesión con Google</Text>
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
  cuadrito: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent:'center',
    //marginTop: 20,
    marginBottom: 30,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 20,
    padding: 20,
  },
  baseText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontSize: 30,
    textAlign: "center",
  },
  
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#cdcdcd",
    color: 'black',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#DDDDDD",
    padding: 20,
    borderRadius: 20,
    margin: 10,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  buttonGoogle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#dc4e41',
    borderWidth: 0.5,
    borderColor: '#fff',
    padding: 20,
    //height: 40,
    borderRadius: 20,
    margin: 10,
  }, 
  buttonImageIconStyle: {
    padding: 10,
    //marginLeft: 1,
    height: 50,
    width: 50,
    resizeMode: 'stretch',
  },
  textoboton: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 19,
  },
  buttonTextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginLeft: 5,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 19,
  },
  logo: {
    flex: 2,
    width: 250,
    height: 250,
    //marginLeft: 80,
    marginTop: 30,
    alignSelf: 'center',
  },
});

export default Login;