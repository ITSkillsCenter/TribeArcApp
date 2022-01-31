// @flow
import React, {useContext, useEffect, useState} from 'react';

import {
    Image,
    ImageBackground,
    SafeAreaView, ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import {UserContext} from "../../context/UserContext";
import {useAuth} from "../../hooks/useAuth";
import {requests} from "../../graphql/queries";
import {handleQuery} from "../../graphql/requests";
import {useIsFocused} from "@react-navigation/native";


const DashBoard = ({navigation}) => {
    let notification = true;
    const isFocused = useIsFocused()

    const [savings, setSavings] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [bvn, setBvn] = useState("")
    const [isCardLinked, setIsCardLinked] = useState(false)


    useEffect(() => {
        Balance()

        // CheckLinkedCard()
    }, [isFocused])

    const user = useContext(UserContext)


    const CheckLinkedCard = async () => {

        const qry = `query {
                cards(where: { user: 1 }) {
                 CardNumber
                 Cvv
                 expiry
                pin
                    }
                        }`
        try {

            let res = await handleQuery(qry, user.token, false);
            // console.log(res.data.cards[0])
            if (res.data.cards[0] !== undefined) {
                setIsCardLinked(true)
            }


        } catch (e) {
            // console.log(e, "CheckLinkedCardError")
        }

    }


    const Balance = async () => {

        const qry = `query {
                        savingAccounts(where: { user_id: ${user.id} }) {
                        id
                        amount_saved
                        bvn
                        user_id{
                            id
                            firstname
                            lastname
                            phone_number
                              }
                                }
                                    }`


        try {
            // console.log(qry, "rererere")

            let res = await handleQuery(qry, user.token, false);
            await setFirstname(res.data.savingAccounts[0].user_id.firstname)
            await setLastname(res.data.savingAccounts[0].user_id.lastname)
            await setPhoneNumber(res.data.savingAccounts[0].user_id.phone_number)
            await setBvn(res.data.savingAccounts[0].bvn)
            await setSavings(res.data.savingAccounts[0].amount_saved)

            console.log(res.data.savingAccounts[0].user_id.phone_number, "REZZZXXXX");



        } catch (e) {
            console.log(e, "GetBalanceError")

        }

    }


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.container2}>


                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Profile", {firstname, lastname})
                    }} style={styles.imgContainer}>
                        <Image style={styles.img} resizeMode={"contain"}
                               source={require("../../assets/images/userImg.png")}/>
                    </TouchableOpacity>
                    <View style={styles.nameContainer}>
                        <Text style={styles.username}>Hello {firstname},</Text>
                        <Text style={styles.welcomeText}>Welcome Back!</Text>
                    </View>
                    <TouchableOpacity>
                        <Image resizeMode={"contain"}
                               source={notification ? icons.notificationBell : icons.notificationDot}
                               style={styles.notification}/>
                    </TouchableOpacity>
                </View>


                <View style={styles.balanceFrame}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        alignItems: 'center'
                    }}>
                        <View>
                            <Text style={styles.tsb}>Total Savings Balance</Text>
                            <Text style={styles.balance}>₦ {savings?.toLocaleString()}</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("Savings")}>
                            <Image resizeMode={"contain"} style={{width: 40, height: 40}} source={icons.plusIcon}/>
                        </TouchableOpacity>
                    </View>

                    <Image resizeMode={"contain"} source={icons.ellipse} style={{width: 80, height: 50, top: 30}}/>
                </View>

                {/*<View style={styles.balanceFrameContainer}>*/}


                <TouchableOpacity activeOpacity={0.8} style={styles.saveFrame}
                                  onPress={() => navigation.navigate("Savings")}>

                    <View>
                        <Image source={icons.pigIcon} resizeMode={"contain"} style={{width: 55, height: 55}}/>
                    </View>

                    <View style={{justifyContent: "space-between", right: 25, height: 50}}>
                        <Text style={{fontFamily: "Nexa-Bold", color: COLORS.black, letterSpacing: 0.8}}>SAVE FOR THE
                            FUTURE</Text>
                        <Text style={{color: "#A19FCD"}}>Tap to get started with Tribearc</Text>
                    </View>

                    <Image source={icons.arrowRight} style={{width: 20, height: 20}} resizeMode={"contain"}/>
                </TouchableOpacity>

                <View style={styles.TodoBox}>
                    <Text style={styles.todo}>To - Dos</Text>
                </View>


                <ScrollView showsVerticalScrollIndicator={false} style={styles.cardContainer}>
                    {!isCardLinked && <TouchableOpacity style={styles.cardBox} activeOpacity={0.8}
                                                        onPress={() => navigation.navigate("LinkCard")}>
                        <Image source={icons.linkCard} style={{width: 50, height: 50}}/>
                        <Text style={styles.linkCardText}>Link a Card</Text>
                        <Image source={icons.arrowRight} style={{width: 20, height: 20, right: 20}}
                               resizeMode={"contain"}/>
                    </TouchableOpacity>}

                    {bvn === null &&
                        <>
                            <View style={{height: 0.5, backgroundColor: "#E9E9E9", marginVertical: 5}}/>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("AddBvn")
                            }} style={styles.cardBox} activeOpacity={0.8}>
                                <Image source={icons.addBvn} style={{width: 50, height: 50}}/>
                                <Text style={styles.linkCardText}>Add your BVN</Text>
                                <Image source={icons.arrowRight} style={{width: 20, height: 20, right: 20}}
                                       resizeMode={"contain"}/>
                            </TouchableOpacity>
                        </>

                    }


                    <View style={{height: 0.5, backgroundColor: "#E9E9E9", marginVertical: 5}}/>
                    <TouchableOpacity style={styles.cardBox} activeOpacity={0.8}
                                      onPress={() => navigation.navigate("CommunityQuestions")}>
                        <Image source={icons.commQuestion} style={{width: 50, height: 50}}/>
                        <Text style={styles.linkCardText}>Community Questions</Text>
                        <Image source={icons.arrowRight} style={{width: 20, height: 20, right: 20}}
                               resizeMode={"contain"}/>
                    </TouchableOpacity>

                    {firstname === null || lastname === null || phoneNumber === null &&
                        <>
                            <View style={{height: 0.5, backgroundColor: "#E9E9E9", marginVertical: 5}}/>
                            <TouchableOpacity style={styles.cardBox} activeOpacity={0.8}
                                              onPress={() => navigation.navigate("EditProfile")}>
                                <Image source={icons.completeProfile} style={{width: 50, height: 50}}/>
                                <Text style={styles.linkCardText}>Complete Your profile</Text>
                                <Image source={icons.arrowRight} style={{width: 20, height: 20, right: 20}}
                                       resizeMode={"contain"}/>
                            </TouchableOpacity>
                        </>
                    }


                    <View style={{height: 200, marginBottom: 310,}}/>
                </ScrollView>

            </View>

        </SafeAreaView>
    );
};

