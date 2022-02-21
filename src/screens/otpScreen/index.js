// @flow
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Keyboard, StyleSheet, Text, TextInput, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import TextButtonComponent from "../../components/TextButtonComponent";
import {handleQueryNoToken} from "../../graphql/requests";
import CustomInputBox from "../../components/CustomInputBox";
import CustomButton from "../../components/CustomButton";


const OtpScreen = ({navigation, route}) => {

    const emailFromRoute = route.params
    // console.log(dataFromRoute, "7777")

    const [otpCode, setOtpCode] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    const VerifyOTP = async () => {

        let otpQry = `mutation{
            confirmOtp(
            email: "${emailFromRoute}",
            code: "${otpCode}",
            ){ ok }
            }`

        try {
            setLoading(true);
            let res = await handleQueryNoToken(otpQry)
            console.log(res.data, "REZZZZ")

            if (res.data.confirmOtp.ok) {
                setLoading(false)
                navigation.navigate("Login", "otpSuccess")
            }

        } catch (e) {
            console.log(e, "verifyOTPError")
            setLoading(false)
            setError(true)
        }
    }


    const ResendOTP = async () => {
        setLoading(true)
        let resendOtpQry = ` mutation{
                                    sendOtp(email:"${emailFromRoute}"){
                                        ok
                                            }
                                                }`

        try {

            let otpResent = await handleQueryNoToken(resendOtpQry);
            setLoading(false)


        } catch (e) {
            console.log(e, "ResendOTPError")
            setLoading(false)
            setError(true)
        }
    }


    return (
        <View style={styles.container}>

            <Text style={styles.enterOtp}>Enter your OTP</Text>
            <Text style={styles.desc}>To verify email, we’ve sent a one time password (OTP) to your email address</Text>


            <View style={styles.inputBox}>
                <CustomInputBox
                    inputContainerStyle={styles.textInput}
                    placeholderTextColor={"#999999"}
                    placeholderText={"Enter one time password"}
                    initialValue={otpCode}
                    props={{
                        maxLength: 6
                    }}
                    keyboardType={"numeric"}
                    onChange={(value) => {
                        setOtpCode(value)
                        setError(false)
                        setLoading(false)
                    }}
                />
            </View>


            <View style={{alignSelf: "flex-start", bottom: 20}}>
                <TextButtonComponent
                    text={"Did not receive OTP?  "}
                    pressable={"Resend Code"}
                    onPress={async () => {
                        await ResendOTP()
                        setError(false)

                    }}
                />
            </View>
            {loading && <ActivityIndicator color={COLORS.primary} size="large"/>}
            {error && <Text style={{color: "red"}}>An error occurred, retry.</Text>}

            <View style={styles.saveButton}>
                <CustomButton
                    loading={loading}
                    filled={otpCode !== ""}
                    text={"Verify"}
                    onPress={async () => {
                        setError(false)

                        if (otpCode !== "") {
                            await VerifyOTP()

                        }

                    }}/>
            </View>

        </View>
    );
};

export default OtpScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingTop: 10
    },
    enterOtp: {
        color: COLORS.black,
        fontFamily: "Nexa-Bold",
        fontSize: SIZES.width*0.09,
        marginVertical: 10,

    },
    desc: {
        color: COLORS.black,
        fontFamily: "Nexa-Book",
        fontSize: SIZES.width*0.04,
        letterSpacing: 0.5,
        lineHeight: 29


    },

    borderStyleBase: {
        width: 60,
        height: 90,
        borderRadius: 5,
        color: COLORS.black,
        fontFamily: "Nexa-Bold",

        fontSize: 30,
        fontWeight: "700"
    },

    borderStyleHighLighted: {
        borderColor: COLORS.secondary,
    },
    inputBox: {
        marginVertical: 20
    },

    textInput: {
        borderRadius: 5,
        fontFamily: "Nexa-Bold",
        height: SIZES.width*0.15,
        letterSpacing: 15,
        fontSize: SIZES.width * 0.05,
        color: COLORS.black
    },
    saveButton: {
        justifyContent: "flex-end",
        flex: 2,

    },


})
