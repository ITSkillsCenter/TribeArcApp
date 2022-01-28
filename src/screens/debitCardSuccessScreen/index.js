// @flow
import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import LottieView from "lottie-react-native";
import CustomButton from "../../components/CustomButton";

const DebitCardSuccessScreen = ({navigation}) => {
    return (
        <View style={styles.container}>

            <View style={styles.checkMark}>
                <LottieView source={require("../../assets/images/checkMark.json")}
                            autoPlay loop={false}
                            style={{width: 268, height: 263}}/>
            </View>

            <View style={styles.tsBox}>
                <Text style={styles.ts}>Debit Card Added!</Text>
            </View>
            <View style={styles.tsBox}>
                <Text style={styles.desc}>Dear User your card has been successfully added</Text>
            </View>

            <View style={{marginVertical: 20}}>
                <CustomButton onPress={() => navigation.navigate("DashBoard")} filled text={"Ok"}/>
            </View>

        </View>
    );
};

export default DebitCardSuccessScreen


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

