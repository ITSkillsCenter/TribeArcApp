// @flow
import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import LottieView from "lottie-react-native";
import CustomButton from "../../components/CustomButton";

const SuccessScreen = ({navigation, route}) => {


    return (
        <View style={styles.container}>

            <View style={styles.checkMark}>
                <LottieView source={require("../../assets/images/checkMark.json")}
                            autoPlay loop={false}
                            style={{width: SIZES.width*0.6, height: SIZES.width*0.6}}/>
            </View>

            <View style={styles.tsBox}>
                <Text style={styles.ts}>Transaction Successful!</Text>
            </View>
            <View style={styles.tsBox}>
                <Text style={styles.desc}>Dear User you have successfully saved for this month.</Text>
            </View>

            <View style={{marginVertical: 20}}>
                <CustomButton filled onPress={() => navigation.navigate("BottomTabs")} text={"Ok"}/>
            </View>

        </View>
    );
};

export default SuccessScreen


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

