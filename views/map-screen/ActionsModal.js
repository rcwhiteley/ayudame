import React from 'react'
import { Modal, Text, Pressable, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Button = (props) => {
    return (
        <Pressable onPress={() => props.onPress()} style={props.style}>
            <Text style={props.textStyle}>{props.title}</Text>
        </Pressable>);
}

export const ActionsModal = ({ visible, setVisible, notifyAction }) => {
    return (
        <Modal

            style={{ flex: 1 }}
            animationType='slide'
            transparent={true}

            visible={visible}>

            <View style={styles.container}>
                <Ionicons name="close" size={30} color="grey" iconStyle={styles.exitButton} onPress={() => setVisible(false)} />
                <Button style={styles.button} textStyle={styles.text} title='asalto' onPress={() => notifyAction('asalto')}></Button>
                <Button style={styles.button} textStyle={styles.text} title='robo' onPress={() => notifyAction('robo')}></Button>
                <Button style={styles.button} textStyle={styles.text} title='rapto' onPress={() => notifyAction('rapto')}></Button>
                <Button style={styles.button} textStyle={styles.text} title='grupo molesto' onPress={() => notifyAction('grupo_molesto')}></Button>
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
        position: 'absolute',
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