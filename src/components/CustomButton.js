// @flow
import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, SIZES} from "../constants";
import {FONTS} from "../constants/theme";

const CustomButton = ({filled, text, onPress, loading, containerStyle, textStyle}) => {

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
        marginVertical: 15,
    },
    button: {
        height: SIZES.width * 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    text: {
        ...FONTS.h8,
        color: COLORS.white,
    }

})
