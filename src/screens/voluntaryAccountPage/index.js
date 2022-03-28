// @flow
import React, {useContext, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import moment from "moment";
import BackButton from "../../components/BackButton";
import {UserContext} from "../../context/UserContext";
import {handleQuery} from "../../graphql/requests";
import LottieView from "lottie-react-native";


const data3 = []

const tabs = [
    {
        key: "1",
        tabStatus: "All",
        isTab: "TabOne"
    },
    {
        key: "2",
        tabStatus: "Top-Ups",
        isTab: "TabTwo"

    },
    {
        key: "3",
        tabStatus: "Withdrawal",
        isTab: "TabThree"

    },
];


const VoluntaryAccountPage = ({navigation, route}) => {


    const user = useContext(UserContext);


    const [tabStatus, setTabStatus] = useState("All");

    const [topUps, setTopUps] = useState([]);
    const [allTrx, setAllTrx] = useState([]);
    const [withdrawalTRx, setWithdrawalTRx] = useState([]);
    const [loading, setLoading] = useState(false);


    const voluntary_bal = route.params


    const TopTabs = createMaterialTopTabNavigator();


    useEffect(() => {
        getVoluntaryTransactions()

    }, []);


    const getVoluntaryTransactions = async () => {

        let VolTrx = `query {
  qry1: savingsTransactions(
    where: { user_id: ${user.id}, destination: "Voluntary Wallet" }
    sort: "created_at:desc"
    limit: 5
  ) {
    amount_paid
    created_at
    status
  }
  qry2: savingsTransactions(
    where: { user_id: ${user.id}, status: "FAILED" }
    sort: "created_at:desc"
    limit: 5
  ) {
    amount_paid
    created_at
    status
  }
  qry3: withdrawalRequests(
    where: { users_id: ${user.id} }
    sort: "created_at:desc"
    limit: 5
  ) {
    id
    status
    amount
    created_at
  }
  
}`


        try {

            // console.log(VolTrx)


            setLoading(true)
            const volTrxRes = await handleQuery(VolTrx, user.token, false)

            // console.log(volTrxRes.data.qry3)

            await setTopUps(volTrxRes.data.qry1)
            await setAllTrx(volTrxRes.data.qry1.concat(volTrxRes.data.qry2))
            await setWithdrawalTRx(volTrxRes.data.qry3)


            setLoading(false)


        } catch (e) {
            console.log(e, "getVoluntaryTransactionsErr")
            setLoading(false)

        }


    }


    const CustomTabBar = ({children, onPress}) => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 40,
                    marginBottom: 10
                }}
                onPress={onPress}>
                {children}
            </View>
        );


    }

    const TabOne = () => {

        return (
            <View style={styles.tabOneContainer}>
                <FlatList data={allTrx}
                          key={item => item.index}
                          showsVerticalScrollIndicator={false}
                          ListEmptyComponent={
                              <View style={{alignItems: "center", justifyContent: "center",}}>

                                  <LottieView style={{width: 250, height: 250}}
                                              source={require("../../assets/images/emptyAnim.json")} autoPlay={true}/>
                              </View>
                          }
                          renderItem={({item, index}) => (
                              <View>
                                  <TouchableOpacity style={styles.cardBox} activeOpacity={0.8}
                                                    onPress={() => {
                                                    }}>
                                      <Image source={item.status === "SUCCESS" ? icons.tranSucc : icons.transFailed}
                                             style={{width: SIZES.width * 0.13, height: SIZES.width * 0.13}}/>

                                      <View style={{
                                          justifyContent: "space-between",
                                          height: SIZES.width * 0.13,
                                          paddingLeft: 10,
                                          width: "55%"
                                      }}>

                                          <Text style={styles.recentTransactionText}>Voluntary Saving</Text>

                                          <Text style={{
                                              opacity: 0.8,
                                              fontSize: 12,
                                              color: COLORS.black, fontFamily: "Nexa-Book"
                                          }}>{moment(item?.created_at).format("D MMM, YYYY.  dddd")}</Text>

                                      </View>


                                      <View style={{alignItems: 'flex-end', height: 50, width: "25%"}}>


                                          <Text style={{
                                              color: COLORS.black, fontFamily: "Nexa-Bold", fontSize: 16
                                          }}>₦{item?.amount_paid.toLocaleString()}</Text>
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

                          )}/>
            </View>
        )
    }

    const TabTwo = () => {

        return (
            <View style={styles.tabOneContainer}>
                <FlatList data={topUps}
                          showsVerticalScrollIndicator={false}
                          key={item => item.index}
                          ListEmptyComponent={
                              <View style={{alignItems: "center", justifyContent: "center",}}>

                                  <LottieView style={{width: 250, height: 250}}
                                              source={require("../../assets/images/emptyAnim.json")} autoPlay={true}/>
                              </View>
                          }
                          renderItem={({item, index}) => (
                              <View>
                                  <TouchableOpacity style={styles.cardBox} activeOpacity={0.8}
                                                    onPress={() => {
                                                    }}>
                                      <Image source={item.status === "SUCCESS" ? icons.tranSucc : icons.transFailed}
                                             style={{width: SIZES.width * 0.13, height: SIZES.width * 0.13}}/>

                                      <View style={{justifyContent: "space-between", height: SIZES.width * 0.13}}>
                                          {item.status === "SUCCESS" ?
                                              <Text style={styles.recentTransactionText}>Card Deposit
                                                  Successful</Text> :
                                              <Text style={styles.recentTransactionText}>Card Deposit Failed</Text>}
                                          <Text style={{
                                              color: COLORS.black, fontFamily: "Nexa-Bold", fontSize: 14
                                          }}>₦{item?.amount_paid.toLocaleString()}</Text>
                                      </View>

                                      <View style={{alignItems: 'center', justifyContent: "space-between", height: 50}}>

                                          {item.status === "SUCCESS" ? <View style={styles.saved}>
                                                  <Text style={{
                                                      color: COLORS.white,
                                                      fontSize: 11,
                                                      fontFamily: "Nexa-Bold"
                                                  }}>Saved</Text>
                                              </View>
                                              : <View style={styles.retryBox}>
                                                  <Text style={{
                                                      color: COLORS.white,
                                                      fontSize: 11,
                                                      fontFamily: "Nexa-Bold"
                                                  }}>Try
                                                      Again</Text>
                                              </View>
                                          }

                                          <Text style={{
                                              fontSize: 12,
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

                          )}/>
            </View>

        )
    }

    const TabThree = () => {

        return (
            <View style={styles.tabOneContainer}>
                <FlatList data={withdrawalTRx}
                          key={item => item.index}
                          showsVerticalScrollIndicator={false}
                          ListEmptyComponent={
                              <View style={{alignItems: "center", justifyContent: "center",}}>

                                  <LottieView style={{width: 250, height: 250}}
                                              source={require("../../assets/images/emptyAnim.json")} autoPlay={true}/>
                              </View>
                          }
                          renderItem={({item, index}) => (
                              <View>
                                  <TouchableOpacity style={styles.cardBox} activeOpacity={0.8}
                                                    onPress={() => {
                                                    }}>
                                      <Image source={item.status === "DECLINED" ? icons.transFailed : icons.tranSucc}
                                             style={{width: SIZES.width * 0.13, height: SIZES.width * 0.13}}/>

                                      <View style={{justifyContent: "space-between", height: SIZES.width * 0.13}}>


                                          {item.status === "APPROVED" ? <Text style={styles.recentTransactionText}>Withdrawal
                                              Successful</Text> : item.status === "PENDING" ?
                                              <Text style={styles.recentTransactionText}>Withdrawal pending</Text> :
                                              <Text style={styles.recentTransactionText}>Withdrawal Failed</Text>}


                                          <Text style={{
                                              color: COLORS.black, fontFamily: "Nexa-Bold", fontSize: 14
                                          }}>₦{item?.amount?.toLocaleString()}</Text>
                                      </View>

                                      <View style={{alignItems: 'center', justifyContent: "space-between", height: 50}}>

                                          {item.status === "APPROVED" ?
                                              <View style={styles.approved}>
                                                  <Text style={{
                                                      color: COLORS.white,
                                                      fontSize: 11,
                                                      fontFamily: "Nexa-Bold"
                                                  }}>Approved</Text>
                                              </View>
                                              : item.status === "DECLINED" ? <View style={styles.declined}>
                                                      <Text style={{
                                                          color: COLORS.white,
                                                          fontSize: 11,
                                                          fontFamily: "Nexa-Bold"
                                                      }}>Declined</Text>
                                                  </View> :
                                                  <View style={styles.pendingBox}>
                                                      <Text style={{
                                                          color: COLORS.white,
                                                          fontSize: 11,
                                                          fontFamily: "Nexa-Bold"
                                                      }}>Pending</Text>
                                                  </View>
                                          }

                                          <Text style={{
                                              fontSize: 12,
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

                          )}/>
            </View>

        )
    }


    function TopTab() {
        return (
            <TopTabs.Navigator
                screenOptions={{
                    tabBarActiveTintColor: ({focused}) => focused ? "red" : "green",
                    swipeEnabled: false


                }}

                tabBar={({navigation}) => <CustomTabBar children={
                    tabs.map((item, index) => (

                        <View key={index} style={{
                            width: "30%",
                            height: 40,
                            justifyContent: "center",
                            marginVertical: 5,
                            alignSelf: "center"
                        }}>
                            <TouchableOpacity style={{width: "100%", alignItems: "center", marginVertical: 5}}
                                              activeOpacity={0.8}
                                              onPress={() => {
                                                  navigation.navigate(item.isTab)
                                                  setTabStatus(item.tabStatus)
                                              }}>
                                <Text style={styles.tabStatusText}>{item.tabStatus}</Text>

                            </TouchableOpacity>
                            <View style={[styles.btnTab, tabStatus === item.tabStatus && styles.btnTabActive]}/>
                        </View>


                    ))

                }/>}
            >
                <TopTabs.Screen
                    name={"TabOne"}
                    component={TabOne}
                    options={{}}
                />
                <TopTabs.Screen
                    name={"TabTwo"}
                    component={TabTwo}
                    options={{tabBarLabel: "Pending"}}
                />

                <TopTabs.Screen
                    name={"TabThree"}
                    component={TabThree}
                    options={{tabBarLabel: "Saved"}}
                />
            </TopTabs.Navigator>
        );
    }


    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>


            <Text style={styles.savings}>Voluntary Account</Text>
            <ImageBackground resizeMode={"contain"} source={icons.shortBalFrame} style={styles.balanceFrame}>
                <View style={{paddingHorizontal: 20,}}>
                    <View>
                        <Text style={styles.tsb}>Voluntary Account Balance</Text>
                        <Text style={styles.balance}>₦ {voluntary_bal?.toLocaleString()}</Text>
                    </View>
                </View>
            </ImageBackground>


            <View style={styles.autosaveBox}>

                <TouchableOpacity
                    onPress={() => navigation.navigate("TopUpScreen")}
                    activeOpacity={0.7}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "30%"
                    }}>
                    <Image style={{width: 40, height: 40}} source={icons.topUpicon}/>
                    <Text style={{fontSize: 14, color: COLORS.primary, fontFamily: "Nexa-Book"}}>Top Up</Text>


                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("WithdrawalScreen")}

                    activeOpacity={0.7}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "35%"
                    }}>

                    <Image style={{width: 40, height: 40}} source={icons.withdraw}/>
                    <Text style={{fontSize: 14, color: COLORS.primary, fontFamily: "Nexa-Book"}}>Withdraw</Text>


                </TouchableOpacity>
            </View>


            <View style={styles.recentTransaction}>
                <Text style={styles.todo}>Transactions</Text>

                <View style={{flexDirection: "row", justifyContent: "center", alignSelf: "center"}}>
                    <Text onPress={() => {
                        navigation.navigate("VoluntaryTransactionPage")
                    }} style={styles.seeAll}>See
                        all</Text>
                    <Image resizeMode={"contain"}
                           style={{width: 15, height: 15, alignSelf: "center", bottom: 2}}
                           source={icons.arrowRight}/>
                </View>
            </View>

            {loading ? <ActivityIndicator color={COLORS.secondary} size={"small"}/> : TopTab()}


        </View>
    );
};


