// @flow
import React, {useContext, useEffect, useState} from 'react';

import {Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import {UserContext} from "../../context/UserContext";
import {handleQuery} from "../../graphql/requests";
import {useIsFocused} from "@react-navigation/native";
import FastImage from 'react-native-fast-image'
import moment from "moment";


const DashBoard = ({navigation}) => {
    let notification = true;
    const isFocused = useIsFocused()

    // const frames = ["Total Savings Balance", "Investment Account Balance", "Voluntary Account Balance"]

    const [savings, setSavings] = useState("")
    const [voluntary, setVoluntary] = useState("")
    const [totalBalance, setTotalBalance] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [profession, setProfession] = useState("")
    const [bvn, setBvn] = useState("")
    const [isCardLinked, setIsCardLinked] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [avatar, setAvatar] = useState(null)
    const [questions, setQuestions] = useState([])
    const [creditCards, setCreditCards] = useState([])
    const [regFeePaid, setRegFeePaid] = useState(false)


    useEffect(() => {

        CheckBalance()
        FetchTransactions()
        GetQuestion()
        // CheckLinkedCard()
    }, [isFocused])

    const user = useContext(UserContext)

    const CheckBalance = async () => {


        let qry = `query {
                savingAccounts(where: { user_id: ${user.id} }) {
                    voluntary_funds
                     bvn_status
                    amount_saved
                        user_id {
                            id
                            firstname
                            lastname
                            phone_number
                            profession
                            avatar
                            paid_reg_fee
                            credit_cards{
                                    id
                                        }
                                    }
                                }
                            }`
        try {


            // console.log(qry)

            const bal = await handleQuery(qry, user.token, false)
            console.log(bal.data.savingAccounts[0].bvn_status)

            await setSavings(bal.data.savingAccounts[0].amount_saved)
            await setVoluntary(bal.data.savingAccounts[0].voluntary_funds)
            await setTotalBalance(bal.data.savingAccounts[0].amount_saved + bal.data.savingAccounts[0].voluntary_funds)
            await setFirstname(bal.data.savingAccounts[0].user_id.firstname)
            await setLastname(bal.data.savingAccounts[0].user_id.lastname)
            await setAvatar(bal.data.savingAccounts[0].user_id.avatar)
            await setPhoneNumber(bal.data.savingAccounts[0].user_id.phone_number)
            await setProfession(bal.data.savingAccounts[0].user_id.profession)
            await setRegFeePaid(bal.data.savingAccounts[0].user_id.paid_reg_fee)
            await setCreditCards(bal.data.savingAccounts[0].user_id.credit_cards)
            await setBvn(bal.data.savingAccounts[0].bvn_status)

            // console.log(bal.data.savingAccounts[0].user_id.credit_cards)


        } catch (e) {
            console.log(e, "errorCheckBal")
        }

    }


    const FetchTransactions = async () => {

        let qry = `query {
                savingsTransactions(where: { user_id: ${user.id} }, sort: "created_at:desc", limit:4) {
                amount_paid
                created_at
                status
                user_id {
                    id
                            }
                          }
                        }`

        try {

            // console.log(qry)

            let res = await handleQuery(qry, user.token, false)
            // console.log(res.data.savingsTransactions, " Rezzzzzzzz")
            await setTransactions(res.data.savingsTransactions)


        } catch (e) {
            console.log(e, "FetchTransError")
        }
    }

    const GetQuestion = async () => {

        let getPolls = `query {
                polls(where: { users_id: ${user.id} }) {
                id
                question_id {
                    id
                    }
                }
            }`


        let qry = `query{
            questions(where:{ community_id:15}){
            id
            question
            answers{
            id
            choice
            votes
                }
              }
            }`
        try {

            // setIsLoading(true)

            let response = await handleQuery(getPolls, user.token, false)
            // console.log(response.data.polls, "REZZZZZ")


            const arr = response.data.polls.map((item) => {
                return item.question_id.id
            })

            // console.log(arr)

            let res = await handleQuery(qry, user.token, false)

            const UnansweredQuestions = await res.data.questions.filter(item => !arr.includes(item.id))
            // console.log(UnansweredQuestions, "UNANSS")

            await setQuestions(UnansweredQuestions)


        } catch (e) {
            console.log(e, "QuestionsError")
            // await setIsLoading(false)
        }


    }


    return (<SafeAreaView style={styles.container}>

        <View style={styles.container2}>


            <View style={styles.header}>
                <View style={styles.imgContainer}>
                    <FastImage style={styles.img}
                               source={avatar ? {
                                   uri: avatar,
                                   priority: FastImage.priority.normal
                               } : require("../../assets/images/userImg.png")}/>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.username}>Hello {firstname},</Text>
                    <Text style={styles.welcomeText}>Welcome Back!</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    // Alert.alert("Notification", "Notification feature coming soon")
                }}>
                    <Image resizeMode={"contain"}
                           source={notification ? icons.notificationBell : icons.notificationDot}
                           style={styles.notification}/>
                </TouchableOpacity>
            </View>


            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{width: "100%", marginBottom: 15}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                        <ImageBackground resizeMode={"contain"} source={icons.balFrame} style={styles.balanceFrame}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                alignItems: 'center'
                            }}>
                                <View>
                                    <Text style={styles.tsb}>Total Savings Balance</Text>
                                    <Text style={styles.balance}>₦ {totalBalance?.toLocaleString()}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate(regFeePaid ? "SavingsMainScreen" : "RegistrationFee", "backButton")}>
                                    <Image resizeMode={"contain"} style={{width: 30, height: 30}}
                                           source={icons.plusIcon}/>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                        <ImageBackground resizeMode={"contain"} source={icons.balFrame} style={styles.balanceFrame}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                alignItems: 'center'
                            }}>
                                <View>
                                    <Text style={styles.tsb}>Investment Account Balance</Text>
                                    <Text style={styles.balance}>₦ {savings?.toLocaleString()}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate(regFeePaid ? "Savings" : "RegistrationFee")}>
                                    <Image resizeMode={"contain"} style={{width: 30, height: 30}}
                                           source={icons.plusIcon}/>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                        <ImageBackground resizeMode={"contain"} source={icons.balFrame}
                                         style={[styles.balanceFrame, {marginRight: 0}]}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                alignItems: 'center'
                            }}>
                                <View>
                                    <Text style={styles.tsb}>Voluntary Account Balance</Text>
                                    <Text style={styles.balance}>₦ {voluntary?.toLocaleString()}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate(regFeePaid ? "TopUpScreen" : "RegistrationFee", "backButton")}>
                                    <Image resizeMode={"contain"} style={{width: 30, height: 30}}
                                           source={icons.plusIcon}/>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>

                    </ScrollView>


                </View>


                <TouchableOpacity activeOpacity={0.8} style={styles.saveFrame}
                                  onPress={() => navigation.navigate(regFeePaid ? "SavingsMainScreen" : "RegistrationFee", "backButton")}>
                    {/*<View>*/}
                    <Image source={icons.pigIcon} resizeMode={"contain"} style={{width: 50, height: 50}}/>
                    {/*</View>*/}
                    <View style={{justifyContent: "space-between", height: 50, width: "70%", alignSelf: "center"}}>
                        <Text style={{fontFamily: "Nexa-Book", color: COLORS.black, letterSpacing: 0.7,}}>SAVE FOR
                            THE
                            FUTURE</Text>
                        <Text style={{color: "#A19FCD", fontFamily: "Nexa-Book"}}>Tap to get started with
                            Tribearc</Text>
                    </View>

                    <Image source={icons.arrowRight} style={{width: 20, height: 20}} resizeMode={"contain"}/>

                </TouchableOpacity>

                <View style={styles.cardContainer}>

                    {creditCards.length < 0 || !bvn || questions.length > 0 ? (<View style={styles.TodoBox}>
                        <Text style={styles.todo}>To - Dos</Text>
                    </View>) : null}

                    {creditCards.length < 0 &&
                        <>
                            <TouchableOpacity style={styles.cardBox} activeOpacity={0.8}
                                              onPress={() => navigation.navigate(regFeePaid ? "LinkCard" : "RegistrationFee")}>
                                <Image source={icons.linkCard} style={{width: 50, height: 50}}/>
                                <Text style={styles.linkCardText}>Link a Card</Text>
                                <Image source={icons.arrowRight} style={{width: 20, height: 20, right: 20}}
                                       resizeMode={"contain"}/>
                            </TouchableOpacity>
                            <View style={{height: 0.5, backgroundColor: "#E9E9E9", marginVertical: 5}}/>
                        </>
                    }

                    {!bvn && <>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate(regFeePaid ? "AddBvn" : "RegistrationFee")
                        }} style={styles.cardBox} activeOpacity={0.8}>
                            <Image source={icons.addBvn} style={{width: 50, height: 50}}/>
                            <Text style={styles.linkCardText}>Add your BVN</Text>
                            <Image source={icons.arrowRight} style={{width: 20, height: 20, right: 20}}
                                   resizeMode={"contain"}/>
                        </TouchableOpacity>
                        <View style={{height: 0.5, backgroundColor: "#E9E9E9", marginVertical: 5}}/>

                    </>

                    }


                    {questions.length > 0 && <>
                        <TouchableOpacity style={styles.cardBox} activeOpacity={0.8}
                                          onPress={() => navigation.navigate(regFeePaid ? "CommunityQuestions" : "RegistrationFee")}>
                            <Image source={icons.commQuestion} style={{width: 50, height: 50}}/>
                            <Text style={styles.linkCardText}>Community Questions</Text>
                            <Image source={icons.arrowRight} style={{width: 20, height: 20, right: 20}}
                                   resizeMode={"contain"}/>
                        </TouchableOpacity>
                        <View style={{height: 0.5, backgroundColor: "#E9E9E9", marginVertical: 5}}/>


                    </>}


                    {/*{!firstname || !lastname || !phoneNumber || !profession && <>*/}
                    {/*    <View style={{height: 0.5, backgroundColor: "#E9E9E9", marginVertical: 5}}/>*/}
                    {/*    <TouchableOpacity style={styles.cardBox} activeOpacity={0.8}*/}
                    {/*                      onPress={() => navigation.navigate("EditProfile")}>*/}
                    {/*        <Image source={icons.completeProfile} style={{width: 50, height: 50}}/>*/}
                    {/*        <Text style={styles.linkCardText}>Complete Your profile</Text>*/}
                    {/*        <Image source={icons.arrowRight} style={{width: 20, height: 20, right: 20}}*/}
                    {/*               resizeMode={"contain"}/>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</>}*/}


                    {transactions.length !== 0 && <View style={styles.recentTransaction}>
                        <Text style={styles.todo}>Recent Transactions</Text>

                        <View style={{flexDirection: "row", justifyContent: "center", alignSelf: "center"}}>
                            <Text
                                onPress={() => navigation.navigate(regFeePaid ? "RecentTransactions" : "RegistrationFee")}
                                style={styles.seeAll}>See
                                all</Text>
                            <Image resizeMode={"contain"}
                                   style={{width: 15, height: 15, alignSelf: "center", bottom: 2}}
                                   source={icons.arrowRight}/>
                        </View>
                    </View>}


                    {transactions.map((item, index) => (
                        <View key={index}>
                            <TouchableOpacity style={styles.cardBox} activeOpacity={0.8}
                                              onPress={() => {
                                              }}>
                                <Image source={item.status === "SUCCESS" ? icons.tranSucc : icons.transFailed}
                                       style={{width: SIZES.width * 0.1, height: SIZES.width * 0.1}}/>
                                <Text style={styles.recentTransactionText}>Card Deposit</Text>

                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: "space-between",
                                    height: SIZES.width * 0.1
                                }}>
                                    <Text style={{
                                        color: COLORS.black, fontFamily: "Nexa-Bold", fontSize: SIZES.width * 0.04
                                    }}>₦{item?.amount_paid.toLocaleString()}</Text>
                                    <Text style={{
                                        color: COLORS.black, fontFamily: "Nexa-Book", fontSize: SIZES.width * 0.025
                                    }}>{moment(item?.created_at).format("MMM D, YYYY")}</Text>
                                </View>
                            </TouchableOpacity>

                            <View
                                style={{
                                    backgroundColor: "#EEF1F5",
                                    height: 0.5,
                                    width: SIZES.width * 0.9,
                                    alignSelf: "center",
                                }}
                            />

                        </View>

                    ))}

                    <View style={{height: 60, marginBottom: 60,}}/>
                </View>
            </ScrollView>


        </View>

    </SafeAreaView>);
};

