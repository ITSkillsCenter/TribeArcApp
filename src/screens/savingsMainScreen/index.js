// @flow
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import {handleQuery} from "../../graphql/requests";
import {UserContext} from "../../context/UserContext";
import {useFocusEffect} from "@react-navigation/native";
import NotchResponsive from "../../components/NotchResponsive";
import {FONTS} from "../../constants/theme";

const SavingsMainScreen = ({navigation, route}) => {

    const user = useContext(UserContext)

    const [savings, setSavings] = useState("")
    const [voluntary, setVoluntary] = useState("")
    const [totalBalance, setTotalBalance] = useState("")
    const [autocharge, setAutocharge] = useState("")
    const [next_payment_date, setNext_payment_date] = useState("")


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
                    next_payment_date
                                }
                            }`
        try {


            const bal = await handleQuery(qry, user.token, false)
            // console.log(bal.data.savingAccounts[0].next_payment_date)

            await setSavings(bal.data.savingAccounts[0].amount_saved)
            await setVoluntary(bal.data.savingAccounts[0].voluntary_funds)
            await setAutocharge(bal.data.savingAccounts[0].amount_to_save)
            await setNext_payment_date(bal.data.savingAccounts[0].next_payment_date)
            await setTotalBalance(bal.data.savingAccounts[0].amount_saved + bal.data.savingAccounts[0].voluntary_funds)


        } catch (e) {
            console.log(e, "errorCheckBal")
        }

    }


    return (

        <>
            <NotchResponsive color={COLORS.white}/>
            <View style={styles.container}>

                {route.params && <BackButton onPress={() => navigation.pop()}/>}


                <Text style={styles.sav}>Savings</Text>
                <ImageBackground resizeMode={"contain"} source={icons.shortBalFrame} style={styles.balanceFrame}>
                    <View style={{
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
                    <Pressable
                        onPress={() => navigation.navigate(paidRegFee ? "SavingsAccountPage" : "RegistrationFee", {
                            savings,
                            autocharge,
                            next_payment_date
                        })}
                        style={styles.box}>
                        <Image source={icons.savPig} style={{width: SIZES.width * 0.15, height: SIZES.width * 0.15}}/>
                        <View style={styles.textBox}>
                            <Text style={styles.savAcct}>Savings Account</Text>
                            <Text style={styles.savDesc}>Total monthly saving automatically debited</Text>
                            <Text style={styles.amt}>₦ {savings?.toLocaleString()}</Text>
                        </View>
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate(paidRegFee ? "VoluntaryAccountPage" : "RegistrationFee", voluntary)}
                        style={styles.box}>
                        <Image source={icons.savHand} style={{width: SIZES.width * 0.15, height: SIZES.width * 0.15}}/>
                        <View style={styles.textBox}>
                            <Text style={styles.savAcct}>Voluntary Account</Text>
                            <Text style={styles.savDesc}>Total voluntary saving that can be withdrawn anytime</Text>
                            <Text style={styles.amt}>₦ {voluntary?.toLocaleString()}</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </>
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
        ...FONTS.h5,
        color: COLORS.primary,
    },
    balanceFrame: {
        borderRadius: 15, // padding: 20,
        height: SIZES.height * 0.2,
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
    },
    tsb: {
        ...FONTS.h7,
        color: COLORS.white,
        marginVertical: 10
    },
    balance: {
        ...FONTS.h4,
        color: COLORS.white,
    },
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
        ...FONTS.h6,
        color: COLORS.black,
    },
    savDesc: {
        ...FONTS.h10,
        color: COLORS.black,
        marginVertical: 10,
        opacity: 0.5
    },
    amt: {
        ...FONTS.h6,
        marginTop: 5,
        color: COLORS.black,
    }
})
