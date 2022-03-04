// @flow
import React, {useContext, useEffect, useState} from 'react';
import {Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES,} from "../../constants";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import {handleQuery} from "../../graphql/requests";
import {UserContext} from "../../context/UserContext";
import moment from "moment";
// import RNFetchBlob from "rn-fetch-blob";
// import InvestmentTermsPage from "../investmentTermsPage";


const InvestmentDetailsScreen = ({navigation, route}) => {

    const [counter, setCounter] = useState(0)
    const [loading, setLoading] = useState(false)
    const [slotBought, setSlotBought] = useState(0);

    const [modalVisible, setModalVisible] = useState(false);
    const [smallModalVisible, setSmallModalVisible] = useState(false);


    const user = useContext(UserContext);


    const investments = route.params
    console.log(investments.price_per_slot)


    useEffect(() => {
        GetSlotLeft()

    }, [])


    const GetSlotLeft = async () => {

        let slt = `query {
  usersInvestments(where: { investment: ${investments.id} }) {
    slot_bought
  }
}`

        try {
            const sltRes = await handleQuery(slt, user.token, false)
            // console.log(sltRes.data.usersInvestments)

            const newArr = sltRes.data.usersInvestments.map((item) => {
                return item.slot_bought
            })

            // console.log(newArr)

            setSlotBought(newArr.reduce((a, b) => a + b, 0))


        } catch (e) {
            console.log(e, "GetSlotLeftErr")
        }


    }


//     const HandleBooking = async () => {
//
//
//         let slotBoughtQry = `query {
//   usersInvestments(where: { users_id: ${user.id}, investment: ${investments.id} }) {
//     id
//     slot_bought
    {/*  }*/
    }
    {/*}`*/
    }


    {/*        try {*/
    }

    {/*            const slotBoughtRes = await handleQuery(slotBoughtQry, user.token, false)*/
    }


    {/*            if (slotBoughtRes.data.usersInvestments.length > 0) {*/
    }

    {/*                // console.log(slotBoughtRes.data.usersInvestments[0].id)*/
    }


    {/*                let updInv = `mutation {*/
    }
    {/*                  mtn1:  updateUsersInvestment(input: { where: { id: ${slotBoughtRes.data.usersInvestments[0].id} },*/
    }
    {/*                    data: { slot_bought: ${slotBoughtRes.data.usersInvestments[0].slot_bought + counter} } }) {*/
    }
//                     usersInvestment {
//                     slot_bought
//                     }
    {/*                    }*/
    }
//
//                   mtn2: updateInvestment(
    {/*                            input: { where: { id: ${investments.id} },*/
    }
    {/*                            data: { funds_raised: ${investments.funds_raised + counter * investments.price_per_slot} } }*/
    }
    {/*                                ) {*/
    }
//                                 investment {
//                                     id
//                                         }
//                                     }
//                                 }`
//
//                 // console.log(updInv)
//                 setLoading(true)
//
//
//                 const updInvRes = await handleQuery(updInv, user.token, false)
//                 setLoading(false)
//
//                 navigation.navigate("BottomTabs")
//
//                 // console.log(updInvRes)
//             }
//
    {/*            if (slotBoughtRes.data.usersInvestments.length < 1) {*/
    }

    {/*                // slotBoughtRes.data.usersInvestments[0].slot_bought*/
    }

    {/*                let mtn = `mutation {*/
    }
//                mtn1: createUsersInvestment(
//                     input: {
//                     data: {
//                      users_id: ${user.id}
//                         investment: ${investments.id}
    {/*                         community: 15*/
    }
//                     slot_bought: ${counter}
    {/*                 status: INVESTING*/
    }
//                     }
//                         }
//                         ) {
//                     usersInvestment {
//                  investment {
//                      name
//                         }
//                 slot_bought
//                 users_id {
//                     id
//                 }
//                 }
//                     }
//
//                      mtn2: updateInvestment(
//     input: { where: { id: ${investments.id} }, data: { funds_raised: ${investments.funds_raised + counter * investments.price_per_slot} } }
//   ) {
//     investment {
//       id
//     }
//   }
//
//                         }`
//
//
//                 // console.log(mtn)
//                 setLoading(true)
//                 const crtInv = await handleQuery(mtn, user.token, false)
//                 // console.log(crtInv)
//                 setLoading(false)
//
//                 navigation.navigate("BottomTabs")
//
//             }
//
//
//         } catch (e) {
//             console.log(e, "HandleInvestErr")
//             setLoading(false)
//
//         }
//     }


    const HandleBooking = async () => {

        let bookMtn = `mutation {
  createBookedInvestment(
    input: {
      data: {
        roi: ${investments.roi}
        users_id: ${user.id}
        investment: ${investments.id}
        unit_booked: ${counter}
        unit_amount: ${investments.price_per_slot}
        community: 15
      }
    }
  ) {
    bookedInvestment {
      id
      roi
    }
  }
}`


        try {

            setLoading(true)

            const bookMtnRes = await handleQuery(bookMtn, user.token, false)

            setLoading(false)
            navigation.navigate("BottomTabs")

        } catch (e) {
            console.log(e, "HandleBookingErr")
            setLoading(false)

        }

    }


    const InvestmentTermsPage = ({navigation}) => {


        const date = new Date()

        return (<View style={styles.container2}>
            {/*<BackButton onPress={() => navigation.pop()}/>*/}
            <Text style={styles.title}>Tribe arc Terms & Condition </Text>
            {/*<Text style={styles.updatedAt}>Last updated on {date.toJSON().slice(0, 10).replace(/-/g, '/')} </Text>*/}

            <ScrollView showsVerticalScrollIndicator={false}>
                {/*{clause.map((item, index) => (<View>*/}
                {/*    <Text style={styles.clause}>{index + 1}. Clause {index + 1}</Text>*/}
                {/*    <Text style={styles.clauseDet}>{item}</Text>*/}
                {/*</View>))}*/}

                <Text style={styles.clauseDet}>{investments.terms_condition}</Text>
                <View>
                    <CustomButton onPress={async () => {

                        await HandleBooking()
                    }}
                                  loading={loading} filled text={"Accept & Continue"}/>
                </View>

            </ScrollView>

        </View>);
    };


    // const DownloadPdf = () => {
    //
    //     const {config, fs} = RNFetchBlob;
    //     let PictureDir = fs.dirs.PictureDir;
    //     let date = new Date();
    //     let options = {
    //         fileCache: true,
    //         addAndroidDownloads: {
    //             //Related to the Android only
    //             useDownloadManager: true,
    //             notification: true,
    //             path:
    //                 PictureDir +
    //                 '/Report_Download' +
    //                 Math.floor(date.getTime() + date.getSeconds() / 2),
    //             description: 'Risk Report Download',
    //         },
    //     };
    //     config(options)
    //         .fetch('GET', "url")
    //         .then((res) => {
    //             //Showing alert after successful downloading
    //             console.log('res -> ', JSON.stringify(res));
    //             alert('Report Downloaded Successfully.');
    //         });
    //
    // }

    // const PdFDownload = () => {
    //     //Function to check the platform
    //     //If iOS the start downloading
    {/*    //If Android then ask for runtime permission*/
    }
    //     if (Platform.OS === 'ios') {
    //         DownloadPdf();
    //     } else {
    {/*        try {*/
    }
    {/*            PermissionsAndroid.request(*/
    }
    {/*                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,*/
    }
    {/*                {*/
    }
    //                     title: 'storage title',
    //                     message: 'storage_permission',
    //                 },
    //             ).then(granted => {
    //                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //                     //Once user grant the permission start downloading
    //                     console.log('Storage Permission Granted.');
    //                     DownloadPdf();
    {/*                } else {*/
    }
    //                     //If permission denied then show alert 'Storage Permission
    //                     // Not Granted'
    //                     Alert.alert('storage_permission');
    //                 }
    //             });
    //         } catch (err) {
    //             //To handle permission related issue
    //             console.log('error', err);
    //         }
    //     }
    // }


    return (
        <ScrollView style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>
            <Text style={styles.title}>{investments.name}</Text>


            <Image
                resizeMode={"cover"}
                source={{uri: investments?.image}}
                style={{width: "100%", height: SIZES.height * 0.25}}
            />

            <View style={styles.box}>
                <View style={{justifyContent: "space-between", height: 30}}>
                    <Text
                        style={{
                            fontSize: 16, fontFamily: "Nexa-Book", color: COLORS.black, marginVertical: 5
                        }}>{investments.name}</Text>
                    <Text
                        style={{fontSize: 14, fontFamily: "Nexa-Bold"}}>₦{investments?.price_per_slot.toLocaleString()}
                        <Text style={{fontSize: 12, fontFamily: "Nexa-Book", color: COLORS.black, opacity: 0.7}}> Per
                            Slot</Text></Text>
                </View>
                <TouchableOpacity

                    onPress={() => {
                        // navigation.navigate("PdfPage", investments.business_plan)
                        setSmallModalVisible(true)

                    }}
                    style={styles.pdf}>
                    <Image source={icons.pdficon} style={{width: 15, height: 20}}/>
                    <Text style={{fontSize: 16, fontFamily: 'Nexa-Bold'}}>Business Plan</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.invDet}>Investment Details</Text>

            <View style={styles.invContainer}>
                <View style={styles.invBox}>
                    <Text style={styles.invTitle}>Total Funding Required</Text>
                    <Text style={styles.invBoxDet}>₦ {investments?.funds_required.toLocaleString()} </Text>

                </View>
                <View style={styles.invBox}>
                    <Text style={styles.invTitle}>Funds Raised</Text>

                    <Text style={styles.invBoxDet}>₦ {investments?.funds_raised.toLocaleString()} </Text>


                </View>
                <View style={styles.invBox}>
                    <Text style={styles.invTitle}>Investor(s)</Text>
                    <Text style={styles.invBoxDet}>{investments?.users_investments.length}</Text>


                </View>
                <View style={styles.invBox}>
                    <Text style={styles.invTitle}>Slots Left</Text>
                    <Text
                        style={styles.invBoxDet}>{`${investments?.total_slot - slotBought}`}</Text>

                </View>
            </View>


            <View style={styles.invNowBox}>
                <View
                    style={{width: "35%", justifyContent: "space-between", alignItems: "center", flexDirection: "row"}}>
                    <TouchableOpacity
                        onPress={() => setCounter(Math.max(1, counter - 1))}
                        style={{
                            width: 25, height: 25, alignItems: "center", justifyContent: "center",
                        }}>
                        <Image source={icons.minusButton} style={{width: 70, height: 70}}/>

                    </TouchableOpacity>

                    <Text style={styles.counter}>{counter}</Text>

                    <TouchableOpacity
                        onPress={() => setCounter(counter + 1)}
                        style={{
                            width: 25, height: 25, alignItems: "center", justifyContent: "center"
                        }}>
                        <Image source={icons.addIcon} style={{width: 25, height: 25}}/>
                    </TouchableOpacity>


                </View>
                <View style={{width: "43%", justifyContent: "space-between", height: 40}}>

                    <Text style={{fontSize: 12, color: COLORS.black, opacity: 0.7, fontFamily: "Nexa-Book",}}>Time
                        left</Text>
                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black,
                        fontFamily: "Nexa-Bold",
                    }}>{moment(investments.closing_date).diff(moment(), 'days')} days left</Text>

                </View>

            </View>

            <CustomButton
                loading={loading}
                containerStyle={{marginVertical:30}}
                filled
                text={"Book Now"}
                onPress={async () => {

                    if (counter > 0) {
                        setModalVisible(true)

                    }

                    // if (counter > 0 && counter < investments?.total_slot - slotBought) {
                    //     if (investments.invBal > (counter * investments.price_per_slot)) {
                    //         await HandleInvest()
                    //     } else {
                    //         Alert.alert("Insufficient Investment Balance", "Please top-up your wallet or choose another investment")
                    //     }
                    // }
                }}
            />


            <View style={styles.smallCenteredView}>

                <View>
                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={smallModalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setSmallModalVisible(!smallModalVisible);
                        }}>
                        <Pressable onPress={() => setSmallModalVisible(!smallModalVisible)}
                                   style={styles.smallCenteredView2}>
                            <View style={styles.smallModalView}>

                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("PdfPage", investments.business_plan)
                                    setSmallModalVisible(!smallModalVisible)
                                }

                                } activeOpacity={0.7} style={styles.smallModalBox}>
                                    <Image source={icons.eyeOpen} style={styles.modalIcons}/>
                                    <Text style={styles.modalTextOpt}>View</Text>
                                </TouchableOpacity>


                                <TouchableOpacity activeOpacity={0.7} style={styles.smallModalBox}>
                                    <Image source={icons.downloadArrow} style={styles.modalIcons}/>
                                    <Text style={styles.modalTextOpt}>Download</Text>
                                </TouchableOpacity>


                            </View>
                        </Pressable>
                    </Modal>
                </View>

            </View>


            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView2}>
                        <View style={styles.modalView}>
                            {/*<Pressable*/}
                            {/*    style={[styles.button, styles.buttonClose]}*/}
                            {/*    onPress={() => setModalVisible(!modalVisible)}>*/}
                            {/*    <Text style={styles.textStyle}>Hide Modal</Text>*/}
                            {/*</Pressable>*/}
                            <Text
                                onPress={() => setModalVisible(!modalVisible)}
                                style={{
                                    fontFamily: "Nexa-Bold",
                                    marginTop: 20,
                                    alignSelf: "flex-end",
                                    marginRight: 30,
                                    fontSize: SIZES.width * 0.05
                                }}>X</Text>
                            <InvestmentTermsPage/>
                        </View>


                    </View>
                </Modal>
            </View>


        </ScrollView>);
};


