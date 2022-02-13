// @flow
import React, {useContext, useRef, useState} from 'react';
import {Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {COLORS} from "../../constants";
import BackButton from "../../components/BackButton";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import {Paystack} from "react-native-paystack-webview/lib";
import {UserContext} from "../../context/UserContext";
import axios from "axios";
import {BASE_URL} from "../../config";


const TopUpScreen = ({navigation, route}) => {


    const paystackWebViewRef = useRef();


    const user = useContext(UserContext)

    const [topUp, setTopUp] = useState("");


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

        // <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

            <View style={styles.container}>

                <BackButton onPress={() => navigation.pop()}/>


                <Text style={styles.withdraw}>Top-Up</Text>
                <Text style={styles.withdrawDesc}>Enter Amount to save</Text>
                <View style={{marginTop: 30}}>


                    <CustomTextInput
                        initialValue={topUp}
                        onChange={setTopUp}
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
                    paystackKey="pk_test_52d14b2ac56f0420095618159b5dac28891bd754"
                    amount={topUp}
                    billingEmail={user.email}
                    activityIndicatorColor={COLORS.primary}
                    onCancel={async (e) => {
                        console.log(e, "PaymentError")
                    }}
                    onSuccess={async (res) => {
                        // console.log(res, "RESDSD")
                        await TopUp(res.data.transactionRef.reference, topUp)

                    }}
                    autoStart={false}
                    ref={paystackWebViewRef}
                />


                <View style={{flex: 2, justifyContent: "flex-end"}}>
                    <CustomButton onPress={() => paystackWebViewRef.current.startTransaction()} filled={topUp !== ""}
                                  text={"Proceed"}/>
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
    withdraw: {
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
        fontSize: 20,
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


