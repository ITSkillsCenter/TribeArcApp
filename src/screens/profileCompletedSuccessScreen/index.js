// @flow
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import LottieView from "lottie-react-native";
import CustomButton from "../../components/CustomButton";
import {handleQuery} from "../../graphql/requests";
import {UserContext} from "../../context/UserContext";

const ProfileCompletedSuccessScreen = ({navigation, route}) => {


    return (
        <View style={styles.container}>

            <View style={styles.checkMark}>
                <LottieView source={require("../../assets/images/checkMark.json")}
                            autoPlay loop={false}
                            style={{width: 268, height: 263}}/>
            </View>

            <View style={styles.tsBox}>
                <Text style={styles.ts}>Profile Completed!</Text>
            </View>
            <View style={styles.tsBox}>
                <Text style={styles.desc}>Dear User your profile has been successfully completed.</Text>
            </View>

            <View style={{marginVertical: 20}}>
                <CustomButton filled onPress={() => navigation.navigate("DashBoard")} text={"Ok"}/>
            </View>

        </View>
    );
};

export default ProfileCompletedSuccessScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20
    },
    checkMark: {
        alignItems: "center",
        paddingVertical: 40,
        marginTop: 30

    },
    tsBox: {
        alignItems: "center",
        marginVertical: 10
    },
    ts: {
        fontFamily: "Nexa-Bold",
        fontSize: 26,
        color: COLORS.black
    },
    desc: {
        fontSize: 18,
        fontFamily: "Nexa-Book",
        textAlign: 'center',
        color: "#999999",
        width: SIZES.width * 0.7,
        letterSpacing: 0.6
    }
})

