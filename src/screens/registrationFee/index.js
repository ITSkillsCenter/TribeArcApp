// @flow
import React, {useContext, useRef, useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import CustomButton from "../../components/CustomButton";
import {Paystack} from "react-native-paystack-webview/lib";
import {UserContext} from "../../context/UserContext";


export const RegistrationFee = ({navigation}) => {

    const user = useContext(UserContext)

    const paystackWebViewRef = useRef();


    const [isLoading, setIsLoading] = useState(false)


    return (<View style={styles.container}>
        <TouchableOpacity activeOpacity={0.7} style={styles.skipBackground}
                          onPress={() => navigation.navigate("DashBoard")}>
            <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>

        <Text style={styles.regFee}>Registration Fee</Text>
        <Text style={styles.regFeeInfo}>You're required to pay a registration fee to start saving and investing on
            tribe arc</Text>

        <ImageBackground source={icons.balFrame} style={[styles.balanceFrame, {marginRight: 0}]}>
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
            paystackKey="pk_test_b0f9c1e94ea37b2ba7df563002ee8a074bc5678a"
            amount={20000}
            billingEmail={user.email}
            activityIndicatorColor={COLORS.primary}
            onCancel={async (e) => {
                // handle response here
                // await Cancelled()
                console.log(e, "PaymentError")
                // await setCancelled(true)
            }}
            // channels={JSON.stringify(["card","ussd"])}
            onSuccess={async (res) => {
                // await TransactionData(res)
                await navigation.navigate("RegFeeSuccessScreen")
                console.log(res, "RESDSD")
                // handle response here
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
    }, balanceFrame: {
        marginTop: 5, borderRadius: 15, // padding: 20,
        height: 200, width: SIZES.width, alignSelf: "center", justifyContent: "center", // alignItems: 'center'
    }, regFeeText: {
        color: COLORS.white, fontFamily: "Nexa-Bold", fontSize: 14
    }, balance: {
        color: COLORS.white, fontFamily: "Nexa-Bold", fontSize: 24, marginTop: 15
    }
})
