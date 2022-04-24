import React from 'react'
import {Modal, View} from 'react-native'
import { Button } from '../../components/Button'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export const PositionSourceModal = ({visible,setPositionSource})=>{
    return (
        <Modal
            style={{ flex: 1 }}
            transparent={true}
            visible={visible}>
            <View style={styles.container}>
                 <Ionicons name="close" size={30} color="grey" iconStyle={styles.exitButton} onPress={() => setPositionSource('')} /> 
                <Button style={styles.button} textStyle={styles.text} title='Mi posicion actual' onPress={() => setPositionSource('currentPosition')}></Button>
                <Button style={styles.button} textStyle={styles.text} title='Elegir en mapa' onPress={() => setPositionSource('select')}></Button>        
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-end',
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        bottom: 0,
        borderRadius: 10
    },

    button: {
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#3464eb',
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