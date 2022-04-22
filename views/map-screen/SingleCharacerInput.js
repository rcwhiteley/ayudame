import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput, View } from 'react-native';




export const SingleCharacterInput = ({ handleInput }) => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);

    const [char1, setChar1] = useState('');
    const [char2, setChar2] = useState('');
    const [char3, setChar3] = useState('');
    const [char4, setChar4] = useState('');

    useEffect(() => {
        let text = char1 + char2 + char3 + char4
        if (text.length < 4) return;

        let result = handleInput(text)
        if (result.clear) {
            ref1.current.clear();
            ref2.current.clear();
            ref3.current.clear();
            ref4.current.clear();
            ref1.current.focus()
            setChar1('');
            setChar2('');
            setChar3('');
            setChar4('');
        }
    }, [char1, char2, char3, char4]);

    clear =(ref)=>{
        //ref.current.clear();
    }

    const handleChange = (index, text) => {
        switch (index) {
            case 1: {
                ref2.current.focus();
                setChar1(text);
                break;
            }
            case 2: {
                ref3.current.focus();
                setChar2(text);
                break;
            }
            case 3: {
                ref4.current.focus();
                setChar3(text);
                break;
            }
            case 4: {
                setChar4(text);
                break;
            }
        }
    }
    return (
        <View style={styles.inputContainer}>

            <TextInput ref={ref1} onFocus={()=>{clear(ref1)}} keyboardType='number-pad' onChangeText={(text) => handleChange(1, text)} style={styles.codeInput}></TextInput>
            <TextInput ref={ref2} onFocus={()=>{clear(ref1)}} keyboardType='number-pad' onChangeText={(text) => handleChange(2, text)} style={styles.codeInput}></TextInput>
            <TextInput ref={ref3} onFocus={()=>{clear(ref1)}} keyboardType='number-pad' onChangeText={(text) => handleChange(3, text)} style={styles.codeInput}></TextInput>
            <TextInput ref={ref4} onFocus={()=>{clear(ref1)}} keyboardType='number-pad' onChangeText={(text) => handleChange(4, text)} style={styles.codeInput}></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({

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
})