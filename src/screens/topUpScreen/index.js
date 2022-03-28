// @flow
import React, {useContext, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import {Paystack} from "react-native-paystack-webview/lib";
import {UserContext} from "../../context/UserContext";
import axios from "axios";
import {BASE_URL} from "../../config";
import {handleQuery} from "../../graphql/requests";


const TopUpScreen = ({navigation, route}) => {


    const paystackWebViewRef = useRef();


    const user = useContext(UserContext)

    const [topUp, setTopUp] = useState("");
    const [paidRegFee, setPaidRegFee] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const [liveKey, setLiveKey] = useState("")
    const [testKey, setTestKey] = useState("")


    const [feeBridge, setFeeBridge] = useState("")
    const [extraFee, setExtraFee] = useState("")
    const [percentageBelow, setPercentageBelow] = useState("")


    useEffect(() => {

        ChkRegFee()
        GetPaymentKeyAndFeePercent()


    }, [])


    const GetPaymentKeyAndFeePercent = async () => {

        const getKey = `query {
            communities(where: { id: 15 }) {
                settings
                     }
                   }`
        try {

            const gottenKey = await handleQuery(getKey, user.token, false)

            // console.log(gottenKey.data.communities[0].settings.paystack.fee.extra_fee)


            await setFeeBridge(parseFloat(gottenKey.data.communities[0].settings.paystack.fee.amount))
            await setExtraFee(parseFloat(gottenKey.data.communities[0].settings.paystack.fee.extra_fee))
            await setPercentageBelow(parseFloat(gottenKey.data.communities[0].settings.paystack.fee.percentage_below))


            if (gottenKey?.data?.communities[0]?.settings?.paystack?.status) {
                await setLiveKey(gottenKey.data.communities[0].settings.paystack.live.public_key)
            }
            if (!gottenKey?.data?.communities[0]?.settings?.paystack?.status) {
                await setTestKey(gottenKey.data.communities[0].settings.paystack.test.public_key)
            }

        } catch (e) {
            console.log(e.response.data)
        }
    }


    const ChkRegFee = async () => {

        let qry = `query {
                    users(where: { id: ${user.id} }) {
                        paid_reg_fee
                                    }
                                }`


        try {
            const qryRes = await handleQuery(qry, user.token, false)
            // console.log(qryRes.data.users[0].paid_reg_fee)
            await setPaidRegFee(qryRes.data.users[0].paid_reg_fee)
            // console.log(qryRes.data.users[0].paid_reg_fee)


        } catch (e) {
            console.log(e, "ChkRegFeeErr")
        }

    }


    const TopUp = async (ref, amount) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }

        await axios.post(`${BASE_URL}/verify/transaction`, {
            community_id: 15,
            user_id: user.id,
            type: "isVoluntary",
            amount: amount,
            reference: `${ref}`
        }, {headers: headers}).then((response) => console.log(response.data))
            .catch((err) => console.log(err, "Err"))

        navigation.navigate("PaymentSuccessScreen")


    }


    return (
        isLoading ? <ActivityIndicator
                style={{alignSelf: "center", flex: 1, backgroundColor: COLORS.white, width: SIZES.width}} size={"large"}
                color={COLORS.primary}/> :

            // <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                <View style={styles.container}>

                    <BackButton onPress={() => navigation.pop()}/>


                    <Text style={styles.topUp}>Top-Up</Text>
                    <Text style={styles.withdrawDesc}>Enter Amount to save</Text>
                    <View style={{marginTop: 10}}>


                        <CustomTextInput
                            initialValue={topUp}
                            onChange={value => parseFloat(setTopUp(value))}
                            placeholderText={"e.g 20,000"}
                            props={{
                                keyboardType: "numeric"
                            }}
                            title={"Amount to Top-Up"}/>


                        <CustomTextInput props={{
                            editable: false
                        }} placeholderText={"Voluntary Account"} title={"Destination"}/>
                    </View>


                    <Paystack
                        paystackKey={liveKey || testKey}
                        amount={topUp < feeBridge ? (topUp * percentageBelow) + parseFloat(topUp) : (topUp * percentageBelow) + parseFloat(topUp) + parseFloat(extraFee)}
                        billingEmail={user.email}
                        activityIndicatorColor={COLORS.primary}
                        onCancel={async (e) => {
                            console.log(e, "PaymentError")
                        }}
                        onSuccess={async (res) => {
                            // console.log(res, "RESDSD")
                            setIsLoading(true)
                            await TopUp(res.data.transactionRef.reference, topUp)

                        }}
                        autoStart={false}
                        ref={paystackWebViewRef}
                    />


                    <View style={{flex: 2, justifyContent: "flex-end"}}>
                        <CustomButton
                            onPress={() => {
                                if (topUp !== "") {
                                    paidRegFee ? paystackWebViewRef.current.startTransaction() : navigation.navigate("RegistrationFee")
                                }
                            }}
                            filled={topUp !== ""}
                            text={"Proceed"}
                        />
                    </View>

                </View>

            </TouchableWithoutFeedback>

        // </KeyboardAwareScrollView>

    );
};

export default TopUpScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20
    },
    topUp: {
        fontSize: 26,
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        marginVertical: 20
    },
    withdrawDesc: {
        fontSize: 16,
        fontFamily: "Nexa-Book",
        color: COLORS.black
    },
    title: {
        color: COLORS.black,
        fontSize: 14,
        marginBottom: 5,
        opacity: 0.6,
        fontFamily: "Nexa-Book"

    },
    modalAutoCharge: {
        fontSize: SIZES.width * 0.05,
        fontFamily: "Nexa-Bold",
        color: COLORS.black,
        marginVertical: 10
    },
    modalAutoChargeDesc: {
        fontSize: 14,
        fontFamily: "Nexa-Book",
        color: COLORS.black,
        marginVertical: 10,
        opacity: 0.6,
        lineHeight: 24

    }, addAcctBox: {
        flexDirection: "row",
        alignItems: "center",
        height: 80,
        backgroundColor: "#FAFAFF",
        borderRadius: 15,
        padding: 20,
        marginVertical: 5
        // justifyContent:"space-between"
    },
    addAcct: {
        color: COLORS.black,
        opacity: 0.6,
        fontFamily: "Nexa-Book",
        paddingHorizontal: 20
    },
    addAcctBox2: {
        flexDirection: "row",
        alignItems: "center",
        height: 80,
        backgroundColor: "#FAFAFF",
        borderRadius: 15,
        padding: 20,
        marginVertical: 5,
        justifyContent: "space-between"

    }

})


