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
import {handleQuery} from "../../graphql/requests";
import {UserContext} from "../../context/UserContext";


const InvestmentMainScreen = ({navigation}) => {


    const user = useContext(UserContext)


    const [investments, setInvestments] = useState([])
    const [myInvestments, setMyInvestments] = useState([])
    const [slotBought, setSlotBought] = useState("")
    const [loading, setLoading] = useState(false)


    useEffect(() => {

        GetInvestments()

    }, [])


    const GetInvestments = async () => {


        let qry = `query {
  qry2: usersInvestments(where: { users_id: ${user.id}, community: 15 }) {
    slot_bought
    investment {
      name
      image
      roi
      funds_raised
      funds_required
      business_plan
      price_per_slot
      total_slot
      status
      duration_in_months
      users_id {
        id
      }
    }
  }

  qry1: investments {
    name
    image
    roi
    funds_raised
    funds_required
    business_plan
    price_per_slot
    total_slot
    status
    duration_in_months
    users_id {
      id
    }
  }
}`


        try {

            setLoading(true)
            const getAllInvRes = await handleQuery(qry, user.token, false)

            await setInvestments(getAllInvRes.data.qry1)

            const allMyInv = getAllInvRes.data.qry2.map((item) => {
                return item.investment
            })
            await setMyInvestments(allMyInv)

            await setSlotBought(getAllInvRes.data.qry2[0].slot_bought)

            setLoading(false)


        } catch (e) {

            setLoading(false)
            console.log(e, "GetAllInvErr")
        }
    }


    return (
        <View style={styles.container}>
            {/*<BackButton onPress={() => navigation.pop()}/>*/}
            <Text style={styles.inv}>My Investment</Text>


            {
                loading ? <ActivityIndicator size={"large"} color={COLORS.primary}/> :


                    <FlatList
                data={investments}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={

                    <>
                        <ImageBackground source={icons.shortBalFrame} style={styles.balanceFrame}>
                            <View style={{
                                paddingHorizontal: 40,
                            }}>
                                <View>
                                    <Text style={styles.tsb}>Investment Balance</Text>
                                    <Text style={styles.balance}>₦ 20,000,000 {}</Text>
                                </View>

                            </View>
                        </ImageBackground>

                        {
                            <>
                                {myInvestments.length > 0 && <Text style={styles.allInv}>My Investments</Text>}

                                <FlatList
                                    data={myInvestments}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({item}) => (

                                        loading ? <ActivityIndicator size={"large"} color={COLORS.primary}/> :
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate("MyInvestmentDetailsScreen", {
                                                    ...item,
                                                    slotBought
                                                })}
                                                activeOpacity={0.8} style={styles.box}>
                                                <Image source={{uri: item.image}}
                                                       style={{width: 110, height: 120, borderRadius: 10,}}/>
                                                <View style={{width: 180, paddingHorizontal: 5,}}>
                                                    <Text style={styles.title}>{item.name}</Text>
                                                    <Text style={styles.duration}><Text
                                                        style={{color: COLORS.primary}}>{item.roi}%</Text> return
                                                        in {item?.duration} months</Text>
                                                    <View style={{
                                                        flexDirection: "row",
                                                        width: 150,
                                                        justifyContent: "space-between",
                                                        alignItems: 'center',
                                                    }}>
                                                        <View>
                                                            <Text
                                                                style={styles.amtInv}>₦{item.price_per_slot.toLocaleString()}</Text>
                                                            <Text style={styles.perSlot}>Per Slot</Text>
                                                        </View>

                                                        <View style={{alignItems: "center"}}>
                                                            <Text style={styles.amtInv}>{item.users_id.length}</Text>
                                                            <Text style={styles.perSlot}>Investors</Text>
                                                        </View>


                                                    </View>
                                                </View>
                                                <View>
                                                    {item.status === "ACTIVE" ?
                                                        <View style={styles.status1}>
                                                            <Text style={styles.active}>Active</Text>

                                                        </View>
                                                        :
                                                        <View style={styles.status2}>

                                                            <Text style={styles.ended}>Ended</Text>

                                                        </View>
                                                    }


                                                </View>

                                            </TouchableOpacity>

                                    )


                                    }/>


                            </>
                        }


                        <Text style={styles.allInv}>All Investments</Text>
                    </>
                }
                renderItem={({item}) => (


                    <TouchableOpacity onPress={() => navigation.navigate("InvestmentDetailsScreen", {...item})}
                                      activeOpacity={0.8} style={styles.box}>
                        <Image source={{uri: item.image}} style={{width: 110, height: 120, borderRadius: 10,}}/>
                        <View style={{width: 180, paddingHorizontal: 5,}}>
                            <Text style={styles.title}>{item.name}</Text>
                            <Text style={styles.duration}><Text
                                style={{color: COLORS.primary}}>{item.roi}%</Text> return
                                in {item.duration_in_months} months</Text>
                            <View style={{
                                flexDirection: "row",
                                width: 150,
                                justifyContent: "space-between",
                                alignItems: 'center',
                            }}>
                                <View>
                                    <Text style={styles.amtInv}>₦{item.price_per_slot.toLocaleString()}</Text>
                                    <Text style={styles.perSlot}>Per Slot</Text>
                                </View>
                                <View style={{alignItems: "center"}}>
                                    <Text style={styles.amtInv}>{item.users_id.length}</Text>
                                    <Text style={styles.perSlot}>Investors</Text>
                                </View>


                            </View>
                        </View>
                        <View>
                            {item.status === "ACTIVE" ?
                                <View style={styles.status1}>
                                    <Text style={styles.active}>Active</Text>
                                </View>
                                :
                                <View style={styles.status2}>
                                    <Text style={styles.ended}>Ended</Text>
                                </View>
                            }
                        </View>
                    </TouchableOpacity>


                )}/>}

            <View style={{marginBottom: "20%", backgroundColor: "transparent"}}/>


        </View>
    );
};

export default InvestmentMainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20
    },
    inv: {
        color: COLORS.primary,
        fontSize: 24,
        marginVertical: 10,
        fontFamily: "Nexa-Bold"
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
        marginVertical: 20
    },
    balance: {
        color: COLORS.white,
        fontFamily: "Nexa-Bold",
        fontSize: 24
    },
    allInv: {
        color: COLORS.black,
        fontSize: 18,
        fontFamily: "Nexa-Bold",
        marginVertical: 10
    },
    box: {
        marginVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between"

    },
    status1: {
        backgroundColor: "#85FCA647",
        height: 25,
        width: 75,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    status2: {
        backgroundColor: "#FFB16947",
        height: 25,
        width: 75,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"

    },
    active: {
        color: "#00711F",
        fontSize: 12,
        fontFamily: "Nexa-Bold"
    },
    ended: {
        color: "#EB996E",
        fontSize: 12,
        fontFamily: "Nexa-Bold"
    },
    title: {
        fontSize: 20,
        fontFamily: "Nexa-Book",
        lineHeight: 24,
        color: COLORS.black
    },
    duration: {
        color: COLORS.black,
        fontFamily: "Nexa-Book",
        marginVertical: 10
    },
    perSlot: {
        color: COLORS.black,
        fontFamily: "Nexa-Book",
        fontSize: 12,
        opacity: 0.6

    },
    amtInv: {
        color: COLORS.black,
        fontFamily: "Nexa-Bold",
        fontSize: 16


    }

})
