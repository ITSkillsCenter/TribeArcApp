// @flow
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import moment from "moment";
import {handleQuery} from "../../graphql/requests";
import {UserContext} from "../../context/UserContext";
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


const VoluntaryTransactionPage = ({navigation}) => {


    const user = useContext(UserContext);
    const [tabStatus, setTabStatus] = useState("All");
    const [topUps, setTopUps] = useState([]);
    const [allTrx, setAllTrx] = useState([]);
    const [loading, setLoading] = useState(false);


    const TopTabs = createMaterialTopTabNavigator();


    useEffect(() => {
        getVoluntaryTransactions()

    }, []);


    const getVoluntaryTransactions = async () => {

        let VolTrx = `query {
  qry1: savingsTransactions(
    where: { user_id: ${user.id}, destination: "Voluntary Wallet" }
    sort: "created_at:desc"
  ) {
    amount_paid
    created_at
    status
  }
  qry2: savingsTransactions(
    where: { user_id: ${user.id}, status: "FAILED" }
    sort: "created_at:desc"
  ) {
    amount_paid
    created_at
    status
  }
}`


        try {


            setLoading(true)
            const volTrxRes = await handleQuery(VolTrx, user.token, false)

            // console.log(volTrxRes.data.qry1)

            await setTopUps(volTrxRes.data.qry1)
            await setAllTrx(volTrxRes.data.qry1.concat(volTrxRes.data.qry2))


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
                    // paddingHorizontal: 30,
                    height: 30,
                    marginVertical: 10


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

                                      <View style={{
                                          justifyContent: "space-between",
                                          height: 50,
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
                                             style={{width: 50, height: 50}}/>

                                      <View style={{justifyContent: "space-between", height: 50}}>
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
                <FlatList data={data3}
                          key={item => item.index}
                          ListEmptyComponent={
                              <View style={{alignItems: "center", justifyContent: "center"}}>

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
            <Text style={styles.savings}>Transactions</Text>


            {loading ? <ActivityIndicator color={COLORS.secondary} size={"small"}/> : TopTab()}


        </View>
    );
};

export default VoluntaryTransactionPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20
    },
    savings: {
        fontSize: 26,
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        marginVertical: 10
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
