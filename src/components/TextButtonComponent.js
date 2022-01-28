// @flow
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "../constants";

export const TextButtonComponent = ({text, pressable, onPress}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.pressable}>{pressable}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TextButtonComponent


const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        marginVertical:20
    },
    text: {
        fontSize:16,
        marginHorizontal:5,
        fontFamily:"Nexa-Book",
        color: COLORS.black
    },
    pressable: {
        fontSize:16,
        fontFamily:"Nexa-Bold",
        color: COLORS.secondary
    }


})
