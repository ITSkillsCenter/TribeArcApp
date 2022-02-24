// @flow
import React, {useContext, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import CustomTextInput from "../../components/CustomTextInput";
import SelectDropdown from "react-native-select-dropdown";
import CustomButton from "../../components/CustomButton";
import {Modalize} from "react-native-modalize";
import {UserContext} from "../../context/UserContext";
import {handleQuery} from "../../graphql/requests";

const WithdrawalScreen = ({navigation}) => {

    const user = useContext(UserContext)

    const [myAccts, setMyAccts] = useState([])
    const [accountBalance, setAccountBalance] = useState(0)
    const [withdrawalAmount, setWithdrawalAmount] = useState("")
    const [otpLoading, setOtpLoading] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const [otpCode, setOtpCode] = useState("")


    const modalizeRef = useRef<Modalize>(null);


    useEffect(() => {
        GetWithdrawalAccts()

    }, [])


    const GetWithdrawalAccts = async () => {

        let qry = `query {
  qry1: bankAccounts(where: { users_id: ${user.id} }) {
    bank_name
    account_name
    account_number
  }

  qry2: users(where: { id: ${user.id} }) {
    saving_account{
      voluntary_funds
    }
  }
}`

        try {

            const qryRes = await handleQuery(qry, user.token, false)
            // console.log(qryRes.data.qry2[0].saving_account.voluntary_funds)
            await setMyAccts(qryRes.data.qry1)
            await setAccountBalance(qryRes.data.qry2[0].saving_account.voluntary_funds)


        } catch (e) {
            console.log(e, "GetWithdrawalAccts Error")
        }

    }


    const SendWithdrawalOtp = async () => {


        try {

            await setOtpLoading(true)

            setTimeout(async () => {
                await console.log("OTP sent")
                await setOtpSent(true)
                await setOtpLoading(false)

            }, 5000)


        } catch (e) {
            console.log(e, "SendWithdrawalOtp Err")
            setOtpLoading(true)

        }

    }


    const SubmitWithdrawal = async () => {


        try {


        } catch (e) {
            console.log(e, "SubmitWithdrawal Err")
            setOtpLoading(true)

        }

    }


    const OpenModal = () => {
        modalizeRef.current?.open();
    };

    const CloseModal = () => {
        modalizeRef.current?.close();
    };


    const renderInner = () => (<View style={{
        backgroundColor: "#fff", paddingHorizontal: 20,
    }}>
        <Text style={styles.modalAutoCharge}>Withdrawal destination</Text>


        <View style={styles.addAcctBox}>
            <Image style={{width: 30, height: 30}} source={icons.plusIconWhite}/>
            <Text style={styles.addAcct}>Add New Account</Text>
        </View>

        <View style={styles.addAcctBox2}>

            <View style={{justifyContent: "space-between", height: 50}}>
                <Text style={{color: COLORS.black, fontSize: 18, fontFamily: "Nexa-Bold"}}>Andron James</Text>

                <View style={{flexDirection: "row", width: "70%", justifyContent: "space-between"}}>
                    <Text style={{color: COLORS.black, fontSize: 14, fontFamily: "Nexa-Book"}}>Access Bank</Text>
                    <Text style={{color: COLORS.black, fontSize: 14, fontFamily: "Nexa-Book"}}>089675435</Text>

                </View>

            </View>

            <Image source={icons.smallCheck} style={{width: 30, height: 30}}/>


        </View>


        <CustomButton onPress={() => {
            // navigation.navigate("WithdrawalSuccessScreen")
        }} filled text={"Submit"}/>


    </View>);

    const renderHeader = () => (<View style={{
        padding: 20, // backgroundColor: "#fff",
        borderTopRightRadius: 25, borderTopLeftRadius: 25, width: SIZES.width,

    }}>

        <TouchableOpacity onPress={() => CloseModal()}>
            <Text style={{
                alignSelf: "flex-end", color: "black", fontFamily: "Nexa-Book", fontSize: 28, right: 15
            }}>x</Text>

        </TouchableOpacity>

    </View>);


    return (<View style={styles.container}>
        <BackButton onPress={() => navigation.pop()}/>


        <Modalize
            modalHeight={SIZES.height * 0.5}
            handleStyle={{backgroundColor: 'transparent'}}
            childrenStyle={{backgroundColor: COLORS.white, borderRadius: 55,}}
            ref={modalizeRef}>
            {renderHeader()}
            {renderInner()}
        </Modalize>


        <Text style={styles.withdraw}>Withdrawal</Text>
        <Text style={styles.withdrawDesc}>Withdrawal from Voluntary Account</Text>

        <View style={{marginTop: 30}}>


            <CustomTextInput
                initialValue={withdrawalAmount}
                onChange={setWithdrawalAmount}
                placeholderText={"e.g 20,000"}
                props={{
                    keyboardType: "numeric"
                }}
                title={"Amount to withdraw"}/>


            {withdrawalAmount > accountBalance &&
                <Text style={{color: "red", fontFamily: "Nexa-Book", marginBottom: 10}}>Insufficient funds</Text>}


            <Text style={styles.title}>Withdrawal Destination</Text>

            <SelectDropdown
                data={myAccts}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)

                    if (withdrawalAmount !== "") {
                        SendWithdrawalOtp()
                    }
                    // setBankCode(selectedItem.code)

                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem.bank_name + "     " + selectedItem.account_number
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item.bank_name + "     " + item.account_number
                }}
                rowStyle={{width: "100%"}}
                dropdownStyle={{width: "90%"}}
                defaultButtonText={"Select Account"}
                buttonTextStyle={{
                    color: COLORS.black,
                    fontSize: 16,
                    opacity: 0.6,
                    fontFamily: "Nexa-Book",
                    // justifyContent: "flex-start",
                    textAlign: "left"
                }}
                buttonStyle={{
                    width: "100%", backgroundColor: "#f5f5ff", borderRadius: 5,
                }}
            />

            {otpLoading && <ActivityIndicator style={{alignSelf: "flex-start"}} size={"small"} color={COLORS.primary}/>}
            {otpSent && <Text
                style={{
                    color: "green",
                    fontFamily: "Nexa-Book",
                    textAlign: "left",
                    marginBottom: 10,
                    marginTop: 5
                }}> Withdrawal OTP
                sent successfully</Text>}

            <CustomTextInput
                initialValue={otpCode}
                onChange={setOtpCode}
                placeholderText={"Enter OTP"}
                title={"Withdrawal OTP code"}
                props={{
                    keyboardType: "numeric"
                }}

            />
        </View>

        <View style={{flex: 2, justifyContent: "flex-end"}}>
            <CustomButton onPress={() => {
            }} filled={withdrawalAmount !== "" && otpCode !== ""} text={"Submit"}/>

        </View>


    </View>);
};

