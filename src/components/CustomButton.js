// @flow
import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, SIZES} from "../constants";

const CustomButton = ({filled, text, onPress, loading,containerStyle,textStyle }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.6} onPress={onPress}
                              style={[styles.button, {backgroundColor: filled ? COLORS.primary : COLORS.secondary, ...containerStyle}]}>

                {loading ? <ActivityIndicator size={"small"} color={COLORS.white}/> :
                    <Text style={[styles.text, {...textStyle}]}>{text}</Text>}
            </TouchableOpacity>

        </View>
    );
};

export default CustomButton


const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        // width:SIZES.width*0.9
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    button: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    text: {
        fontSize: 18,
        fontFamily: "Nexa-Bold",
        color: COLORS.white,
        // fontWeight: '700'
    }

})