export default DashBoard


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        // height:"100%"
    },
    container2: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: COLORS.white
    },
    header: {
        // width: SIZES.width,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between"
    },
    imgContainer: {},
    img: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    nameContainer: {
        // backgroundColor:"cyan",
        width: SIZES.width * 0.5,
        height: 50,
        justifyContent: "space-between",
        marginHorizontal: 15,
        right: 10

    },
    username: {
        fontSize: 16,
        color: COLORS.black,
        fontFamily: "Nexa-Book"
    },
    welcomeText: {
        color: COLORS.primary,
        fontSize: 20,
        fontFamily: "Nexa-Bold"
    },
    notification: {
        width: 40,
        height: 40,
        // alignSelf:'flex-end'
    },
    balanceFrameContainer: {
        // width: SIZES.width,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: "center",
        marginVertical: 50

    },
    balanceFrame: {
        marginVertical: 40,
        borderRadius: 15,
        // padding: 20,
        height: 200,
        backgroundColor: COLORS.primary,
        width: SIZES.width * 0.9,
        alignSelf: "center",
        justifyContent: "center",
        // alignItems: 'center'
    },
    saveFrame: {
        backgroundColor: '#EFF2FF',
        height: 120,
        width: SIZES.width * 0.9,
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 20

    },
    tsb: {
        color: COLORS.white,
        fontFamily: "Nexa-Bold",
        marginVertical: 20
    },
    balance: {
        color: COLORS.white,
        fontFamily: "Nexa-Bold",
        fontSize: 24
    },
    TodoBox: {
        marginVertical: 30
    },
    todo: {
        color: COLORS.black,
        fontFamily: "Nexa-Bold",
        fontSize: 20
    },
    cardContainer: {
        height: "100%"

        // backgroundColor:"cyan",
        // paddingVertical:10,

    },
    cardBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        // backgroundColor:'cyan'


    },
    linkCardText: {
        fontSize: 16,
        width: SIZES.width * 0.7,
        fontFamily: "Nexa-Bold",
        // right: 100,
        color: COLORS.black,
        // backgroundColor:"cyan"
    }
})
