// @flow
import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import CustomButton from "../../components/CustomButton";

const StartSaving = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.savings}>Savings</Text>

            <Image style={{width: SIZES.width * 0.8, height: SIZES.width * 0.7, alignSelf: "center", marginTop: 30}}
                   source={require("../../assets/images/register.png")}/>

            <Text style={styles.startSavings}>Start Saving</Text>
            <Text style={styles.startSavingText}>Start saving with tribe arc</Text>

            <CustomButton filled text={"Save Now"}/>


        </View>
    );
};

export default StartSaving

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20
    },
    savings: {
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        fontSize: 22,
        marginTop: 70
    },
    startSavings: {
        alignSelf: "center",
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        fontSize: 24,
        marginTop: 50
    },
    startSavingText: {
        alignSelf: "center",
        color: COLORS.black,
        fontFamily: "Nexa-Bold",
        fontSize: 14,
        opacity: 0.6,
        marginTop: 10

    }

})