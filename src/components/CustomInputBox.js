// @flow
import React, {useRef, useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text, Animated} from "react-native";
import {COLORS, icons, SIZES} from "../constants";
import {TextInput} from "react-native-paper";

const CustomInputBox = ({
                            initialValue,
                            placeholderText,
                            props,
                            onChange,
                            inputContainerStyle,
                            isPassword,
                            label,
                            short
                        }) => {


    const labelAnim = useRef(new Animated.Value(0)).current

    const Anim = () => {

        Animated.timing(labelAnim, {
            toValue: 20,
            duration: 500,
            useNativeDriver: false,
            // extrapolate: "clamp"
        })
    }

    const [isFocused, setIsFocused] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false)


    return (
        <View>
            {/*<View style={{alignSelf: "flex-start"}}>*/}
            {/*    {isFocused && <Text style={styles.label}>{label}</Text>}*/}
            {/*</View>*/}


            <View style={styles.container}>

                <TextInput
                    {...props}
                    mode={"outlined"}
                    // placeholder={isFocused ? "" : placeholderText}
                    // placeholder={placeholderText}
                    label={placeholderText}
                    value={initialValue}
                    onChangeText={onChange}
                    // onBlur={() => setIsFocused(false)}
                    // placeholderTextColor={"#000000"}
                    // onFocus={() => setIsFocused(true)}
                    secureTextEntry={passwordShown}
                    activeOutlineColor={COLORS.primary}
                    outlineColor={"#C4C4C4"}
                    style={[styles.input, {
                        ...inputContainerStyle,
                        width: short ? SIZES.width * 0.3 : SIZES.width * 0.9,
                        // borderColor: isFocused ? COLORS.primary : "#C4C4C4"
                    }]}
                />

                {isPassword && <TouchableOpacity style={styles.eyesBox}
                                                 onPress={() => !passwordShown ? setPasswordShown(true) : setPasswordShown(false)}>

                    {passwordShown ? <Image style={styles.eye} source={icons.eyeClosed}/> :
                        <Image style={styles.eye} source={icons.eyeOpen}/>}

                </TouchableOpacity>}

            </View>
        </View>

    );
};

export default CustomInputBox

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 40,
        // position
    },
    label: {
        left: 10,
        top: 5,
        fontFamily: "Nexa-Book",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: 'white',
        zIndex: 10,
        // width: 50
        color: COLORS.primary,
        paddingHorizontal: 5,
        position: 'absolute',
    },
    input: {
        // paddingLeft: 20,
        height: 50,
        borderRadius: 5,
        // borderColor: "black",
        // borderWidth: 0.5,
        fontFamily: "Nexa-Book",
        position: "absolute",

    },
    eyesBox: {
        // backgroundColor:'red',
        justifyContent: "center",
        marginRight: 20,
        // alignItems: "center"
    },
    eye: {
        marginRight: 40,
        width: 20,
        height: 20,
        alignSelf: 'flex-end',
        position: "absolute",
        // padding:20

    }

})
