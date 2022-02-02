// @flow
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
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
                    value={initialValue}
                    onChangeText={onChange}
                    secureTextEntry={passwordShown}
                    activeOutlineColor={COLORS.primary}
                    outlineColor={"#C4C4C4"}
                    style={[styles.input, {
                        width: short ? SIZES.width * 0.3 : SIZES.width * 0.9,
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

                    <TouchableOpacity style={[styles.eyesBox,{top:2}]} activeOpacity={0.8} onPress={clipboardOnPress}>
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
        marginVertical: 40,
        backgroundColor: 'white',
    },
    input: {
        height: 50,
        borderRadius: 5,
        fontFamily: "Nexa-Book",
        position: "absolute",

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
