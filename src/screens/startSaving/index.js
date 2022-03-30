// @flow
import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotchResponsive from "../../components/NotchResponsive";
import {FONTS} from "../../constants/theme";

const StartSaving = ({navigation}) => {
    return (
        <>
            <NotchResponsive color={COLORS.white}/>
            <View style={styles.container}>
                <Text style={styles.savings}>Savings</Text>

                <Image style={{width: SIZES.width * 0.8, height: SIZES.width * 0.7, alignSelf: "center", marginTop: 30}}
                       source={require("../../assets/images/register.png")}/>

                <Text style={styles.startSavings}>Start Saving</Text>
                <Text style={styles.startSavingText}>Start saving with tribe arc</Text>

                <CustomButton onPress={async () => {
                    await AsyncStorage.setItem("@savingWlc", "true");
                    navigation.navigate("SavingsMainScreen", "backButton")
                }} filled text={"Save Now"}/>


            </View>
        </>
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
        ...FONTS.h5,

    },
    startSavings: {
        ...FONTS.h5,
        alignSelf: "center",
        color: COLORS.primary,
        marginTop: 40
    },
    startSavingText: {
        ...FONTS.h9,
        alignSelf: "center",
        color: COLORS.black,
        opacity: 0.6,
        marginTop: 10

    }

})
