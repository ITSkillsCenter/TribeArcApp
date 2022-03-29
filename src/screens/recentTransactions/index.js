// @flow
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import {handleQuery} from "../../graphql/requests";
import {UserContext} from "../../context/UserContext";
import moment from "moment";
import NotchResponsive from "../../components/NotchResponsive";

const RecentTransactions = ({navigation}) => {

    const user = useContext(UserContext)

    const [transactions, setTransactions] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {

        FetchTransactions()

    }, [])


    const FetchTransactions = async () => {

        let qry = `query {
                savingsTransactions(where: { user_id: ${user.id} }, sort: "created_at:desc", limit:15) {
                amount_paid
                created_at
                status
                user_id {
                    id
                            }
                          }
                        }`


        // console.log(qry)

        try {
            setIsLoading(true)

            let res = await handleQuery(qry, user.token, false)
            // console.log(res.data.savingsTransactions, " Rezzzzzzzz")
            await setTransactions(res.data.savingsTransactions)
            await setIsLoading(false)


        } catch (e) {
            console.log(e, "FetchTransError")
            await setIsLoading(false)

        }
    }


    const Transactions = ({item}) => {
        return (
            <View>
                <TouchableOpacity style={styles.cardBox} activeOpacity={0.8}
                                  onPress={() => {
                                  }}>
                    <Image source={item.status === "SUCCESS" ? icons.tranSucc : icons.transFailed}
                           style={{width: 50, height: 50}}/>
                    <Text style={styles.recentTransactionText}>Card Deposit</Text>

                    <View style={{alignItems: 'center', justifyContent: "space-between", height: 40}}>
                        <Text style={{
                            color: COLORS.black,
                            fontFamily: "Nexa-Bold",
                            fontSize: SIZES.width * 0.04
                        }}>₦{item?.amount_paid.toLocaleString()}</Text>
                        <Text style={{
                            color: COLORS.black,
                            fontSize: SIZES.width * 0.025,
                            fontFamily: "Nexa-Book"
                        }}>{moment(item?.created_at).format("MMM Do, YYYY")}</Text>
                    </View>
                </TouchableOpacity>
            </View>

        )
    }

    const renderSeparator = () => (
        <View
            style={{
                backgroundColor: "#EEF1F5",
                height: 0.5,
                width: SIZES.width * 0.9,
                alignSelf: "center",

            }}
        />
    );


    return (
        <>
            <NotchResponsive color={COLORS.white}/>
            <View style={styles.container}>
                <BackButton onPress={() => navigation.pop()}/>
                <View>
                    <Text style={styles.recentTran}>Recent Transactions</Text>
                </View>

                {isLoading && <ActivityIndicator color={COLORS.secondary} size={"small"}/>}
                <FlatList
                    data={transactions}
                    renderItem={Transactions}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={renderSeparator}

                />


            </View>
        </>
    );
};

export default RecentTransactions

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.width * 0.04,

    },
    recentTran: {
        fontSize: SIZES.width * 0.06,
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        marginVertical: 20
    },
    cardBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        // backgroundColor:'cyan'


    },
    recentTransactionText: {
        fontSize: SIZES.width * 0.04,
        width: SIZES.width * 0.4,
        fontFamily: "Nexa-Bold",
        // right: 100,
        color: COLORS.black,
        // backgroundColor:"cyan"
    },


})

