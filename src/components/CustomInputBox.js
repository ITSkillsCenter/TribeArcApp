// @flow
import React, {useState} from 'react';
import {Image, Platform, StyleSheet, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES} from "../constants";
import {TextInput} from "react-native-paper";

const CustomInputBox = ({
                            initialValue,
                            placeholderText,
                            props,
                            onChange,
                            inputContainerStyle,
                            isPassword,
                            short,
                            clipboard,
                            clipboardOnPress
                        }) => {


    const [passwordShown, setPasswordShown] = useState(false)


    return (
        <View>

            <View style={styles.container}>

                <TextInput
                    {...props}
                    mode={"outlined"}
                    label={placeholderText}
                    // selectionColor={"red"}
                    value={initialValue}
                    caretHidden={false}
                    onChangeText={onChange}
                    autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
                    // placeholderTextColor={"#999999"}
                    secureTextEntry={passwordShown}
                    activeOutlineColor={COLORS.primary}
                    outlineColor={"#C4C4C4"}
                    // Style={{color: "red"}}
                    style={[styles.input, {
                        // fontSize: 16,
                        width: short ? SIZES.width * 0.3 : "100%",
                        ...inputContainerStyle,
                        backgroundColor: 'white',
                    }]}
                />


                {isPassword && <TouchableOpacity style={styles.eyesBox}
                                                 onPress={() => !passwordShown ? setPasswordShown(true) : setPasswordShown(false)}>

                    {passwordShown ? <Image style={styles.eye} source={icons.eyeClosed}/> :
                        <Image style={styles.eye} source={icons.eyeOpen}/>}


                </TouchableOpacity>}
                {clipboard &&
                    <TouchableOpacity style={[styles.eyesBox, {top: 2}]} activeOpacity={0.8} onPress={clipboardOnPress}>
                        <Image style={[styles.eye, {
                            width: 45, height: 50
                        }]} source={icons.clipboard}/>
                    </TouchableOpacity>

                }

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
        marginVertical: SIZES.width * 0.1,
        backgroundColor: 'white',
    },
    input: {
        fontSize: SIZES.width * 0.04,
        height: SIZES.width * 0.13,
        // paddingVertical:2,
        // borderRadius: 5,
        fontFamily: "Nexa-Book",
        position: "absolute",
        lineHeight:30
        // color:"red"


    },
    eyesBox: {
        justifyContent: "center",
        marginRight: 20,
        zIndex: 10
    },
    eye: {
        marginRight: 40,
        width: 25,
        height: 25,
        alignSelf: 'flex-end',
        position: "absolute",
    }

})
