import React from 'react'
import { Modal, Text, Pressable, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

export const ActionsModal = ({ visible, setVisible, notifyAction }) => {
    return (
        <Modal

            style={{ flex: 1 }}
            animationType='slide'
            transparent={true}
            visible={visible}
            onRequestClose={()=>{setVisible(false);}}>
            <TouchableOpacity style={styles.mainContainer} onPress={()=>{setVisible(false);}}>
                <TouchableOpacity style={styles.container} onPress={()=>{setVisible(false);}}>
                    <Ionicons name="close" size={30} color="grey" style={styles.exitButton} onPress={() => setVisible(false)} />
                    <Button mode='contained' style={styles.button} textStyle={styles.text} title='asalto' onPress={() => notifyAction('asalto')}>Asalto</Button>
                    <Button mode='contained' style={styles.button} textStyle={styles.text} title='robo' onPress={() => notifyAction('robo')}>Robo</Button>
                    <Button mode='contained' style={styles.button} title='rapto' onPress={() => notifyAction('rapto')}>Rapto</Button>
                    <Button mode='contained' style={styles.button} title='grupo molesto' onPress={() => notifyAction('grupo_molesto')}>Grupo molesto</Button>

                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>

    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        margin: 0,
    },
    container: {
        alignSelf: 'flex-end',
        flex: 1,
        padding: 20,
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 140,
        borderRadius: 10
    },

    button: {
        marginVertical: 5,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    exitContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        borderColor: 'black',
        borderWidth: 1
    },
    exitButton: {
        alignSelf: 'flex-end',
        margin: 0
    }
});