import React, { useState, useEffect } from 'react'
import { Modal, Element, Text, TextInput, Pressable, Alert, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { SingleCharacterInput } from './SingleCharacerInput';
const renderTime = (time) => {
    return (
        <Text style={styles.text} className="time-wrapper">
            {time}
        </Text>
    );
};

const initialCount = 10;
const KEY = "1234"
export const EmergencyModal = ({ visible, setVisible }) => {

    const handleKey = (key) => {
        console.log("handling:" + key);

        if (key == KEY){
            setVisible(false);
        }
        return { clear: true }
           
    }
    const completed = () => {
        setVisible(false);
        showAlert();
    }
    const showAlert = () =>
        Alert.alert(
            "Alerta",
            "Alerta enviada a contactos",
            [
                {
                    text: "Ok",
                    style: "Ok",
                },
            ],
            {
                cancelable: true,
                onDismiss: () => { }

            }
        );

    return (
        <Modal

            animationType='fade'
            transparent={true}
            visible={visible}>

            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <CountdownCircleTimer
                        isPlaying={visible}

                        duration={initialCount}
                        onComplete={completed}
                        colors="#A30000"
                    >
                        {({ remainingTime }) => <Text style={styles.text} >{remainingTime}</Text>}
                    </CountdownCircleTimer>
                </View>
                <Text onPress={() => setVisible(false)}>Ingrese su clave secreta para cancelar alerta</Text>
                <Text onPress={() => setVisible(false)}>CLAVE: 1234</Text>
                <SingleCharacterInput handleInput={(text) => handleKey(text)}>

                </SingleCharacterInput>
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(250,125, 0, 0.95)',
        borderRadius: 10,
        margin: 10,
    },
    coountdown: {
        alignSelf: 'center',
        fontSize: 100,
        fontWeight: 'bold',
        color: 'darkred',
    },
    inputContainer: {
        backgroundColor: 'rgba(250,125, 0, 0)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    codeInput: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 20,
        margin: 5,
        paddingHorizontal: 5,
        textAlign: 'center'
    },
    text: {
        fontSize: 50,
    }
});
