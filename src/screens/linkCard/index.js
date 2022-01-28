// @flow
import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";


import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import CustomInputBox from "../../components/CustomInputBox";
import ShortTextInput from "../../components/ShortTextInput";
import {UserContext} from "../../context/UserContext";
import {handleQuery} from "../../graphql/requests";

const LinkCard = ({navigation}) => {

    const user = useContext(UserContext)

    // console.log(user)

    const bs = React.createRef();
    const fall = new Animated.Value(1);

    const [isLoading, setIsLoading] = useState(false)
    const [cardNumber, setCardNumber] = useState("")
    const [expiry, setExpiry] = useState("")
    const [cvv, setCvv] = useState("")
    const [pin, setPin] = useState("")


    const AddCardNow = async () => {

        const qry = `mutation {
             createCard(
                    input: {
                        data: {
                         CardNumber: ${cardNumber}
                          Cvv: ${cvv}
                          pin: ${pin}
                          expiry: "${expiry}"
                          user: ${user.id}
                                }}
                                   ) {
                                    card {
                                         CardNumber
                                             Cvv
                                              pin
                                              expiry
                                      }
                                    }
                                  }`

        try {

            let res = await handleQuery(qry, user.token, false);


        } catch (e) {
            console.log(e, "AddCardNowError")
            setIsLoading(false)


        }

    }


    const renderInner = () => (
        <View style={{
            backgroundColor: "#fff",
            paddingHorizontal: 20,
            height: 510,
        }}>
            <View style={{marginHorizontal: 5}}>
                <Text style={{fontSize: 20, color: COLORS.black, fontFamily: "Nexa-Bold"}}>Add Card</Text>
                <Text style={{fontSize: 14, color: "#999999", fontFamily: "Nexa-Book", marginVertical: 10}}>Fill the
                    card
                    details below to be able to save</Text>
            </View>
            <View>
                <CustomInputBox
                    props={{
                        keyboardType: "numeric",
                        maxLength: 16
                    }}
                    initialValue={cardNumber}
                    onChange={value => {
                        setCardNumber(value);
                        console.log(value)

                    }}
                    placeholderText={"Card Number"}/>
            </View>


            <View style={{
                flexDirection: "row",
                // justifyContent: "space-between",
                width: SIZES.width * 0.9,
                marginVertical: 20,
                alignItems: "center",
                // backgroundColor: "red"
            }}>


                <View style={{width: 130, height: 60}}>
                    <ShortTextInput
                        props={{
                            keyboardType: "numeric",
                            maxLength: 4
                        }}
                        mask={"99/99"}
                        initialValue={expiry}
                        onChange={value => {
                            setExpiry(value);
                            console.log(value)
                        }}
                        placeholderText={"Expiry"}
                        label={"Expiry date"}

                    />


                </View>
                <View style={{width: 130, height: 60}}>

                    <ShortTextInput
                        props={{
                            keyboardType: "numeric",
                            maxLength: 3
                        }}
                        mask={"999"}
                        initialValue={cvv}
                        onChange={value => {
                            setCvv(value);
                            console.log(value)
                        }}
                        placeholderText={"Cvv"} shown label={"CVV"}/>
                </View>
                <View style={{width: 130, height: 60}}>
                    <ShortTextInput
                        props={{
                            keyboardType: "numeric",
                            maxLength: 4
                        }}
                        mask={"9999"}
                        initialValue={pin}
                        onChange={value => {
                            setPin(value);
                            console.log(value)

                        }}
                        placeholderText={"Pin"} shown label={"Card Pin"}/>
                </View>

            </View>
            <CustomButton
                loading={isLoading}
                filled text={"Add Card now"}
                onPress={async () => {
                    setIsLoading(true)
                    await AddCardNow();
                    navigation.navigate("DebitCardSuccessScreen")
                }}/>


        </View>
    );

    const renderHeader = () => (
        <View style={{
            padding: 20,
            // backgroundColor: "#f3f0f0",
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            width: SIZES.width,
            shadowColor: '#333333',
            shadowOffset: {width: -1, height: -3},
            shadowRadius: 2,
            shadowOpacity: 0.4,
            elevation: 0.3,
        }}>

            <TouchableOpacity onPress={() => bs.current.snapTo(1)}>
                <Text style={{
                    alignSelf: "flex-end",
                    color: "black",
                    fontFamily: "Nexa-Bold",
                    fontSize: 20,
                    right: 15
                }}>X</Text>

            </TouchableOpacity>

        </View>
    );


    return (
        <View style={styles.container}>

            <BottomSheet
                ref={bs}
                snapPoints={[500, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
                // enabledBottomInitialAnimation={true}
            />


            <Animated.View style={{
                // margin: 20,
                paddingHorizontal: 20,
                // paddingVertical: 20,
                height: SIZES.height*0.9,
                opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
                // backgroundColor: Animated.add("#fff", Animated.multiply(bc, "#000"))
            }}>

                <BackButton onPress={() => navigation.pop()}/>

                <View>
                    <Text style={styles.linkCard}>Link a Card</Text>
                </View>

                <TouchableOpacity style={styles.cardBox} activeOpacity={0.6} onPress={() => bs.current.snapTo(0)}>
                    <Image source={icons.linkCard} style={{width: 50, height: 50}}/>
                    <Text style={styles.linkCardText}>Debit Card</Text>
                    <Image source={icons.arrowRight} style={{width: 20, height: 20, right: 20}} resizeMode={"contain"}/>
                </TouchableOpacity>

                <View style={styles.cancelButton}>
                    <CustomButton onPress={() => navigation.pop()} filled text={"Cancel"}/>
                </View>

            </Animated.View>


        </View>
    );
};

export default LinkCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // paddingHorizontal: 20,

    },
    linkCard: {
        fontFamily: "Nexa-Bold",
        fontSize: 28,
        color: COLORS.primary,
        marginVertical: 10,
        marginHorizontal: 5
    },
    cardBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 30,
        paddingHorizontal: 5
    },
    linkCardText: {
        fontSize: 16,
        fontFamily: "Nexa-Bold",
        right: 100,
        color: COLORS.black
    },
    cancelButton: {
        justifyContent: "flex-end",
        flex: 2,
        // paddingHorizontal: 20,

        // backgroundColor:'cyan',
        // height:300
    }

})
