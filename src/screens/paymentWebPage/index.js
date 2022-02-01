// @flow
import React from 'react';
import {View, StyleSheet} from "react-native";
import {Paystack} from "react-native-paystack-webview/lib";
import {COLORS} from "../../constants";
import BackButton from "../../components/BackButton";

const PaymentWebPage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>

            <Paystack
                paystackKey="your-public-key-here"
                amount={'25000.00'}
                billingEmail="paystackwebview@something.com"
                activityIndicatorColor="green"
                onCancel={(e) => {
                    // handle response here
                }}
                onSuccess={(res) => {
                    // handle response here
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
