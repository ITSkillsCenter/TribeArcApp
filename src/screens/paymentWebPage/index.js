// @flow
import React, {useContext} from 'react';
import {View, StyleSheet} from "react-native";
import {Paystack} from "react-native-paystack-webview/lib";
import {COLORS} from "../../constants";
import BackButton from "../../components/BackButton";
import {UserContext} from "../../context/UserContext";

const PaymentWebPage = ({navigation, route}) => {

    const user = useContext(UserContext)

    const amount = Number(route.params)


    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>
            <Paystack
                paystackKey="pk_test_b0f9c1e94ea37b2ba7df563002ee8a074bc5678a"
                amount={"10000"}
                billingEmail={user.email}
                activityIndicatorColor={COLORS.primary}
                onCancel={(e) => {
                    // handle response here
                    console.log(e, "PaymentError")
                }}
                onSuccess={(res) => {
                    // handle response here
                    console.log(res, "PaymentSuccess")
                }}
                autoStart={true}
            />

        </View>
    );
};
export default PaymentWebPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20

    }
})
