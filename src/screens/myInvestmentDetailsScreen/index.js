// @flow
import React, {useContext, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES,} from "../../constants";
import BackButton from "../../components/BackButton";
import {handleQuery} from "../../graphql/requests";
import {UserContext} from "../../context/UserContext";
import NotchResponsive from "../../components/NotchResponsive";

const MyInvestmentDetailsScreen = ({navigation, route}) => {


    const user = useContext(UserContext);

    const [slotBought, setSlotBought] = useState(0)

    const investments = route.params


    useEffect(() => {
        SlotBought()
    }, []);


    const SlotBought = async () => {

        let qry = `query {
  usersInvestments(where: { investment: ${investments.id}, users_id: ${user.id} }) {
    id
    slot_bought
  }
}`
        try {

            // console.log(qry)

            let qryRes = await handleQuery(qry, user.token, false)

            console.log(qryRes.data.usersInvestments[0].slot_bought)
            await setSlotBought(qryRes.data.usersInvestments[0].slot_bought)


        } catch (e) {
            console.log(e, "getSlotBoughtErr")

        }
    }


    return (

        <>
            <NotchResponsive color={COLORS.white}/>
        <ScrollView style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>
            <Text style={styles.title}>{investments.name}</Text>

            <Image
                resizeMode={"cover"}
                source={{uri: investments.image}}
                style={{width: "100%", height: SIZES.height * 0.25}}
            />

            <View style={styles.box}>
                <View style={{justifyContent: "space-between", height: 40}}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontFamily: "Nexa-Bold",
                            color: COLORS.black,
                            marginVertical: 5
                        }}>{investments.name}</Text>
                    <Text
                        style={{fontSize: 14, fontFamily: "Nexa-Bold"}}>₦{investments?.price_per_slot.toLocaleString()}
                        <Text style={{fontSize: 12, fontFamily: "Nexa-Book", color: COLORS.black, opacity: 0.7}}> Per
                            Slot</Text></Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("PdfPage", investments.business_plan)}
                                  style={styles.pdf}>
                    <Image source={icons.pdficon} style={{width: 15, height: 20}}/>
                    <Text style={{fontSize: 16, fontFamily: 'Nexa-Bold'}}>Business Plan</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.invDet}>Investment Details</Text>

            <View style={styles.invContainer}>
                <View style={styles.invBox}>
                    <Text style={styles.invTitle}>Total Funding Required</Text>
                    <Text style={styles.invBoxDet}>₦ {investments?.funds_required.toLocaleString()} </Text>

                </View>
                <View style={styles.invBox}>
                    <Text style={styles.invTitle}>Funds Raised</Text>

                    <Text style={styles.invBoxDet}>₦ {investments?.funds_raised.toLocaleString()} </Text>


                </View>
                <View style={styles.invBox}>
                    <Text style={styles.invTitle}>Investors</Text>
                    <Text style={styles.invBoxDet}>{investments?.users_investments.length}</Text>


                </View>
                <View style={styles.invBox}>
                    <Text style={styles.invTitle}>Slots Bought</Text>
                    <Text style={styles.invBoxDet}>{slotBought}</Text>

                </View>


            </View>


        </ScrollView>
            </>
    );
};


export default MyInvestmentDetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20
    },
    title: {
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        fontSize: 26,
        marginVertical: 20
    },
    box: {
        marginVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between"

    },
    pdf: {
        height: 40,
        width: "40%",
        flexDirection: "row",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "white",
        shadowColor: "#000000",
        elevation: 2,
        shadowRadius: 0.7,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 0
        }
    },
    invDet: {
        color: COLORS.black,
        fontSize: 26,
        marginVertical: 20,
        fontFamily: "Nexa-Bold"
    },
    invContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    invBox: {
        marginVertical: 15,
        height: 80,
        width: "47%",
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "#D7D7D7",
        padding: 15,
        justifyContent: "space-between"
    },
    invTitle: {
        fontSize: 12,
        fontFamily: "nexa-Book",
        opacity: 0.6
    },
    invBoxDet: {
        fontFamily: "Nexa-Bold",
        fontSize: 18,

    },
    invNowBox: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    counter: {
        fontSize: SIZES.width * 0.05,
        fontFamily: "Nexa-Bold",
        backgroundColor: COLORS.white,
        justifyContent: "center",
        elevation: 2,
        borderRadius: 10,
        padding: 10,
        shadowRadius: 0.7,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 0
        }
    }


})
