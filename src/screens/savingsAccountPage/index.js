// @flow
import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";

const SavingsAccountPage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} style={styles.settingsBox}>
                <Image source={icons.settingsIcon} style={{width: 30, height: 30}}/>
            </TouchableOpacity>


            <Text style={styles.savings}>Savings Account</Text>
            <ImageBackground source={icons.shortBalFrame} style={styles.balanceFrame}>
                <View style={{paddingHorizontal: 40,}}>
                    <View>
                        <Text style={styles.tsb}>Savings Account Balance</Text>
                        <Text style={styles.balance}>₦ 20,000,000 {}</Text>
                    </View>
                </View>
            </ImageBackground>


            <View style={styles.autosaveBox}>

                <View>
                    <Text style={styles.autosaveText}>Autosave Amount</Text>
                    <Text style={styles.autosaveAmt}>₦ 10,000</Text>
                </View>

                <View>
                    <Text style={styles.autosaveText}>Next Payment Date</Text>
                    <Text style={styles.autosaveAmt2}>2 April, 2022. Thursday</Text>
                </View>
            </View>


            <View style={styles.recentTransaction}>
                <Text style={styles.todo}>Savings Transactions</Text>

                <View style={{flexDirection: "row", justifyContent: "center", alignSelf: "center"}}>
                    <Text onPress={() => {}} style={styles.seeAll}>See
                        all</Text>
                    <Image resizeMode={"contain"}
                           style={{width: 15, height: 15, alignSelf: "center", bottom: 2}}
                           source={icons.arrowRight}/>
                </View>
            </View>


        </View>
    );
};


export default SavingsAccountPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20
    },
    settingsBox: {
        width: 30,
        height: 30,
        alignSelf: "flex-end",
        marginTop: 20
    },
    savings: {
        fontSize: 30,
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        marginVertical: 10
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
    autosaveBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 30
    },
    autosaveText: {
        color: COLORS.primary,
        fontSize: 16,
        // marginBottom: 10,
        fontFamily: "Nexa-Book"

    },
    autosaveAmt: {
        color: COLORS.black,
        fontFamily: "Nexa-Bold",
        fontSize: 20,
        marginTop: 10


    },
    autosaveAmt2: {
        color: COLORS.black,
        fontFamily: "Nexa-Book",
        fontSize: 12,
        alignSelf: "flex-end",
        marginTop: 15
    },
    recentTransaction: {
        flexDirection: "row", justifyContent: "space-between", marginVertical: 30

    }, seeAll: {
        color: COLORS.primary, fontFamily: "Nexa-Book", fontSize: 18, alignSelf: "center"
    }, recentTransactionText: {
        fontSize: 18, width: SIZES.width * 0.4, fontFamily: "Nexa-Bold", // right: 100,
        color: COLORS.black, // backgroundColor:"cyan"
    },todo: {
        color: COLORS.black, fontFamily: "Nexa-Bold", fontSize: 18
    },
})
