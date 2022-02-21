// @flow
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import {UserContext} from "../../context/UserContext";
import {handleQuery} from "../../graphql/requests";
import LottieView from "lottie-react-native";

export const AccountDetailsPage = ({navigation}) => {

    const user = useContext(UserContext)

    const [acct, setAcct] = useState([])
    const [loading, setLoading] = useState([])


    useEffect(() => {

        FetchAcct()

    }, [])


    const FetchAcct = async () => {


        let qry = `query {
                users(where: { id: ${user.id} }) {
                bank_accounts {
                    id
                    bank_name
                    account_name
                    account_number
                            }
                        }
                    }`

        try {
            setLoading(true)
            const qryRes = await handleQuery(qry, user.token, false)

            // console.log(qryRes.data.users[0].bank_accounts)
            await setAcct(qryRes.data.users[0].bank_accounts)
            await setLoading(false)


        } catch (e) {
            console.log(e, "FetchAcctErr")
            await setLoading(false)

        }


    }


    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>
            <Text style={styles.acctDet}>Account Details</Text>


            {loading ? <ActivityIndicator color={COLORS.secondary} size={"small"}/> :
                <FlatList
                    data={acct}
                    ListEmptyComponent={
                        <View style={{alignItems: "center", justifyContent: "center",}}>

                            <LottieView style={{width: SIZES.width * 0.6, height: SIZES.width * 0.6}}
                                        source={require("../../assets/images/emptyAnim.json")} autoPlay={true}/>

                            <Text style={{color:COLORS.primary, fontSize:18, fontFamily:"Nexa-Bold"}}>Your have not added any account</Text>
                        </View>
                    }
                    renderItem={({item}) => (
                        <>
                            <View style={styles.addAcctBox}>
                                <View style={{justifyContent: "space-between", height: 50}}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 18,
                                        fontFamily: "Nexa-Bold"
                                    }}>{item.account_name}</Text>
                                    <View style={{flexDirection: "row", width: "70%", justifyContent: "space-between"}}>
                                        <Text style={{
                                            color: COLORS.black,
                                            fontSize: 14,
                                            fontFamily: "Nexa-Book",
                                            paddingRight: 10
                                        }}>{item.bank_name}</Text>
                                        <Text style={{
                                            color: COLORS.black,
                                            fontSize: 14,
                                            fontFamily: "Nexa-Book"
                                        }}>{item.account_number}</Text>
                                    </View>
                                </View>

                            </View>

                        </>
                    )
                    }/>}
            <TouchableOpacity onPress={() => navigation.navigate("AddAccountDetailsScreen")}
                              style={styles.addAcctButton}>
                <Text style={styles.addAcctText}>Add New Account</Text>
            </TouchableOpacity>

        </View>
    );
};

export default AccountDetailsPage

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white
    },
    acctDet: {
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        fontSize: SIZES.width * 0.07,
        // marginVertical: 25
    },
    addAcctBox: {
        alignSelf:"center",
        flexDirection: "row",
        alignItems: "center",
        height: 130,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        padding: 20,
        marginVertical: 5,
        elevation:3,
        width: "99%",
        justifyContent: "space-between",
        shadowOpacity: 0.08,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0
        }

    },
    addAcctButton: {
        alignItems: "center",
        justifyContent: "center",
        height: SIZES.width * 0.15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#C4C4C4",
        marginVertical: 40,
        borderStyle: "dashed",


    },
    addAcctText: {
        color: COLORS.black,
        fontFamily: "Nexa-Book",
        fontSize: 14
    }

})
