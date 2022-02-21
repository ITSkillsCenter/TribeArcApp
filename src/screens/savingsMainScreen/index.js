// @flow
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import {handleQuery} from "../../graphql/requests";
import {UserContext} from "../../context/UserContext";
import {useFocusEffect} from "@react-navigation/native";

const SavingsMainScreen = ({navigation, route}) => {

    const user = useContext(UserContext)

    const [savings, setSavings] = useState("")
    const [voluntary, setVoluntary] = useState("")
    const [totalBalance, setTotalBalance] = useState("")
    const [autocharge, setAutocharge] = useState("")


    const [paidRegFee, setPaidRegFee] = useState(false);


    useFocusEffect(
        useCallback(
            () => {
                ChkRegFee()

                CheckBalance()

            }, [])
    )


    const ChkRegFee = async () => {

        let qry = `query {
                    users(where: { id: ${user.id} }) {
                        paid_reg_fee
                                    }
                                }`


        try {
            const qryRes = await handleQuery(qry, user.token, false)
            console.log(qryRes.data.users[0].paid_reg_fee)
            await setPaidRegFee(qryRes.data.users[0].paid_reg_fee)


        } catch (e) {
            console.log(e, "ChkRegFeeErr")
        }

    }


    const CheckBalance = async () => {


        let qry = `query {
                savingAccounts(where: { user_id: ${user.id} }) {
                    id
                    voluntary_funds
                    amount_saved
                    amount_to_save
                                }
                            }`
        try {

            const bal = await handleQuery(qry, user.token, false)
            // console.log(bal.data.savingAccounts[0].amount_to_save)

            await setSavings(bal.data.savingAccounts[0].amount_saved)
            await setVoluntary(bal.data.savingAccounts[0].voluntary_funds)
            await setAutocharge(bal.data.savingAccounts[0].amount_to_save)
            await setTotalBalance(bal.data.savingAccounts[0].amount_saved + bal.data.savingAccounts[0].voluntary_funds)


        } catch (e) {
            console.log(e, "errorCheckBal")
        }

    }


    return (
        <View style={styles.container}>

            {route.params && <BackButton onPress={() => navigation.pop()}/>}


            <Text style={styles.sav}>Savings</Text>
            <ImageBackground resizeMode={"contain"} source={icons.shortBalFrame} style={styles.balanceFrame}>
                <View style={{
                    // flexDirection: "row",
                    // justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    // alignItems: 'center'
                }}>
                    <View>
                        <Text style={styles.tsb}>Total Savings Balance</Text>
                        <Text style={styles.balance}>₦ {totalBalance?.toLocaleString()}</Text>
                    </View>

                </View>
            </ImageBackground>

            <View style={styles.rootBox}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(paidRegFee ? "SavingsAccountPage" : "RegistrationFee", {
                        savings,
                        autocharge
                    })}
                    activeOpacity={0.85}
                    style={styles.box}>
                    <Image source={icons.savPig} style={{width: SIZES.width * 0.15, height: SIZES.width * 0.15}}/>
                    <View style={styles.textBox}>
                        <Text style={styles.savAcct}>Savings Account</Text>
                        <Text style={styles.savDesc}>Total monthly saving automatically debited</Text>
                        <Text style={styles.amt}>₦ {savings?.toLocaleString()}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate(paidRegFee ? "VoluntaryAccountPage" : "RegistrationFee", voluntary)}
                    activeOpacity={0.85}
                    style={styles.box}>
                    <Image source={icons.savHand} style={{width: SIZES.width * 0.15, height: SIZES.width * 0.15}}/>
                    <View style={styles.textBox}>
                        <Text style={styles.savAcct}>Voluntary Account</Text>
                        <Text style={styles.savDesc}>Total voluntary saving that can be withdrawn anytime</Text>
                        <Text style={styles.amt}>₦ {voluntary?.toLocaleString()}</Text>
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
    sav: {
        color: COLORS.primary,
        fontSize: 24,
        // marginVertical: 10,
        fontFamily: "Nexa-Bold"
    },
    balanceFrame: {
        borderRadius: 15, // padding: 20,
        height: SIZES.height * 0.2,
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
        // marginVertical: 20

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
        marginVertical: 20,
        marginTop: 30

    },
    textBox: {
        width: SIZES.width * 0.7,
    },
    savAcct: {
        fontSize: SIZES.width * 0.05,
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
