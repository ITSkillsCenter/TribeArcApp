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
import {handleQuery} from "../../graphql/requests";
import {UserContext} from "../../context/UserContext";
import BackButton from "../../components/BackButton";
import LottieView from "lottie-react-native";


const tabs = [
    {
        key: "1",
        tabStatus: "All",
        isTab: "TabOne"
    },
    {
        key: "2",
        tabStatus: "Pending",
        isTab: "TabTwo"

    },
    {
        key: "3",
        tabStatus: "Saved",
        isTab: "TabThree"

    },
];


const SavingsAccountPage = ({navigation, route}) => {

    const savings = route.params.savings
    const autocharge = route.params.autocharge

    const user = useContext(UserContext);


    const [tabStatus, setTabStatus] = useState("All");
    const [allTrx, setAllTrx] = useState([]);
    const [pending, setPending] = useState([]);
    const [saved, setSaved] = useState([]);
    const [loading, setLoading] = useState(false);




    useEffect(() => {

        GetTransactionHistory()



    }, []);








    const GetTransactionHistory = async () => {

        let trx = `query {
  qry1: savingsTransactions(
    where: { user_id: ${user.id}, destination: "Savings Wallet" }
    sort: "created_at:desc"
    limit: 4
  ) {
    amount_paid
    created_at
    status
  }
  qry2: savingsTransactions(
    where: { user_id: ${user.id}, status: "FAILED" }
    sort: "created_at:desc"
    limit: 4
  ) {
    amount_paid
    created_at
    status
  }
}

`

        try {

            setLoading(true)

            const trxRes = await handleQuery(trx, user.token, false)

            // console.log(trxRes.data.qry1)

            await setPending(trxRes.data.qry2)
            await setSaved(trxRes.data.qry1)
            await setAllTrx(trxRes.data.qry2.concat(trxRes.data.qry1))

            setLoading(false)

        } catch (e) {
            console.log(e, "GetTransactionHistoryErr")
            setLoading(false)

        }


    }


    const TopTabs = createMaterialTopTabNavigator();

    const CustomTabBar = ({children, onPress}) => {
        return (
            <View
                style={{

                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // paddingHorizontal: 30,
                    height: 30,
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
                          scrollEnabled={false}
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
                                             style={{width: 50, height: 50}}/>

                                      <View style={{justifyContent: "space-between", height: 50}}>
                                          {item.status === "SUCCESS" ?
                                              <Text style={styles.recentTransactionText}>Card Deposit
                                                  Successful</Text> :
                                              <Text style={styles.recentTransactionText}>Card Deposit Failed</Text>}
                                          <Text style={{
                                              color: COLORS.black, fontFamily: "Nexa-Bold", fontSize: 14
                                          }}>₦ {item?.amount_paid.toLocaleString()}</Text>
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

    const TabTwo = () => {

        return (
            <View style={styles.tabOneContainer}>
                <FlatList data={pending}
                          key={item => item.index}
                          scrollEnabled={false}
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
                                             style={{width: 50, height: 50}}/>

                                      <View style={{justifyContent: "space-between", height: 50}}>
                                          {item.status === "SUCCESS" ?
                                              <Text style={styles.recentTransactionText}>Card Deposit
                                                  Successful</Text> :
                                              <Text style={styles.recentTransactionText}>Card Deposit Failed</Text>}
                                          <Text style={{
                                              color: COLORS.black, fontFamily: "Nexa-Bold", fontSize: 14
                                          }}>₦ {item?.amount_paid.toLocaleString()}</Text>
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
                <FlatList data={saved}
                          key={item => item.index}
                          scrollEnabled={false}
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
                                             style={{width: 50, height: 50}}/>

                                      <View style={{justifyContent: "space-between", height: 50}}>
                                          {item.status === "SUCCESS" ?
                                              <Text style={styles.recentTransactionText}>Card Deposit
                                                  Successful</Text> :
                                              <Text style={styles.recentTransactionText}>Card Deposit Failed</Text>}
                                          <Text style={{
                                              color: COLORS.black, fontFamily: "Nexa-Bold", fontSize: 14
                                          }}>₦ {item?.amount_paid.toLocaleString()}</Text>
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
            <BackButton onPress={() => navigation.pop()} ifSettings
                        settingPress={() => navigation.navigate("AutosaveSettingsPage")}
                        settingStyle={styles.settingsBox
                        }/>


            <Text style={styles.savings}>Savings Account</Text>
            <ImageBackground resizeMode={"contain"} source={icons.shortBalFrame} style={styles.balanceFrame}>
                <View style={{paddingHorizontal: 40,}}>
                    <View>
                        <Text style={styles.tsb}>Savings Account Balance</Text>
                        <Text style={styles.balance}>₦ {savings?.toLocaleString()}</Text>
                    </View>
                </View>
            </ImageBackground>


            <View style={styles.autosaveBox}>

                <View>
                    <Text style={styles.autosaveText}>Autocharge Amount</Text>
                    <Text style={styles.autosaveAmt}>₦ {autocharge?.toLocaleString()}</Text>
                </View>

                <View>
                    <Text style={styles.autosaveText}>Next Payment Date</Text>
                    <Text style={styles.autosaveAmt2}>2 April, 2022. Thursday</Text>
                </View>
            </View>


            <View style={styles.recentTransaction}>
                <Text style={styles.todo}>Savings Transactions</Text>

                <View style={{flexDirection: "row", justifyContent: "center", alignSelf: "center"}}>
                    <Text onPress={() => {
                        navigation.navigate("SavingsTransactionPage")
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


export default SavingsAccountPage

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
        // marginTop: 20
    },
    savings: {
        fontSize: 26,
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        // marginVertical: 10
    },
    balanceFrame: {
        borderRadius: 15, // padding: 20,
        height: 140,
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
        marginBottom: 10
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
        fontSize: 20,
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
        flexDirection: "row", justifyContent: "space-between", marginVertical: 20

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
    }, retryBox: {

        width: 80,
        height: 30,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    saved: {
        width: 80,
        height: 30,
        backgroundColor: "#05C78D",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    btnTab: {
        height: 3,
        borderRadius: 5,
    },
    btnTabActive: {
        backgroundColor: COLORS.primary,
    }, tabStatusText: {
        fontSize: 16,
        fontFamily: "Nexa-Bold",
        color: COLORS.black
    }

})
