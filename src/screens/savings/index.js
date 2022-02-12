// @flow
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import CustomInputBox from "../../components/CustomInputBox";
import ShortTextInput from "../../components/ShortTextInput";
import {handleQuery} from "../../graphql/requests";
import {UserContext} from "../../context/UserContext";
import {Modalize} from "react-native-modalize";
import DatePicker from "react-native-datepicker";


const savings = [
    {"key": "1", "amount": "5,000"},
    {"key": "2", "amount": "10,000"},
    {"key": "3", "amount": "15,000"},
    {"key": "4", "amount": "20,000"},
    {"key": "5", "amount": "50,000"},
    {"key": "6", "amount": "100,000"},
]

const Savings = ({navigation, route}) => {
    const user = useContext(UserContext)


    const modalizeRef1 = useRef<Modalize>(null);
    const modalizeRef2 = useRef<Modalize>(null);


    const [date, setDate] = useState("");
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        // setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    const OpenModal1 = () => {
        modalizeRef1.current?.open();
    };
    const OpenModal2 = () => {
        modalizeRef2.current?.open();
    };

    const CloseModal1 = () => {
        modalizeRef1.current?.close();
    };
    const CloseModal2 = () => {
        modalizeRef2.current?.close();
    };


    const [amountToSave, setAmountToSave] = useState("")
    const [tabStatus, setTabStatus] = useState(null)
    const [amount, setAmount] = useState("")
    const [saving, setSaving] = useState(0)
    const [cardNum, setCardNum] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [expiry, setExpiry] = useState("")
    const [cvv, setCvv] = useState("")
    const [pin, setPin] = useState("")

    useEffect(() => {

        // CheckCard();

    }, [])


    const setTabStatusFilter = (tabStatus) => {
        setTabStatus(tabStatus);
        if (amount === "5,000") {
            setAmount("5,000");
        }
        if (amount === "10,000") {
            setAmount("10,000");
        }
        if (amount === "15,000") {
            setAmount("15,000");
        }
        if (amount === "20,000") {
            setAmount("20,000");
        }
        if (amount === "50,000") {
            setAmount("50,000");
        }
    };


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

    const AddMoney = async () => {


        const num = (amountToSave).replace(",", "")

        const qry = `mutation {
                        updateUser(input: { where: { id: ${user.id}}, data: { saving: ${saving + parseInt(num)}}}) {
                            user {
                                 saving
                                  }
                                 }
                          }`

        try {
            // console.log(qry, "SAVDDD")
            let res = await handleQuery(qry, user.token, false);

        } catch (e) {
            console.log(e, "Error")
            setIsLoading(false)
        }
    }


    const renderInner2 = () => (
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
                    initialValue={cardNumber}
                    onChange={value => {
                        setCardNumber(value);
                        console.log(value)
                    }}
                    props={{
                        keyboardType: "numeric",
                        maxLength: 16
                    }}
                    placeholderText={"Card Number"}/>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 30}}>
                <View style={{width: 130, height: 60}}>
                    <ShortTextInput
                        mask={"99/99"}
                        initialValue={expiry}
                        onChange={value => {
                            setExpiry(value);
                            console.log(value)
                        }}
                        placeholderText={"Expiry"}

                        label={"Expiry date"}/>

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
                        initialValue={pin}
                        onChange={value => {
                            setPin(value);
                            console.log(value)

                        }}
                        placeholderText={"Pin"}
                        mask={"9999"}
                        shown label={"Card Pin"}/>
                </View>

            </View>
            <CustomButton
                filled
                text={"Add Card now"}
                onPress={async () => {
                    if (amountToSave !== "") {
                        if (cardNumber && cvv && expiry && pin !== "") {
                            await AddCardNow()
                        }
                        await AddMoney()
                        navigation.navigate("SuccessScreen", {amountToSave})
                    }
                }}
            />

        </View>
    );

    const renderInner = () => (
        <View style={{
            backgroundColor: "#fff",
            paddingHorizontal: 20,
        }}>

            <View style={{marginHorizontal: 5}}>
                <Text style={{fontSize: 20, color: COLORS.black, fontFamily: "Nexa-Bold"}}>Select Payment Method</Text>
                <Text style={{fontSize: 14, color: "#999999", fontFamily: "Nexa-Book", marginVertical: 10}}>Tap the
                    button below to add a Card</Text>
            </View>

            <TouchableOpacity style={styles.cardBox} activeOpacity={0.8} onPress={() => {
                CloseModal1()
                OpenModal2()
            }}>
                <Image source={icons.linkCard} style={{width: 50, height: 50}}/>
                <Text style={styles.linkCardText}>Add a Card</Text>
                <Image source={icons.arrowRight} style={{width: 20, height: 20,}} resizeMode={"contain"}/>
            </TouchableOpacity>


        </View>
    );

    const renderHeader2 = () => (
        <View style={{
            padding: 20,
            // backgroundColor: "#fff",
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            width: SIZES.width,

        }}>


            <TouchableOpacity onPress={() => CloseModal2()}>
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


    const renderHeader = () => (
        <View style={{
            padding: 20,
            // backgroundColor: "#fff",
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            width: SIZES.width,

        }}>

            <TouchableOpacity onPress={() => CloseModal1()}>
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


    const CheckCard = async () => {

        const qry = `query users {
  users(where:{id:${user.id}}){
    id
    saving
    card{
      id
      CardNumber
      pin
      expiry
      Cvv
    }
  }
}`

        try {

            let res = await handleQuery(qry, user.token, false);
            // console.log(res.data.users[0].saving, "MAXXA");
            setSaving(res.data.users[0].saving)
            setCardNum(res.data.users[0].card.CardNumber)


        } catch (e) {
            console.log(e, "Error")
            setIsLoading(false)

        }

    }


    return (
        <View style={styles.container}>


            <Modalize
                modalHeight={SIZES.height * 0.4}
                handleStyle={{backgroundColor: 'transparent'}}
                childrenStyle={{backgroundColor: COLORS.white, borderRadius: 55,}}
                ref={modalizeRef1}>
                {renderHeader()}
                {renderInner()}
            </Modalize>

            <Modalize
                modalHeight={SIZES.height * 0.6}
                handleStyle={{backgroundColor: 'transparent'}}
                childrenStyle={{backgroundColor: COLORS.white, borderRadius: 55,}}
                ref={modalizeRef2}>
                {renderHeader2()}
                {renderInner2()}
            </Modalize>


            <View style={{
                flex: 1,
                paddingHorizontal: 20,
                height: SIZES.height * 0.9,
            }}>

                <BackButton onPress={() => navigation.pop()}/>

                <View>
                    <Text style={styles.savings}>Savings</Text>
                    <Text style={styles.savingsText}>Fill the information and get started with Tribearc Savings.</Text>
                    <Text style={styles.startQuery}>How much would you like to start with?</Text>
                    <Text style={styles.upgradeText}>You can always upgrade this amount later.</Text>
                </View>

                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={"#999999"}
                        placeholder={"Enter your monthly Savings Amount"}
                        value={amountToSave}
                        keyboardType={"numeric"}
                        onChangeText={(value) => {
                            setAmountToSave(value);
                            setTabStatus(null)
                        }}
                    />
                </View>

                <View style={{height: "20%"}}>
                    <View horizontal showsHorizontalScrollIndicator={false}
                          contentContainerStyle={{justifyContent: "space-between",}} style={styles.amountBox}>
                        {savings.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.7}
                                style={[styles.amountContainer, tabStatus === item.amount && styles.btnTabActive]}
                                onPress={() => {
                                    setTabStatusFilter(item.amount);
                                    setAmountToSave(item.amount)
                                }}>
                                <Text style={[styles.amount, tabStatus === item.amount && styles.textTabActive]}>
                                    ₦{item.amount}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>


                </View>


                <DatePicker
                    style={styles.datePickerStyle}
                    date={date}
                    mode="date"
                    placeholder="Enter your the amount of monthly savings"
                    format="DD/MM/YYYY"
                    minDate="01-01-2022"
                    maxDate="01-01-2030"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    iconSource={icons.dateImg}
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            right: -2,
                            top: 4,
                            marginLeft: 0,
                        },
                        dateInput: {
                            borderColor: "#C4C4C4",
                            alignItems: "flex-start",
                            borderWidth: 0.5,
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            height: 50
                        },
                        placeholderText: {
                            fontSize: 17,
                            color: "gray"
                        },
                        dateText: {
                            fontSize: 17,
                        }
                    }}
                    onDateChange={(date) => {
                        setDate(date);
                        // console.log(date)
                    }}
                />


                <View style={styles.saveButton}>


                    <Text> {route.params}</Text>
                    <CustomButton
                        loading={isLoading}
                        filled={amountToSave !== ""}
                        text={"Save Now"}
                        onPress={async () => {

                            // if (amountToSave !== "") {
                            //     await navigation.navigate("PaymentWebPage", amountToSave)
                            // }

                            navigation.navigate("SavingsAccountPage")


                        }}/>
                </View>
            </View>

        </View>
    );
};