export default WithdrawalScreen

const styles = StyleSheet.create({

    container: {
        flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 20
    }, withdraw: {
        fontSize: 26, color: COLORS.primary, fontFamily: "Nexa-Bold", marginVertical: 20
    }, withdrawDesc: {
        fontSize: 16, fontFamily: "Nexa-Book", color: COLORS.black
    }, title: {
        color: COLORS.primary, fontSize: 14, marginBottom: 5, opacity: 0.6, fontFamily: "Nexa-Book"

    }, modalAutoCharge: {
        fontSize: SIZES.width * 0.05, fontFamily: "Nexa-Bold", color: COLORS.black, marginVertical: 10
    }, modalAutoChargeDesc: {
        fontSize: 14, fontFamily: "Nexa-Book", color: COLORS.black, marginVertical: 10, opacity: 0.6, lineHeight: 24

    }, addAcctBox: {
        flexDirection: "row",
        alignItems: "center",
        height: 80,
        backgroundColor: "#FAFAFF",
        borderRadius: 15,
        padding: 20,
        marginVertical: 5
        // justifyContent:"space-between"
    }, addAcct: {
        color: COLORS.black, opacity: 0.6, fontFamily: "Nexa-Book", paddingHorizontal: 20
    }, addAcctBox2: {
        flexDirection: "row",
        alignItems: "center",
        height: 80,
        backgroundColor: "#FAFAFF",
        borderRadius: 15,
        padding: 20,
        marginVertical: 5,
        justifyContent: "space-between"

    }

})


