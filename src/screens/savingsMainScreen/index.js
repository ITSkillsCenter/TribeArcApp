// @flow
import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";

const SavingsMainScreen = ({navigation}) => {
    return (
        <View style={styles.container}>


            <Text style={styles.inv}>Savings</Text>
            <ImageBackground source={icons.shortBalFrame} style={styles.balanceFrame}>
                <View style={{
                    // flexDirection: "row",
                    // justifyContent: 'space-between',
                    paddingHorizontal: 40,
                    // alignItems: 'center'
                }}>
                    <View>
                        <Text style={styles.tsb}>Savings Balance</Text>
                        <Text style={styles.balance}>₦ 20,000,000 {}</Text>
                    </View>

                </View>
            </ImageBackground>

            <View style={styles.rootBox}>
                <TouchableOpacity onPress={() => navigation.navigate("Savings", "isInvestment")} activeOpacity={0.85}
                                  style={styles.box}>
                    <Image source={icons.savPig} style={{width: 60, height: 60}}/>
                    <View style={styles.textBox}>
                        <Text style={styles.savAcct}>Savings Account</Text>
                        <Text style={styles.savDesc}>Total monthly saving automatically debited</Text>
                        <Text style={styles.amt}>₦ 0.00</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("VoluntaryAccountPage", "isVoluntary")} activeOpacity={0.85}
                                  style={styles.box}>
                    <Image source={icons.savHand} style={{width: 60, height: 60}}/>
                    <View style={styles.textBox}>
                        <Text style={styles.savAcct}>Voluntary Account</Text>
                        <Text style={styles.savDesc}>Total voluntary saving that can be withdrawn anytime</Text>
                        <Text style={styles.amt}>₦ 0.00</Text>
                    </View>
                </TouchableOpacity>

            </View>


        </View>
    );
};

export default SavingsMainScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20
    },
    inv: {
        color: COLORS.primary,
        fontSize: 24,
        marginVertical: 10,
        fontFamily: "Nexa-Bold"
    },
    balanceFrame: {
        borderRadius: 15, // padding: 20,
        height: 200,
        width: SIZES.width,
        alignSelf: "center",
        justifyContent: "center", // alignItems: 'center'
    },
    saveFrame: {
        backgroundColor: '#EFF2FF',
        height: 120,
        width: SIZES.width * 0.9,
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 20
    },
    tsb: {
        fontSize: 18,
        color: COLORS.white,
        fontFamily: "Nexa-Bold",
        marginVertical: 10
    },
    balance: {
        color: COLORS.white,
        fontFamily: "Nexa-Bold",
        fontSize: 24
    },
    rootBox: {},
    box: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 40

    },
    textBox: {
        width: SIZES.width * 0.7,
    },
    savAcct: {
        fontSize: 20,
        color: COLORS.black,
        fontFamily: "Nexa-Bold",
    },
    savDesc: {
        fontSize: 12,
        color: COLORS.black,
        fontFamily: "Nexa-Bold",
        marginVertical: 10,
        opacity: 0.5

    },
    amt: {
        marginTop: 5,
        fontSize: 22,
        color: COLORS.black,
        fontFamily: "Nexa-Bold",

    }
})
