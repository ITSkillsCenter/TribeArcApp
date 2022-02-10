// @flow
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import {COLORS} from "../constants";

const CustomTextInput = ({
                             initialValue,
                             placeholderText,
                             props,
                             onChange,
                             inputContainerStyle,
                             title,
                             short,
                             clipboard,
                             clipboardOnPress
                         }) => {


    const [passwordShown, setPasswordShown] = useState(false)


    return (

        <View style={styles.container}>

            <Text style={styles.title}>{title}</Text>
            <TextInput
                {...props}
                value={initialValue}
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
        marginVertical: 10,
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
        height: 50,
        fontSize: 16,
        paddingHorizontal: 10,
        borderRadius: 5,
        opacity:0.7,
        fontFamily: "Nexa-Book",
        // position: "absolute",
        // color:"red"
        backgroundColor: "#f5f5ff"

    },
    eyesBox: {
        justifyContent: "center",
        marginRight: 20,
    },
    eye: {
        marginRight: 40,
        width: 20,
        height: 20,
        alignSelf: 'flex-end',
        position: "absolute",
    }

})