export default DashBoard


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white, // height:"100%"
    },
    container2: {
        paddingHorizontal: 20,
        paddingVertical: 10,
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
        width: SIZES.width * 0.1,
        height: SIZES.width * 0.1,
        borderRadius: 50
    },
    nameContainer: {
        // backgroundColor:"cyan",
        width: SIZES.width * 0.5,
        height: SIZES.width * 0.1,
        justifyContent: "space-between",
        marginHorizontal: 15, right: 10

    },
    username: {
        fontSize: SIZES.width * 0.04, color: COLORS.black, fontFamily: "Nexa-Book"
    }, welcomeText: {
        color: COLORS.primary, fontSize: SIZES.width * 0.04, fontFamily: "Nexa-Bold"
    }, notification: {
        width: SIZES.width * 0.08, height: SIZES.width * 0.08, // alignSelf:'flex-end'
    }, balanceFrameContainer: {
        // width: SIZES.width,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        // alignItems: 'center',
        justifyContent: "center",
        marginVertical: 50

    }, balanceFrame: {
        // marginTop: 5,
        borderRadius: 15, // padding: 20,
        height: SIZES.height * 0.25,
        width: SIZES.width * 0.8,
        marginRight: 10,
        justifyContent: "center",
    },
    saveFrame: {
        backgroundColor: '#EFF2FF',
        height: SIZES.height * 0.15,
        width: "100%",
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 10

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
        marginTop: 30
    },
    todo: {
        color: COLORS.black,
        fontFamily: "Nexa-Bold",
        fontSize: 16
    },
    cardContainer: {
        height: "100%"
    }, cardBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10, // backgroundColor:'cyan'


    }, linkCardText: {
        fontSize: 18,
        width: SIZES.width * 0.6,
        fontFamily: "Nexa-Bold", // right: 100,
        color: COLORS.black, // backgroundColor:"cyan"
    },
    recentTransaction: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20

    },
    seeAll: {
        color: COLORS.primary,
        fontFamily: "Nexa-Book",
        fontSize: 18,
        alignSelf: "center",
    },
    recentTransactionText: {
        fontSize: SIZES.width * 0.04,
        width: SIZES.width * 0.4,
        fontFamily: "Nexa-Bold", // right: 100,
        color: COLORS.black, // backgroundColor:"cyan"
    },

})
