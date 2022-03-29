// @flow
import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image, Pressable} from "react-native";
import {COLORS, SIZES} from "../constants";
import {FONTS} from "../constants/theme";


const AccountOptions = ({image, text, onPress}) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image source={image} style={styles.image}/>
            <Text style={styles.text}>{text}</Text>

        </Pressable>
    );
};

export default AccountOptions


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: "100%",
        height: SIZES.height * 0.07,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "#dcdcdc",
        alignItems: "center",
        paddingHorizontal: 20,
        marginVertical: SIZES.width * 0.03
    },
    image: {
        width: SIZES.width * 0.09,
        height: SIZES.width * 0.09
    },
    text: {
        ...FONTS.body9,
        color: COLORS.black,
        width: '70%',
        paddingHorizontal: 10

    }
})
