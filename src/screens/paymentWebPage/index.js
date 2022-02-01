// @flow
import React, {useContext} from 'react';
import {StyleSheet, View} from "react-native";
import {Paystack} from "react-native-paystack-webview/lib";
import {COLORS} from "../../constants";
import BackButton from "../../components/BackButton";
import {UserContext} from "../../context/UserContext";
import {handleQuery} from "../../graphql/requests";

const PaymentWebPage = ({navigation, route}) => {

    const user = useContext(UserContext)

    const amount = parseFloat(route.params.replace(",", ""))
    // console.log(amount, " amount")


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


            if (res.status){
                navigation.navigate("SuccessScreen")
            }


            // console.log(res.data.event, "REZZZZ")
            // console.log(res.status, "Statussss")
            // console.log(res.transactionRef.trxref, "trxreffff")

        } catch (e) {

            console.log(e, "ERRORtrx")


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
                onCancel={(e) => {
                    // handle response here
                    console.log(e, "PaymentError")
                }}
                // channels={JSON.stringify(["card","ussd"])}
                onSuccess={async (res) => {
                    await TransactionData(res)
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
