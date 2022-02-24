// @flow
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import {COLORS, SIZES} from "../constants";

const CustomTextInput = ({
                             initialValue,
                             placeholderText,
                             props,
                             onChange,
                             inputContainerStyle,
                             title,
                             onEndEditing,
                             onFocus,
                             onBlur

                         }) => {


    const [passwordShown, setPasswordShown] = useState(false)


    return (

        <View style={styles.container}>

            <Text style={styles.title}>{title}</Text>
            <TextInput
                {...props}
                onBlur={onBlur}
                onFocus={onFocus}
                value={initialValue}
                onEndEditing={onEndEditing}
                placeholder={placeholderText}
                placeholderTextColor={"#777777"}
                onChangeText={onChange}
                secureTextEntry={passwordShown}
                style={[styles.input, {
                    ...inputContainerStyle,
                }]}
            />


        </View>

    );
};

export default CustomTextInput

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        // justifyContent: 'center',
        marginVertical: 5,
        backgroundColor: 'white',
        // marginTop:50
    },
    title: {
        color: COLORS.primary,
        fontSize: 14,
        marginBottom: 5,
        opacity: 0.6,
        fontFamily: "Nexa-Book"

    },
    input: {
        height: SIZES.width * 0.12,
        fontSize: 14,
        paddingHorizontal: 10,
        borderRadius: 5,
        // opacity:0.7,
        fontFamily: "Nexa-Book",
        // position: "absolute",
        // color:"red"
        backgroundColor: "#f5f5ff",
        color: COLORS.black

    },


})
