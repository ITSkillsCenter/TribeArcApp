// @flow
import React, {useContext, useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES,} from "../../constants";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import {handleQuery} from "../../graphql/requests";
import {UserContext} from "../../context/UserContext";

const InvestmentDetailsScreen = ({navigation, route}) => {

    const [counter, setCounter] = useState(0)
    const [loading, setLoading] = useState(false)
    const [slotBought, setSlotBought] = useState(0);


    const user = useContext(UserContext);


    const investments = route.params
    // console.log(investments.price_per_slot)


    useEffect(() => {
        GetSlotLeft()

    }, [])


    const GetSlotLeft = async () => {

        let slt = `query {
  usersInvestments(where: { investment: ${investments.id} }) {
    slot_bought
  }
}`

        try {
            const sltRes = await handleQuery(slt, user.token, false)
            // console.log(sltRes.data.usersInvestments)

            const newArr = sltRes.data.usersInvestments.map((item) => {
                return item.slot_bought
            })

            // console.log(newArr)

            setSlotBought(newArr.reduce((a, b) => a + b, 0))


        } catch (e) {
            console.log(e, "GetSlotLeftErr")
        }


    }


    const HandleInvest = async () => {


        let slotBoughtQry = `query {
  usersInvestments(where: { users_id: ${user.id}, investment: ${investments.id} }) {
    id
    slot_bought
  }
}`


        try {

            const slotBoughtRes = await handleQuery(slotBoughtQry, user.token, false)


            if (slotBoughtRes.data.usersInvestments.length > 0) {

                // console.log(slotBoughtRes.data.usersInvestments[0].id)


                let updInv = `mutation {
                  mtn1:  updateUsersInvestment(input: { where: { id: ${slotBoughtRes.data.usersInvestments[0].id} },
                    data: { slot_bought: ${slotBoughtRes.data.usersInvestments[0].slot_bought + counter} } }) {
                    usersInvestment {
                    slot_bought
                    }
                    }
                    
                     mtn2: updateInvestment(
    input: { where: { id: ${investments.id} }, data: { funds_raised: ${investments.funds_raised + counter * investments.price_per_slot} } }
  ) {
    investment {
      id
    }
  }
                    
                    }`

                // console.log(updInv)
                setLoading(true)


                const updInvRes = await handleQuery(updInv, user.token, false)
                setLoading(false)

                navigation.navigate("BottomTabs")

                // console.log(updInvRes)
            }

            if (slotBoughtRes.data.usersInvestments.length < 1) {

                // slotBoughtRes.data.usersInvestments[0].slot_bought

                let mtn = `mutation {
               mtn1: createUsersInvestment(
                    input: {
                    data: {
                     users_id: ${user.id}
                        investment: ${investments.id}
                         community: 15
                    slot_bought: ${counter}
                 status: INVESTING
                    }
                        }
                        ) {
                    usersInvestment {
                 investment {
                     name
                        }
                slot_bought
                users_id {
                    id
                }
                }
                    }
                    
                     mtn2: updateInvestment(
    input: { where: { id: ${investments.id} }, data: { funds_raised: ${investments.funds_raised + counter * investments.price_per_slot} } }
  ) {
    investment {
      id
    }
  }
                    
                        }`


                // console.log(mtn)
                setLoading(true)
                const crtInv = await handleQuery(mtn, user.token, false)
                // console.log(crtInv)
                setLoading(false)

                navigation.navigate("BottomTabs")

            }


        } catch (e) {
            console.log(e, "HandleInvestErr")
            setLoading(false)

        }
    }


    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>
            <Text style={styles.title}>{investments.name}</Text>


            <Image
                resizeMode={"cover"}
                source={{uri: investments?.image}}
                style={{width: "100%", height: SIZES.height * 0.25}}
            />

            <View style={styles.box}>
                <View style={{justifyContent: "space-between", height: 30}}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontFamily: "Nexa-Book",
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
                    <Text style={styles.invTitle}>Investor(s)</Text>
                    <Text style={styles.invBoxDet}>{investments?.users_investments.length}</Text>


                </View>
                <View style={styles.invBox}>
                    <Text style={styles.invTitle}>Slots Left</Text>
                    <Text
                        style={styles.invBoxDet}>{`${investments?.total_slot - slotBought}`}</Text>

                </View>


            </View>

            <View style={styles.invNowBox}>
                <View
                    style={{width: "35%", justifyContent: "space-between", alignItems: "center", flexDirection: "row"}}>
                    <TouchableOpacity
                        onPress={() => setCounter(Math.max(1, counter - 1))}
                        style={{
                            width: 25,
                            height: 25,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <Image source={icons.minusButton} style={{width: 70, height: 70}}/>

                    </TouchableOpacity>

                    <Text
                        style={styles.counter}>{counter}</Text>


                    <TouchableOpacity
                        onPress={() => setCounter(counter + 1)}
                        style={{
                            width: 25,
                            height: 25,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                        <Image source={icons.addIcon} style={{width: 25, height: 25}}/>

                    </TouchableOpacity>


                </View>
                <View style={{width: "48%"}}>
                    <CustomButton loading={loading} onPress={async () => {

                        if (counter > 0 && counter < investments?.total_slot - slotBought) {
                            if (investments.invBal > (counter * investments.price_per_slot)) {

                                await HandleInvest()

                                // Alert.alert("can invest")

                            } else {
                                Alert.alert("Insufficient Investment Balance", "Please top-up your wallet or choose another investment")

                            }

                        }


                        // navigation.navigate("InvestmentTermsPage")
                    }} filled
                                  text={"Invest Now"}/>
                </View>

            </View>
        </View>
    );
};


export default InvestmentDetailsScreen

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
        width: "100%",
        alignItems: "center"
    },
    counter: {
        fontSize: 20,
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
