// @flow
import React, {useState} from 'react';
import {FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
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


const SavingsAccountPage = ({navigation}) => {


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
                <FlatList data={data} renderItem={({item, index}) => (
                    <View key={index}>
                        <TouchableOpacity style={styles.cardBox} activeOpacity={0.8}
                                          onPress={() => {
                                          }}>
                            <Image source={item.status === "SUCCESS" ? icons.tranSucc : icons.transFailed}
                                   style={{width: 50, height: 50}}/>

                            <View style={{justifyContent: "space-between", height: 50}}>
                                {item.status === "SUCCESS" ?
                                    <Text style={styles.recentTransactionText}>Card Deposit Successful</Text> :
                                    <Text style={styles.recentTransactionText}>Card Deposit Failed</Text>}
                                <Text style={{
                                    color: COLORS.black, fontFamily: "Nexa-Bold", fontSize: 14
                                }}>₦{item?.amount_paid.toLocaleString()}</Text>
                            </View>

                            <View style={{alignItems: 'center', justifyContent: "space-between", height: 50}}>

                                { item.status==="SUCCESS"?<View style={styles.retryBox}>
                                    <Text style={{color: COLORS.white, fontSize: 11, fontFamily: "Nexa-Bold"}}>Try
                                        Again</Text>
                                </View>:

                                    <View style={styles.saved}>
                                    <Text style={{color: COLORS.white, fontSize:11, fontFamily:"Nexa-Bold"}}>Saved</Text>
                                    </View>}

                                <Text style={{
                                    fontSize:12,
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
            <View>
                <Text>
                    Tab 2
                </Text>
            </View>
        )
    }

    const TabThree = () => {

        return (
            <View>
                <Text>
                    Tab 3
                </Text>
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
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("TabOne")}>
                            <Text>All</Text>

                            {/*<View style={{width: 10, height: 2, backgroundColor: COLORS.primary, borderRadius: 5}}/>*/}
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
            <TouchableOpacity activeOpacity={0.8} style={styles.settingsBox}>
                <Image source={icons.settingsIcon} style={{width: 30, height: 30}}/>
            </TouchableOpacity>


            <Text style={styles.savings}>Savings Account</Text>
            <ImageBackground source={icons.shortBalFrame} style={styles.balanceFrame}>
                <View style={{paddingHorizontal: 40,}}>
                    <View>
                        <Text style={styles.tsb}>Savings Account Balance</Text>
                        <Text style={styles.balance}>₦ 20,000,000 {}</Text>
                    </View>
                </View>
            </ImageBackground>


            <View style={styles.autosaveBox}>

                <View>
                    <Text style={styles.autosaveText}>Autosave Amount</Text>
                    <Text style={styles.autosaveAmt}>₦ 10,000</Text>
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
                    }} style={styles.seeAll}>See
                        all</Text>
                    <Image resizeMode={"contain"}
                           style={{width: 15, height: 15, alignSelf: "center", bottom: 2}}
                           source={icons.arrowRight}/>
                </View>
            </View>

            {TopTab()}


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
        marginTop: 20
    },
    savings: {
        fontSize: 30,
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        marginVertical: 10
    },
    balanceFrame: {
        borderRadius: 15, // padding: 20,
        height: 200,
        width: SIZES.width,
        alignSelf: "center",
        justifyContent: "center", // alignItems: 'center'
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
        marginBottom: 30
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
        flexDirection: "row", justifyContent: "space-between", marginVertical: 30

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
    saved:{
        width: 80,
        height: 30,
        backgroundColor:"#67e28a",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5


    }
})
