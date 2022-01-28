import React from "react";
import {useState} from "react";

import {StyleSheet, Text, View} from "react-native";
import {COLORS, SIZES} from "../constants";
import {TextInput} from "react-native-paper";
import {MaskedTextInput} from "react-native-mask-text";

const ShortTextInput = ({
                            placeholderText,
                            initialValue,
                            onChange,
                            shown,
                            inputContainerStyle,
                            label,
                            mask,
                            props
                        }) => {

    const [isFocused, setIsFocused] = useState(false);

    return (
        <View>
            {/*<View style={{alignSelf: "flex-start"}}>*/}
            {/*    <Text style={styles.label}>{label}</Text>*/}
            {/*</View>*/}


            <View style={styles.container}>

                <TextInput
                    mode={"outlined"}
                    label={placeholderText}
                    // placeholder={isFocused ? "" : placeholderText}
                    // placeholder={placeholderText}
                    value={initialValue}
                    // onChangeText={onChange}
                    // onBlur={() => setIsFocused(false)}
                    placeholderTextColor={"#A3A3A3"}
                    activeOutlineColor={COLORS.primary}
                    outlineColor={"#C4C4C4"}
                    // onFocus={() => setIsFocused(true)}
                    secureTextEntry={shown ? true : false}
                    style={[styles.input, {
                        ...inputContainerStyle,
                        width: SIZES.width * 0.28,
                        // borderColor: isFocused ? COLORS.primary : "#C4C4C4"
                    }]}
                    render={props =>

                        <MaskedTextInput
                            {...props}
                            mask={mask}

                            onChangeText={onChange}
                            value={initialValue}

                            // style={[styles.input, {
                            //     ...inputContainerStyle,
                            //     width: SIZES.width * 0.28,
                            //     // borderColor: isFocused ? COLORS.primary : "#C4C4C4"
                            // }]}
                        />


                    }
                />
            </View>
        </View>
    )
}

export default ShortTextInput


const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        // marginVertical: 40,
        // position:"absolute"
    },
    label: {
        // left: 10,
        // top: -10,
        fontFamily: "Nexa-Book",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: 'white',
        // zIndex: 10,
        // width: 30,
        color: COLORS.primary,
        // paddingHorizontal: 5,
        // position:"absolute"

    },
    input: {
        // paddingLeft: 20,
        height: 50,
        borderRadius: 5,
        // borderColor: "black",
        // borderWidth: 0.5,
        fontFamily: "Nexa-Book",
        // position: "relative",


    },

})
