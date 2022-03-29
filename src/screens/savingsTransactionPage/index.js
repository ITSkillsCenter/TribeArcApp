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
import NotchResponsive from "../../components/NotchResponsive";


const data = [
    {
        "amount_paid": 15000,
        "created_at": "2022-02-09T09:49:48.638Z",
        "status": "SUCCESS",
        "user_id": {
            "id": "180"
        }
    },
    {
        "amount_paid": 5000,
        "created_at": "2022-02-04T16:18:07.799Z",
        "status": "FAILED",
        "user_id": {
            "id": "180"
        }
    },
    {
        "amount_paid": 10000,
        "created_at": "2022-02-04T15:54:45.921Z",
        "status": "SUCCESS",
        "user_id": {
            "id": "180"
        }
    },
    {
        "amount_paid": 10000,
        "created_at": "2022-02-04T08:59:54.793Z",
        "status": "SUCCESS",
        "user_id": {
            "id": "180"
        }
    }
]
const data2 = [
    {
        "amount_paid": 15000,
        "created_at": "2022-02-09T09:49:48.638Z",
        "status": "FAILED",
        "user_id": {
            "id": "180"
        }
    },
    {
        "amount_paid": 5000,
        "created_at": "2022-02-04T16:18:07.799Z",
        "status": "FAILED",
        "user_id": {
            "id": "180"
        }
    },
    {
        "amount_paid": 10000,
        "created_at": "2022-02-04T15:54:45.921Z",
        "status": "FAILED",
        "user_id": {
            "id": "180"
        }
    },
    {
        "amount_paid": 10000,
        "created_at": "2022-02-04T08:59:54.793Z",
        "status": "FAILED",
        "user_id": {
            "id": "180"
        }
    }
]
const data3 = [
    {
        "amount_paid": 15000,
        "created_at": "2022-02-09T09:49:48.638Z",
        "status": "SUCCESS",
        "user_id": {
            "id": "180"
        }
    },
    {
        "amount_paid": 5000,
        "created_at": "2022-02-04T16:18:07.799Z",
        "status": "SUCCESS",
        "user_id": {
            "id": "180"
        }
    },
    {
        "amount_paid": 10000,
        "created_at": "2022-02-04T15:54:45.921Z",
        "status": "SUCCESS",
        "user_id": {
            "id": "180"
        }
    },
    {
        "amount_paid": 10000,
        "created_at": "2022-02-04T08:59:54.793Z",
        "status": "SUCCESS",
        "user_id": {
            "id": "180"
        }
    }
]

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


const SavingsTransactionPage = ({navigation}) => {

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
}

`

        try {
            setLoading(true)

            const trxRes = await handleQuery(trx, user.token, false)

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
                    height: 30,
                    marginVertical: 10,


                }}
                onPress={onPress}>


                {children}

            </View>
        );


    }

    const TabOne = () => {

        return (
            <>
                <NotchResponsive color={COLORS.white}/>
            <View style={styles.tabOneContainer}>
                <FlatList data={allTrx}
                          key={item => item.index}
                          ListEmptyComponent={
                              <View style={{alignItems: "center", justifyContent: "center",}}>

                                  <LottieView style={{width: 250, height: 250}}
                                              source={require("../../assets/images/emptyAnim.json")} autoPlay={true}/>
                                  <Text style={{color: COLORS.primary, alignSelf:"center"}}>No Transaction available</Text>

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
                                              <Text style={styles.recentTransactionText}>Deposit
                                                  Successful</Text> :
                                              <Text style={styles.recentTransactionText}>Deposit Failed</Text>}
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

                </>
        )
    }

    const TabTwo = () => {

        return (
            <View style={styles.tabOneContainer}>
                <FlatList data={pending}
                          key={item => item.index}
                          ListEmptyComponent={
                              <View style={{alignItems: "center", justifyContent: "center",}}>

                                  <LottieView style={{width: 250, height: 250}}
                                              source={require("../../assets/images/emptyAnim.json")} autoPlay={true}/>
                                  <Text style={{color: COLORS.primary, alignSelf:"center"}}>No Transaction available</Text>

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
                                              <Text style={styles.recentTransactionText}>Deposit
                                                  Successful</Text> :
                                              <Text style={styles.recentTransactionText}>Deposit Failed</Text>}
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
                <FlatList data={saved}
                          key={item => item.index}
                          ListEmptyComponent={
                              <View style={{alignItems: "center", justifyContent: "center",}}>

                                  <LottieView style={{width: 250, height: 250}}
                                              source={require("../../assets/images/emptyAnim.json")} autoPlay={true}/>

                                  <Text style={{color: COLORS.primary, alignSelf:"center"}}>No Transaction available</Text>
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
                                              <Text style={styles.recentTransactionText}>Deposit
                                                  Successful</Text> :
                                              <Text style={styles.recentTransactionText}>Deposit Failed</Text>}
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
                    tabBarActiveTintColor: ({focused}) => focused ? "red" : "green"
                }}

                tabBar={({navigation}) => <CustomTabBar children={
                    tabs.map((item, index) => (

                        <View style={{
                            width: "30%",
                            height: 40,
                            justifyContent: "center",
                            marginVertical: 5,
                            alignSelf: "center"
                        }}>
                            <TouchableOpacity style={{width: "100%", alignItems: "center", marginVertical: 5}}
                                              key={index} activeOpacity={0.8}
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
            <Text style={styles.savings}>Savings Transactions</Text>


            {loading ? <ActivityIndicator color={COLORS.primary} size={"large"}/> : TopTab()}


        </View>
    );
};

export default SavingsTransactionPage

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
