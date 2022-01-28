// @flow
import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {COLORS} from "../../constants";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import TextButtonComponent from "../../components/TextButtonComponent";
import {handleQueryNoToken} from "../../graphql/requests";


const OtpScreen = ({navigation, route}) => {

    const emailFromRoute = route.params
    // console.log(dataFromRoute, "7777")

    // const [otp, setOtp] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    const VerifyOTP = async (otpCode) => {

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

        let resendOtpQry = ` mutation{
                                    sendOtp(email:"${emailFromRoute}"){
                                        ok
                                            }
                                                }`

        try {

            let otpResent = await handleQueryNoToken(resendOtpQry);


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
            <View style={{alignItems: 'center'}}>


                <OTPInputView
                    style={{width: '100%', height: 200,}}
                    pinCount={6}
                    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    onCodeChanged={code => {
                        setError(false)
                        setLoading(false)
                        // console.log(code)
                    }}
                    editable={true}
                    autoFocusOnLoad={true}
                    codeInputFieldStyle={styles.borderStyleBase}
                    codeInputHighlightStyle={styles.borderStyleHighLighted}
                    onCodeFilled={(code) => {
                        // await setOtp(code)
                        VerifyOTP(code)
                        // setTimeout(() => {
                        //     console.log(otp,"Fin")
                        //
                        // }, 500)


                    }}
                />

            </View>
            <View style={{alignSelf: "flex-start", bottom: 40}}>
                <TextButtonComponent
                    text={"Did not receive OTP?  "}
                    pressable={"Resend Code"}
                    onPress={() => {
                        ResendOTP()
                        setError(false)

                    }}
                />
            </View>
            {loading && <ActivityIndicator color={COLORS.primary} size="large"/>}
            {error && <Text style={{color: "red"}}>An error occurred, retry.</Text>}


        </View>
    );
};

export default OtpScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingTop: 20
    },
    enterOtp: {
        color: COLORS.black,
        fontFamily: "Nexa-Bold",
        fontSize: 30,
        marginVertical: 20,

    },
    desc: {
        color: COLORS.black,
        fontFamily: "Nexa-Book",
        fontSize: 16,
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


})