export default InvestmentDetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 20
    }, title: {
        color: COLORS.primary, fontFamily: "Nexa-Bold", fontSize: 26, marginVertical: 20
    }, box: {
        marginVertical: 20, flexDirection: "row", justifyContent: "space-between"

    }, pdf: {
        height: 40,
        width: "45%",
        flexDirection: "row",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "white",
        shadowColor: "#000000",
        elevation: 2,
        shadowRadius: 0.7,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0, height: 0
        }
    }, invDet: {
        color: COLORS.black, fontSize: 26, marginVertical: 10, fontFamily: "Nexa-Bold"
    }, invContainer: {
        flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between",
    }, invBox: {
        marginVertical: 10,
        height: 70,
        width: "45%",
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "#D7D7D7",
        padding: 15,
        justifyContent: "space-between"
    }, invTitle: {
        fontSize: 12, fontFamily: "nexa-Book", opacity: 0.6
    }, invBoxDet: {
        fontFamily: "Nexa-Bold", fontSize: 18,

    }, invNowBox: {
        // flex: 2,
        flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center", marginTop: 30
    }, counter: {
        fontSize: SIZES.width * 0.05,
        fontFamily: "Nexa-Bold",
        backgroundColor: COLORS.white,
        justifyContent: "center",
        elevation: 2,
        borderRadius: 10,
        padding: 10,
        shadowRadius: 0.7,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0, height: 0
        }
    }, centeredView: {
        // flex: 1,
        marginTop: 20, justifyContent: "center", alignItems: "center"

    }, centeredView2: {
        marginTop: 20, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(61,59,59,0.37)"
    }, smallCenteredView: {
        flex: 1, marginTop: 20, justifyContent: "center", // alignItems: "center",
        // backgroundColor: "cyan"

    }, smallCenteredView2: {
        flex: 1, marginTop: 20, justifyContent: "center", // alignItems: "center",
        backgroundColor: "rgba(61,59,59,0.37)"

    }, modalView: {
        margin: 10,
        width: "90%",
        height: "90%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5, // alignItems: "center",
        shadowColor: "rgba(0,0,0,0.48)",
        shadowOffset: {
            width: 0, height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }, smallModalView: {
        margin: 20,
        width: "40%",
        height: "15%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignSelf: "flex-end",
        justifyContent: "space-evenly", // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0, height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // top: 20
    }, button: {
        borderRadius: 20, padding: 10, elevation: 2
    }, buttonOpen: {
        backgroundColor: "#F194FF",
    }, buttonClose: {
        backgroundColor: "#2196F3",
    }, textStyle: {
        color: "white", fontWeight: "bold", textAlign: "center"
    }, modalText: {
        marginBottom: 15, textAlign: "center"
    }, container2: {
        flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 20
    }, title2: {
        color: COLORS.primary, fontFamily: "Nexa-Bold", fontSize: 24, marginVertical: 20
    }, updatedAt: {
        fontSize: 14, fontFamily: "Nexa-Bold", color: COLORS.black, opacity: 0.6, marginBottom: 10

    }, clause: {
        fontSize: SIZES.width * 0.05, fontFamily: "Nexa-Book", color: COLORS.black, // marginVertical:15,
        marginTop: 25, marginBottom: 10
    }, clauseDet: {
        color: COLORS.black, fontFamily: "Nexa-Book", lineHeight: 20
    }, dots: {
        color: COLORS.primary, fontWeight: "Bold", fontSize: 100, height: 20,
    }, smallModalBox: {
        flexDirection: "row", marginVertical: 15, // width: "80%",
        // backgroundColor: "cyan",
        alignItems: "center", // justifyContent: "space-between",
        // margin:5

    }, modalIcons: {
        width: 25, height: 25
    }, modalTextOpt: {
        fontSize: 16, fontFamily: "Nexa-Bold", color: COLORS.black, paddingLeft: 10

    },


})
