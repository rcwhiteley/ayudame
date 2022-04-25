import React from 'react'
import { Modal, Text, Pressable, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper'
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export const ActionsModal = ({ visible, setVisible, notifyAction }) => {
    return (
        <Modal

            style={{ flex: 1 }}
            animationType='slide'
            transparent={true}

            visible={visible}>
            <View style={styles.container}>
                <View style={styles.exitContainer}>
                <Ionicons name="close" size={30} color="grey" iconStyle={styles.exitButton} onPress={() => setVisible(false)} />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: '50%', padding: 2}}>
                        <Button style={styles.button} mode='outlined' labelStyle={{color:'blue'}} title='asalto' onPress={() => notifyAction('asalto')}>Asalto</Button>
                        <Button style={styles.button} mode='outlined' labelStyle={{color:'blue'}} title='robo' onPress={() => notifyAction('robo')}>Robo</Button>
                    </View>
                    <View style={{width: '50%', padding: 2}}>
                        <Button style={styles.button} mode='outlined' labelStyle={{color:'blue'}} title='rapto' onPress={() => notifyAction('rapto')}>Rapto</Button>
                        <Button style={styles.button} mode='outlined' labelStyle={{color:'blue'}} title='grupo molesto' onPress={() => notifyAction('grupo_molesto')}>Grupo Molesto</Button>
                    </View>
                </View>
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-end',
        flex: 1,
        padding: 10,
        paddingTop: 10,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
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

    },
    exitButton: {
        alignSelf: 'flex-end',
        margin: 0
    }
});