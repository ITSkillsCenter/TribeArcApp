// @flow
import React, {useContext, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {Paystack} from "react-native-paystack-webview/lib";
import {COLORS, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import {UserContext} from "../../context/UserContext";
import {handleQuery} from "../../graphql/requests";
import LottieView from "lottie-react-native";
import CustomButton from "../../components/CustomButton";
import axios from "axios";
import {BASE_URL} from "../../config";
// import WebView from "react-native-webview";

const PaymentWebPage = ({navigation, route}) => {

    const user = useContext(UserContext)

    const amount = parseFloat(route.params.replace(",", ""))
    // console.log(amount, " amount")

    const [cancelled, setCancelled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const paystackWebViewRef = useRef();


    const [liveKey, setLiveKey] = useState("")
    const [testKey, setTestKey] = useState("")

    const [feeBridge, setFeeBridge] = useState("")
    const [extraFee, setExtraFee] = useState("")
    const [percentageBelow, setPercentageBelow] = useState("")


    useEffect(() => {

        GetPaymentKey()


    }, [])


    const GetPaymentKey = async () => {


        const getKey = `query {
            communities(where: { id: 15 }) {
                settings
                     }
                   }`
        try {

            const gottenKey = await handleQuery(getKey, user.token, false)


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
            console.log(e)
        }
    }


    const TransactionData = async (ref, amount) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }

        await axios.post(`${BASE_URL}/verify/transaction`, {
            community_id: 15,
            user_id: user.id,
            type: "isSavings",
            amount: amount,
            reference: `${ref}`
        }, {headers: headers}).then((response) => console.log(response.data))
            .catch((err) => console.log(err, "Err"))

        navigation.navigate("SuccessScreen")

    }

    const Cancelled = async (e) => {

        let qry = `mutation {
                createSavingsTransaction(
                input: {
                    data: {
                    reference: ""
                    amount_paid: ${amount}
                    status: FAILED
                    user_id: ${user.id} 
                    community_id: 15
                }
                }
            ) {
                    savingsTransaction {
                        id
                        user_id {
                                id
      }
    }
  }
}`


        try {

            // console.log(qry, "yyy")

            let qryRes = await handleQuery(qry, user.token, false)


        } catch (e) {

            console.log(e, "ERRORt-rx")
        }
    }


    return (

        isLoading ? <ActivityIndicator
                style={{alignSelf: "center", flex: 1, backgroundColor: COLORS.white, width: SIZES.width}} size={"large"}
                color={COLORS.primary}/> :
            <View style={styles.container}>
                <BackButton onPress={() => navigation.pop()}/>

                <Paystack
                    paystackKey={liveKey || testKey}
                    amount={amount < feeBridge ? (amount * percentageBelow) + parseFloat(amount) : (amount * percentageBelow) + parseFloat(amount) + parseFloat(extraFee)}
                    billingEmail={user.email}
                    activityIndicatorColor={COLORS.primary}
                    onCancel={async (e) => {
                        // handle response here
                        await Cancelled()
                        console.log(e, "PaymentError")
                        await setCancelled(true)
                    }}
                    // channels={JSON.stringify(["card","ussd"])}
                    onSuccess={async (res) => {
                        setIsLoading(true)

                        await TransactionData(res.data.transactionRef.reference, amount)
                        console.log(res, "RESDSD")
                        // handle response here
                    }}
                    autoStart={true}
                    ref={paystackWebViewRef}
                />

                {cancelled && <View>

                    <View style={styles.checkMark}>
                        <LottieView
                            source={require("../../assets/images/cancelMark.json")}
                            autoPlay
                            loop={false}
                            style={{width: 268, height: 263}}/>
                    </View>

                    <View style={styles.tsBox}>
                        <Text style={styles.ts}>Transaction failed!</Text>
                    </View>

                    <View style={{marginVertical: 20}}>
                        <CustomButton filled onPress={() => {
                            paystackWebViewRef.current.startTransaction()
                            setCancelled(false)
                        }} text={"Retry"}/>
                    </View>
                </View>}

            </View>
    );
};
export default PaymentWebPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,

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
