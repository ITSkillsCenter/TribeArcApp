// @flow
import React, {useContext, useEffect, useState} from 'react';

import {
    Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import {UserContext} from "../../context/UserContext";
import {handleQuery} from "../../graphql/requests";
import {useIsFocused} from "@react-navigation/native";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";


// const frames = [
//     {"name": "Total Savings Balance"},
//     {"name": "Investment Account Balance"},
//     {"name": "Voluntary Account Balance"}
// ]


const DashBoard = ({navigation}) => {
    let notification = true;
    const isFocused = useIsFocused()

    // const frames = ["Total Savings Balance", "Investment Account Balance", "Voluntary Account Balance"]

    const [savings, setSavings] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [profession, setProfession] = useState("")
    const [bvn, setBvn] = useState("")
    const [isCardLinked, setIsCardLinked] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [avatar, setAvatar] = useState(null)
    const [questions, setQuestions] = useState([])


    useEffect(() => {

        CheckBalance()
        FetchTransactions()
        GetQuestion()
        // CheckLinkedCard()
    }, [isFocused])

    const user = useContext(UserContext)


    const CheckBalance = async () => {


        const infoQry = `query {
                        savingAccounts(where: { user_id: ${user.id} }) {
                        id
                        amount_saved
                        bvn
                        user_id{
                            id
                            firstname
                            lastname
                            phone_number
                            profession
                            avatar
                              }
                                }
                                    }`


        let qry = `query {
                        savingsTransactions(where: {
                         user_id: ${user.id},
                         status: "SUCCESS"
                          }) {
                        amount_paid
                            }
                            }`

        try {

            let InfoRes = await handleQuery(infoQry, user.token, false);
            await setFirstname(InfoRes.data.savingAccounts[0].user_id.firstname)
            await setLastname(InfoRes.data.savingAccounts[0].user_id.lastname)
            await setPhoneNumber(InfoRes.data.savingAccounts[0].user_id.phone_number)
            await setAvatar(InfoRes.data.savingAccounts[0].user_id.avatar)
            await setProfession(InfoRes.data.savingAccounts[0].user_id.profession)
            await setBvn(InfoRes.data.savingAccounts[0].bvn)
            // await setSavings(InfoRes.data.savingAccounts[0].amount_saved)


            let res = await handleQuery(qry, user.token, false)

            const arr = await res.data.savingsTransactions.map((item) => {
                return Number(item.amount_paid)
            })

            const totalSavings = await arr.reduce((a, b) => a + b, 0)
            await setSavings(totalSavings)
            // console.log(totalSavings, "TS")


            if (InfoRes.data.savingAccounts[0].user_id.avatar) {
                await AsyncStorage.setItem("ImageLocal", InfoRes.data.savingAccounts[0].user_id.avatar)
            }


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
            console.log(UnansweredQuestions, "UNANSS")

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
                    <Image style={styles.img} resizeMode={"cover"}
                           source={avatar ? {uri: avatar} : require("../../assets/images/userImg.png")}/>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.username}>Hello {firstname},</Text>
                    <Text style={styles.welcomeText}>Welcome Back!</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("CompleteProfile1")
                }}>
                    <Image resizeMode={"contain"}
                           source={notification ? icons.notificationBell : icons.notificationDot}
                           style={styles.notification}/>
                </TouchableOpacity>
            </View>


            <ScrollView showsVerticalScrollIndicator={false}>

                <View>
                    <ScrollView snapToAlignment={"start"} horizontal showsHorizontalScrollIndicator={false}>

                        <ImageBackground source={icons.balFrame} style={styles.balanceFrame}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                paddingHorizontal: 40,
                                alignItems: 'center'
                            }}>
                                <View>
                                    <Text style={styles.tsb}>Total Savings Balance</Text>
                                    <Text style={styles.balance}>₦ {savings?.toLocaleString()}</Text>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate("SavingsMainScreen")}>
                                    <Image resizeMode={"contain"} style={{width: 40, height: 40}}
                                           source={icons.plusIcon}/>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                        <ImageBackground source={icons.balFrame} style={styles.balanceFrame}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                paddingHorizontal: 40,
                                alignItems: 'center'
                            }}>
                                <View>
                                    <Text style={styles.tsb}>Investment Account Balance</Text>
                                    <Text style={styles.balance}>₦ {}</Text>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate("")}>
                                    <Image resizeMode={"contain"} style={{width: 40, height: 40}}
                                           source={icons.plusIcon}/>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                        <ImageBackground source={icons.balFrame} style={[styles.balanceFrame, {marginRight: 0}]}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                paddingHorizontal: 40,
                                alignItems: 'center'
                            }}>
                                <View>
                                    <Text style={styles.tsb}>Voluntary Account Balance</Text>
                                    <Text style={styles.balance}>₦ {}</Text>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate("")}>
                                    <Image resizeMode={"contain"} style={{width: 40, height: 40}}
                                           source={icons.plusIcon}/>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>

                    </ScrollView>


                </View>


                <TouchableOpacity activeOpacity={0.8} style={styles.saveFrame}
                                  onPress={() => navigation.navigate("SavingsMainScreen")}>

                    <View>
                        <Image source={icons.pigIcon} resizeMode={"contain"} style={{width: 55, height: 55}}/>
                    </View>

                    <View style={{justifyContent: "space-between", right: 25, height: 50}}>
                        <Text style={{fontFamily: "Nexa-Bold", color: COLORS.black, letterSpacing: 0.8}}>SAVE FOR
                            THE
                            FUTURE</Text>
                        <Text style={{color: "#A19FCD", fontFamily: "Nexa-Book"}}>Tap to get started with
                            Tribearc</Text>
                    </View>

                    <Image source={icons.arrowRight} style={{width: 20, height: 20}} resizeMode={"contain"}/>
                </TouchableOpacity>


                <View style={styles.cardContainer}>

                    <View style={styles.TodoBox}>
                        <Text style={styles.todo}>To - Dos</Text>
                    </View>

                    {!isCardLinked && <TouchableOpacity style={styles.cardBox} activeOpacity={0.8}
                                                        onPress={() => navigation.navigate("LinkCard")}>
                        <Image source={icons.linkCard} style={{width: 50, height: 50}}/>
                        <Text style={styles.linkCardText}>Link a Card</Text>
                        <Image source={icons.arrowRight} style={{width: 20, height: 20, right: 20}}
                               resizeMode={"contain"}/>
                    </TouchableOpacity>}

                    {bvn === null && <>
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


                    {questions.length > 0 && <>
                        <View style={{height: 0.5, backgroundColor: "#E9E9E9", marginVertical: 5}}/>
                        <TouchableOpacity style={styles.cardBox} activeOpacity={0.8}
                                          onPress={() => navigation.navigate("CommunityQuestions")}>
                            <Image source={icons.commQuestion} style={{width: 50, height: 50}}/>
                            <Text style={styles.linkCardText}>Community Questions</Text>
                            <Image source={icons.arrowRight} style={{width: 20, height: 20, right: 20}}
                                   resizeMode={"contain"}/>
                        </TouchableOpacity>

                    </>}


                    {!firstname || !lastname || !phoneNumber || !profession && <>
                        <View style={{height: 0.5, backgroundColor: "#E9E9E9", marginVertical: 5}}/>
                        <TouchableOpacity style={styles.cardBox} activeOpacity={0.8}
                                          onPress={() => navigation.navigate("EditProfile")}>
                            <Image source={icons.completeProfile} style={{width: 50, height: 50}}/>
                            <Text style={styles.linkCardText}>Complete Your profile</Text>
                            <Image source={icons.arrowRight} style={{width: 20, height: 20, right: 20}}
                                   resizeMode={"contain"}/>
                        </TouchableOpacity>
                    </>}


                    {transactions.length !== 0 && <View style={styles.recentTransaction}>
                        <Text style={styles.todo}>Recent Transactions</Text>

                        <View style={{flexDirection: "row", justifyContent: "center", alignSelf: "center"}}>
                            <Text onPress={() => navigation.navigate("RecentTransactions")} style={styles.seeAll}>See
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
                                       style={{width: 50, height: 50}}/>
                                <Text style={styles.recentTransactionText}>Card Deposit</Text>

                                <View style={{alignItems: 'center', justifyContent: "space-between", height: 40}}>
                                    <Text style={{
                                        color: COLORS.black, fontFamily: "Nexa-Bold", fontSize: 20
                                    }}>₦{item?.amount_paid.toLocaleString()}</Text>
                                    <Text style={{
                                        color: COLORS.black, fontFamily: "Nexa-Book"
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

                    <View style={{height: 20, marginBottom: 20,}}/>
                </View>
            </ScrollView>


        </View>

    </SafeAreaView>);
};

export default DashBoard


const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: COLORS.white, // height:"100%"
    }, container2: {
        paddingHorizontal: 20, paddingVertical: 30, backgroundColor: COLORS.white
    }, header: {
        // width: SIZES.width,
        flexDirection: "row", alignItems: 'center', justifyContent: "space-between"
    }, imgContainer: {}, img: {
        width: 50, height: 50, borderRadius: 50
    }, nameContainer: {
        // backgroundColor:"cyan",
        width: SIZES.width * 0.5, height: 50, justifyContent: "space-between", marginHorizontal: 15, right: 10

    }, username: {
        fontSize: 16, color: COLORS.black, fontFamily: "Nexa-Book"
    }, welcomeText: {
        color: COLORS.primary, fontSize: 20, fontFamily: "Nexa-Bold"
    }, notification: {
        width: 40, height: 40, // alignSelf:'flex-end'
    }, balanceFrameContainer: {
        // width: SIZES.width,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: "center",
        marginVertical: 50

    }, balanceFrame: {
        marginTop: 5, borderRadius: 15, // padding: 20,
        height: 200, marginRight: 20, // backgroundColor: COLORS.primary,
        width: SIZES.width * 0.8, alignSelf: "flex-start", justifyContent: "center", // alignItems: 'center'
    }, saveFrame: {
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
        fontSize: 18
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
        marginVertical: 30

    },
    seeAll: {
        color: COLORS.primary,
        fontFamily: "Nexa-Book",
        fontSize: 18,
        alignSelf: "center",
    },
    recentTransactionText: {
        fontSize: 18, width: SIZES.width * 0.4,
        fontFamily: "Nexa-Bold", // right: 100,
        color: COLORS.black, // backgroundColor:"cyan"
    },

})
