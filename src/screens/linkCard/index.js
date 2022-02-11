// @flow
import React, {useContext, useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import CustomInputBox from "../../components/CustomInputBox";
import ShortTextInput from "../../components/ShortTextInput";
import {UserContext} from "../../context/UserContext";
import {handleQuery} from "../../graphql/requests";
import {Modalize} from "react-native-modalize";

const LinkCard = ({navigation}) => {

    const user = useContext(UserContext)

    const modalizeRef = useRef<Modalize>(null);

    const OpenModal = () => {
        modalizeRef.current?.open();
    };

    const CloseModal = () => {
        modalizeRef.current?.close();
    };


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
            setIsLoading(true)
            let res = await handleQuery(qry, user.token, false);

        } catch (e) {
            console.log(e, "AddCardNowError")
            setIsLoading(false)

        }

    }


    const renderInner = () => (
        <View style={{
            paddingHorizontal: 20,
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
                        // console.log(value)

                    }}
                    placeholderText={"Card Number"}/>
            </View>


            <View style={{
                flexDirection: "row",
                width: SIZES.width * 0.9,
                marginVertical: 20,
                alignItems: "center",
                justifyContent: "space-between",
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
                            // console.log(value)
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
                            // console.log(value)
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


                    try {

                        if (cardNumber && expiry && pin && cvv !== "") {
                            await AddCardNow();
                            navigation.navigate("DebitCardSuccessScreen")
                        }
                    } catch (e) {
                        console.log(e, "AddCardError")
                        setIsLoading(false)

                    }


                }}/>


        </View>
    );

    const renderHeader = () => (
        <View style={{
            padding: 20,
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            width: SIZES.width,

        }}>

            <TouchableOpacity onPress={() => CloseModal()}>
                <Text style={{
                    alignSelf: "flex-end",
                    color: "black",
                    fontFamily: "Nexa-Bold",
                    fontSize: 28,
                    right: 15
                }}>x</Text>

            </TouchableOpacity>

        </View>
    );


    return (
        <View style={styles.container}>

            <Modalize
                modalHeight={SIZES.height * 0.55}
                handleStyle={{backgroundColor: 'transparent'}}
                childrenStyle={{backgroundColor: COLORS.white, borderRadius: 55,}}
                ref={modalizeRef}>
                {renderHeader()}
                {renderInner()}
            </Modalize>

            <BackButton onPress={() => navigation.pop()}/>
            <Text style={styles.linkCard}>Link a Card</Text>


            <TouchableOpacity style={styles.cardBox} activeOpacity={0.6} onPress={() => OpenModal()}>
                <Image source={icons.linkCard} style={{width: 50, height: 50}}/>
                <Text style={styles.linkCardText}>Debit Card</Text>
                <Image source={icons.arrowRight} style={{width: 20, height: 20, right: 20}} resizeMode={"contain"}/>
            </TouchableOpacity>


            <View style={styles.cancelButton}>
                <CustomButton onPress={() => navigation.pop()} filled text={"Cancel"}/>
            </View>


        </View>
    );
};

export default LinkCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20
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
        // right: 100,
        width: "70%",
        color: COLORS.black
    },
    cancelButton: {
        justifyContent: "flex-end",
        flex: 2,
    }

})
