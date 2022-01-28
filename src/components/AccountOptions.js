// @flow
import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import {COLORS, SIZES} from "../constants";


const AccountOptions = ({image, text, onPress}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.container}>
            <Image source={image} style={styles.image}/>
            <Text style={styles.text}>{text}</Text>

        </TouchableOpacity>
    );
};

export default AccountOptions


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: "100%",
        // height: 60,
        height:SIZES.height*0.08,

        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "#dcdcdc",
        alignItems: "center",
        paddingHorizontal: 20,
        marginVertical:15
    },
    image: {
        width: 40,
        height: 40
    },
    text: {
        fontSize: 16,
        fontFamily: "Nexa-Book",
        color: COLORS.black,
        // backgroundColor:"cyan",
        width: '70%',
        paddingHorizontal: 10

    }
})
