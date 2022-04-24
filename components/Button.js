import React from 'react'
import { Text, Pressable } from 'react-native'

export const Button = (props) => {
    return (
        <Pressable onPress={() => props.onPress()} style={props.style}>
            <Text style={props.textStyle}>{props.title}</Text>
        </Pressable>);
}