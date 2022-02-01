import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {COLORS, SIZES} from "../constants";
import {TextInput} from "react-native-paper";
import {MaskedTextInput} from "react-native-mask-text";

const ShortTextInput = ({placeholderText, initialValue, onChange, shown, inputContainerStyle, mask}) => {

    return (
        <View>
            <View style={styles.container}>
                <TextInput
                    mode={"outlined"}
                    label={placeholderText}
                    value={initialValue}
                    placeholderTextColor={"#A3A3A3"}
                    activeOutlineColor={COLORS.primary}
                    outlineColor={"#C4C4C4"}
                    secureTextEntry={!!shown}
                    style={[styles.input, {
                        ...inputContainerStyle,
                        width: SIZES.width * 0.28,
                        backgroundColor: COLORS.white
                    }]}
                    render={props =>
                        <MaskedTextInput
                            {...props}
                            mask={mask}
                            onChangeText={onChange}
                            value={initialValue}
                        />
                    }
                />
            </View>
        </View>
    )
}

export default ShortTextInput

const styles = StyleSheet.create({
    container: {},
    input: {
        height: 50,
        borderRadius: 5,
        fontFamily: "Nexa-Book",
    },

})