export default Savings


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    savings: {
        fontSize: 30,
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        marginVertical: 10
    },
    savingsText: {
        fontSize: 14,
        fontFamily: "Nexa-Book",
        color: COLORS.black
    },
    startQuery: {
        fontSize: 20,
        color: COLORS.black,
        fontFamily: "Nexa-Bold",
        marginTop: 20

    },
    upgradeText: {
        fontSize: 14,
        fontFamily: "Nexa-Book",
        color: "#999999",
        marginVertical: 10
    },
    textInput: {
        borderRadius: 5,
        borderColor: "#C4C4C4",
        borderWidth: 0.5,
        fontFamily: "Nexa-Book",
        height: 50,
        paddingHorizontal: 20,
        color: COLORS.black
    },
    inputBox: {
        marginVertical: 30
    },
    amountBox: {
        flexDirection: 'row',
        flexWrap: "wrap",
        // justifyContent: "space-between",
        // backgroundColor: 'cyan',
        // width:SIZES.width*0.9,
        height: 50,


    },
    amount: {
        fontFamily: "Nexa-Book",
        fontSize: 16,
        color: COLORS.secondary,
        marginVertical: 10,
        alignSelf: "center"
    },
    amountContainer: {
        backgroundColor: '#f5f5fa',
        paddingHorizontal: 10,
        borderRadius: 15,
        marginRight: 10,
        // elevation: 0.3,
        alignSelf: "center",
        width: "30%",
        marginBottom: 10


    },
    saveButton: {
        justifyContent: "flex-end",
        flex: 2,
        // alignSelf: "auto",
        // paddingHorizontal: 20,

        // backgroundColor: 'cyan',
        // height:100
    },
    cardBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 20,
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
        borderColor: "#F4F4FF"
        // backgroundColor:'cyan'


    },
    linkCardText: {
        fontSize: 16,
        fontFamily: "Nexa-Bold",
        right: 80,
        color: COLORS.black
    },
    btnTabActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    textTabActive: {
        color: COLORS.white

    },
    datePicker: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#C4C4C4",
        height: 50,
        paddingHorizontal: 20,
        width: "100%",
        position: "absolute"
    },
    datePickerStyle: {
        width: "100%"

    }
})
