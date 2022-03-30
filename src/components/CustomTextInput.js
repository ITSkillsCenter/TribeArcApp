// @flow
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES} from "../constants";
import {FONTS} from "../constants/theme";

const CustomTextInput = ({
                             initialValue,
                             placeholderText,
                             props,
                             onChange,
                             inputContainerStyle,
                             title,
                             onEndEditing,
                             onFocus,
                             onBlur, isPassword

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

            {isPassword && <TouchableOpacity style={styles.eyesBox}
                                             onPress={() => !passwordShown ? setPasswordShown(true) : setPasswordShown(false)}>

                {passwordShown ? <Image style={styles.eye} source={icons.eyeClosed}/> :
                    <Image style={styles.eye} source={icons.eyeOpen}/>}


            </TouchableOpacity>}
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
        ...FONTS.body10,
        color: COLORS.primary,
        marginBottom: 5,
        opacity: 0.6,

    },
    input: {
        ...FONTS.body9,
        height: SIZES.width * 0.12,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: "#f5f5ff",
        color: COLORS.black

    },
    eyesBox: {
        justifyContent: "center",
        marginRight: 20,
        zIndex: 10,
        backgroundColor: "red",
    },
    eye: {
        marginRight: 40,
        width: 30,
        height: 30,
        alignSelf: 'flex-end',
        position: "absolute",
        // backgroundColor:"red",
        bottom: SIZES.width * 0.03


    }


})
