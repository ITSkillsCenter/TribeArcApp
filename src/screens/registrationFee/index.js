// @flow
import React, {useContext, useRef, useState} from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons} from "../../constants";
import CustomButton from "../../components/CustomButton";
import {Paystack} from "react-native-paystack-webview/lib";
import {UserContext} from "../../context/UserContext";
import {BASE_URL} from "../../config";
import axios from "axios";


export const RegistrationFee = ({navigation}) => {

    const user = useContext(UserContext)

    // console.log(user)

    const paystackWebViewRef = useRef();


    const [isLoading, setIsLoading] = useState(false)


    const PayRegFee = async (ref) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }

        await axios.post(`${BASE_URL}/verify/transaction`, {
            community_id: 15,
            user_id: user.id,
            type: "isRegister",
            amount: 20000,
            reference: `${ref}`
        }, {headers: headers}).then((response) => {
            console.log(response.data)
            navigation.navigate("RegFeeSuccessScreen")

        })
            .catch((err) => console.log(err, "Err"))



    }


    return (<View style={styles.container}>
        <TouchableOpacity activeOpacity={0.7} style={styles.skipBackground}
                          onPress={() => navigation.navigate("BottomTabs")}>
            <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>

        <Text style={styles.regFee}>Registration Fee</Text>
        <Text style={styles.regFeeInfo}>You're required to pay a registration fee to start saving and investing on
            tribe arc</Text>

        <ImageBackground resizeMode={"contain"} source={icons.balFrame} style={styles.balanceFrame}>
            <View style={{
                justifyContent: 'space-between', paddingHorizontal: 40, alignItems: 'center'
            }}>
                <Text style={styles.regFeeText}>Registration Fee</Text>
                <Text style={styles.balance}>₦ 20,000</Text>
            </View>
        </ImageBackground>

        <View style={{
            justifyContent: "flex-end",
            flex: 2,
        }}>
            <CustomButton
                filled
                loading={isLoading}
                text={"Pay Now"}
                onPress={() => {
                    paystackWebViewRef.current.startTransaction()
                }}
            />
        </View>

        <Paystack
            paystackKey="pk_test_52d14b2ac56f0420095618159b5dac28891bd754"
            amount={20000}
            billingEmail={user.email}
            activityIndicatorColor={COLORS.primary}
            onCancel={async (e) => {
                console.log(e, "PaymentError")
            }}
            onSuccess={async (res) => {
                // await TransactionData(res)
                // await navigation.navigate("RegFeeSuccessScreen")
                console.log(res.data.transactionRef.reference, "RESDSD")
                await PayRegFee(res.data.transactionRef.reference)
            }}
            autoStart={false}
            ref={paystackWebViewRef}
        />


    </View>);
};

export default RegistrationFee

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 20

    }, skipBackground: {
        backgroundColor: COLORS.primary,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        width: 80,
        marginVertical: 10,
        borderRadius: 5,
        alignSelf: "flex-end"
    }, skip: {
        color: COLORS.white, fontFamily: "Nexa-Bold"
    }, regFee: {
        color: COLORS.black, fontSize: 28, fontFamily: "Nexa-Bold", marginVertical: 20
    }, regFeeInfo: {
        color: COLORS.black, fontSize: 16, fontFamily: "Nexa-Book", marginVertical: 20, lineHeight: 28, opacity: 0.7
    },
    balanceFrame: {
        marginTop: 5,
        borderRadius: 15, // padding: 20,
        height: 200,
        width: "100%",
        marginRight: 10,
        justifyContent: "center",
    }, regFeeText: {
        color: COLORS.white, fontFamily: "Nexa-Bold", fontSize: 16
    }, balance: {
        color: COLORS.white, fontFamily: "Nexa-Bold", fontSize: 24, marginTop: 15
    }
})
