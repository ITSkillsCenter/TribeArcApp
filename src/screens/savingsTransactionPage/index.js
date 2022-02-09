// @flow
import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import moment from "moment";



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


const SavingsTransactionPage = ({navigation}) => {


    const [active, setActive] = useState()




    const TopTabs = createMaterialTopTabNavigator();

    const CustomTabBar = ({children, onPress}) => {
        return (
            <View
                style={{

                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 30,
                    height: 30,

                }}
                onPress={onPress}>


                {children}

            </View>
        );


    }

    const TabOne = () => {

        return (
            <View style={styles.tabOneContainer}>
                <FlatList data={data}
                          key={item => item.index}
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

    const TabTwo = () => {

        return (
            <View style={styles.tabOneContainer}>
                <FlatList data={data2}
                          key={item => item.index}
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
                    tabBarActiveTintColor: ({focused}) => focused ? "red" : "green"
                }}

                tabBar={({navigation}) => <CustomTabBar children={
                    <>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                            navigation.navigate("TabOne")
                            setActive(true)
                        }}>
                            <Text>All</Text>

                            {active && <View
                                style={{width: 10, height: 2, backgroundColor: COLORS.primary, borderRadius: 5}}/>}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("TabTwo")}>
                            <Text>Pending</Text>
                            {/*<View style={{width: "100%", height: 2, backgroundColor: COLORS.primary, borderRadius: 5}}/>*/}

                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("TabThree")}>

                            <Text>Saved</Text>
                            {/*<View style={{width: "100%", height: 2, backgroundColor: COLORS.primary, borderRadius: 5}}/>*/}

                        </TouchableOpacity>
                    </>

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


            {TopTab()}


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


    }

})
