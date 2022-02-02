// @flow
import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Paystack} from "react-native-paystack-webview/lib";
import {COLORS, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import {UserContext} from "../../context/UserContext";
import {handleQuery} from "../../graphql/requests";
import LottieView from "lottie-react-native";
import CustomButton from "../../components/CustomButton";

const PaymentWebPage = ({navigation, route}) => {

    const user = useContext(UserContext)

    const amount = parseFloat(route.params.replace(",", ""))
    // console.log(amount, " amount")

    const [cancelled, setCancelled] = useState(false)


    const paystackWebViewRef = useRef();


    const TransactionData = async (res) => {

        let qry = `mutation {
                createSavingsTransaction(
                input: {
                    data: {
                    reference: "${res.transactionRef.trxref}"
                    amount_paid: ${amount}
                    status: ${res.status.toUpperCase()}
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

            // console.log(qry, "QRYYYY")

            let qryRes = await handleQuery(qry, user.token, false)
            // console.log(qryRes, "QRYRESSS")


            if (res.status) {
                navigation.navigate("SuccessScreen", route.params)
            }


            // console.log(res.data.event, "REZZZZ")
            // console.log(res.status, "Statussss")
            // console.log(res.transactionRef.trxref, "trxreffff")

        } catch (e) {

            console.log(e, "ERRORtrx")


        }
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
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>
            <Paystack
                paystackKey="pk_test_b0f9c1e94ea37b2ba7df563002ee8a074bc5678a"
                amount={amount}
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
                    await TransactionData(res)
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
                    <Text style={styles.ts}>Transaction failed/cancelled!</Text>
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
