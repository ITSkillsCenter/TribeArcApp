// @flow
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "../../constants";
import BackButton from "../../components/BackButton";
import {UserContext} from "../../context/UserContext";
import {handleQuery} from "../../graphql/requests";

export const AccountDetailsPage = ({navigation}) => {

    const user = useContext(UserContext)

    const [acct, setAcct] = useState()


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
            const qryRes = await handleQuery(qry, user.token, false)

            // console.log(qryRes.data.users[0].bank_accounts)
            await setAcct(qryRes.data.users[0].bank_accounts)

        } catch (e) {
            console.log(e, "FetchAcctErr")
        }


    }


    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>
            <Text style={styles.acctDet}>Account Details</Text>


            <FlatList
                data={acct}
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
                                        fontFamily: "Nexa-Book"
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
                }/>
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
        fontSize: 30,
        marginVertical: 25
    },
    addAcctBox: {
        flexDirection: "row",
        alignItems: "center",
        height: 100,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        padding: 20,
        marginVertical: 5,
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
        height: 70,
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
