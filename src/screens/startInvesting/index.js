// @flow
import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotchResponsive from "../../components/NotchResponsive";
import {FONTS} from "../../constants/theme";

const StartInvesting = ({navigation}) => {
    return (
        <>
            <NotchResponsive color={COLORS.white}/>
            <View style={styles.container}>
                <Text style={styles.savings}>Investment</Text>

                <Image style={{width: SIZES.width * 0.8, height: SIZES.width * 0.7, alignSelf: "center", marginTop: 10}}
                       source={require("../../assets/images/invstImg.png")}/>

                <Text style={styles.startSavings}>Start Investing!</Text>
                <Text style={styles.startSavingText}>Start investing in opportunities with tribe arc</Text>

                <CustomButton onPress={async () => {
                    await AsyncStorage.setItem("@investWlc", "true");

                    navigation.navigate("InvestmentMainScreen", "backButton")
                }} filled text={"Invest Now"}/>


            </View>
        </>
    );
};

export default StartInvesting

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20
    },
    savings: {
        ...FONTS.h5,
        color: COLORS.primary,
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
