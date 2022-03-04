// @flow
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES} from "../constants";

const CustomTextInput = ({
                             initialValue,
                             placeholderText,
                             props,
                             onChange,
                             inputContainerStyle,
                             title,
                             onEndEditing,
                             onFocus,
                             onBlur,isPassword

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
    eyesBox: {
        justifyContent: "center",
        marginRight: 20,
        zIndex: 10,
        backgroundColor:"red",
    },
    eye: {
        marginRight: 40,
        width: 30,
        height: 30,
        alignSelf: 'flex-end',
        position: "absolute",
        // backgroundColor:"red",
        bottom:SIZES.width*0.03


    }


})