export default VoluntaryAccountPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20
    },
    settingsBox: {
        width: 30,
        height: 30,
        alignSelf: "flex-end",
        marginTop: 20
    },
    savings: {
        fontSize: SIZES.width * 0.06,
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        // marginVertical: 10
    },
    balanceFrame: {
        borderRadius: 15, // padding: 20,
        height: SIZES.height * 0.2,
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
        marginVertical: 20

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
        fontSize: 18,
        color: COLORS.white,
        fontFamily: "Nexa-Bold",
        marginVertical: 10
    },
    balance: {
        color: COLORS.white,
        fontFamily: "Nexa-Bold",
        fontSize: 24
    },
    autosaveBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 5,
        // elevation:0.2,
        // shadowOpacity:0.3,
        // shadowColor:"#000",
        // shadowOffset:{
        //     width:0,
        //     height:0
        // }
    },
    autosaveText: {
        color: COLORS.primary,
        fontSize: 16,
        // marginBottom: 10,
        fontFamily: "Nexa-Book"

    },
    autosaveAmt: {
        color: COLORS.black,
        fontFamily: "Nexa-Bold",
        fontSize: SIZES.width * 0.05,
        marginTop: 10


    },
    autosaveAmt2: {
        color: COLORS.black,
        fontFamily: "Nexa-Book",
        fontSize: 12,
        alignSelf: "flex-end",
        marginTop: 15
    },
    recentTransaction: {
        flexDirection: "row", justifyContent: "space-between",
        marginVertical: 10

    }, seeAll: {
        color: COLORS.primary, fontFamily: "Nexa-Book", fontSize: 18, alignSelf: "center"
    },
    recentTransactionText: {
        fontSize: 14,
        width: SIZES.width * 0.4,
        fontFamily: "Nexa-Book", // right: 100,
        color: COLORS.black, // backgroundColor:"cyan"
    },
    todo: {
        color: COLORS.black, fontFamily: "Nexa-Bold", fontSize: 18
    },
    tabOneContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        // paddingTop: 20
    },
    cardBox: {
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
    declined: {
        width: 80,
        height: 30,
        backgroundColor: "#ff6969",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    pendingBox: {
        width: 80,
        height: 30,
        backgroundColor: "#ffd069",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    approved: {
        width: 80,
        height: 30,
        backgroundColor: "#05C78D",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5

    },
    btnTab: {
        height: 3,
        // marginHorizontal: 5,
        // marginRight: 10,
        // marginVertical: 5,
        // borderWidth: 0.25,
        // alignItems: "center",
        // borderColor: COLORS.grey,
        borderRadius: 5,
        // justifyContent: "center",

    },
    btnTabActive: {
        backgroundColor: COLORS.primary,
        // borderColor: COLORS.primary,
    }, tabStatusText: {
        fontSize: 16,
        fontFamily: "Nexa-Bold",
        color: COLORS.black
    }

})
