// @flow
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import CustomTextInput from "../../components/CustomTextInput";
import SelectDropdown from "react-native-select-dropdown";
import CustomButton from "../../components/CustomButton";
import axios from "axios";
import {UserContext} from "../../context/UserContext";
import {BASE_URL} from "../../config";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {handleQuery} from "../../graphql/requests";


const AddAccountDetailsScreen = ({navigation}) => {

    const user = useContext(UserContext)


    const [banks, setBanks] = useState([])
    const [bankCode, setBankCode] = useState("")
    const [acctNumber, setAcctNumber] = useState("")
    const [fullName, setFullName] = useState("")
    const [bankName, setBankName] = useState("")
    const [isLoading, setIsLoading] = useState("")


    useEffect(() => {


        BVNTransaction()

    }, [])

    const BVNTransaction = async () => {
        try {
            const bankCode = await axios.get(`https://api.tribearc.com/banks/get_banks`)
            // console.log(bankCode.data.data, "CODEEEE")

            await setBanks(bankCode.data.data)

        } catch (e) {
            console.log(e, "ERRor for code")

        }

    }


    const ValidateAcctNum = async () => {

        setIsLoading(true)


        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }

        await axios.post(`${BASE_URL}/verify/bank_details`, {
            account_number: acctNumber,
            bank_code: bankCode
        }, {headers: headers}).then(async (response) => {

            console.log(response.data.data.account_name)
            await setFullName(response.data.data.account_name)
            // setBankName(response.data.data.account_number)


            setIsLoading(false)
            // navigation.navigate("BottomTabs")

        }).catch((err) => {
            console.log(err, "Err")
            setIsLoading(false)

        })

    }


    const SaveAcct = async () => {

        let save = `mutation {
  createBankAccount(
    input: {
      data: {
        users_id: ${user.id}
        bank_code: "${bankCode}"
        account_name: "${fullName}"
        account_number: "${acctNumber}"
        bank_name:"${bankName}"
      }
    }
  ) {
    bankAccount {
      id
    }
  }
}

`

        try {

            setIsLoading(true)

            const saveRes = await handleQuery(save, user.token, false)
            console.log(saveRes)

            setIsLoading(false)


        } catch (e) {
            console.log(e, "SaveAcctErr")
            setIsLoading(false)

        }

    }


    return (

        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>


                <Text style={styles.withdraw}>Account Details</Text>

                <View style={{marginTop: 30}}>

                    <Text style={styles.title}>Bank Name</Text>

                    <SelectDropdown
                        data={banks}
                        onSelect={async (selectedItem, index) => {
                            console.log(selectedItem.name, index)
                            await setBankCode(selectedItem.code)
                            await setBankName(selectedItem.name)

                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem.name
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item.name
                        }}
                        rowStyle={{width: "100%"}}
                        dropdownStyle={{width: "90%"}}
                        defaultButtonText={"Select Bank"}
                        buttonTextStyle={{
                            color: COLORS.black,
                            fontSize: 12,
                            opacity: 0.6,
                            fontFamily: "Nexa-Book",
                            justifyContent: "flex-start"
                        }}
                        buttonStyle={{
                            width: "100%",
                            backgroundColor: "#f5f5ff",
                            borderRadius: 5,
                        }}
                    />
                    <CustomTextInput

                        onBlur={async () => await ValidateAcctNum()}
                        initialValue={acctNumber} onChange={setAcctNumber}
                        placeholderText={"Enter Bank Account Number"} title={"Bank Account Number"}/>


                    {

                        isLoading ? <ActivityIndicator style={{alignSelf: "flex-start"}} size={"small"}
                                                       color={COLORS.primary}/> : null

                    }

                    <CustomTextInput props={{

                        editable: false
                    }} initialValue={fullName} onChange={setFullName} placeholderText={"Full Name"}
                                     title={"Account Name"}/>

                </View>


            </KeyboardAwareScrollView>

            <View style={{justifyContent: "flex-end", flex: 2}}>
                <CustomButton
                    onPress={async () => {
                        // await ValidateAcctNum()

                        // navigation.navigate("AccountDetailsSavedSuccess")
                    }} filled text={"Save"}/>

            </View>


        </View>

    );
};

export default AddAccountDetailsScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20
    },
    withdraw: {
        fontSize: 26,
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        marginVertical: 20
    },
    withdrawDesc: {
        fontSize: 16,
        fontFamily: "Nexa-Book",
        color: COLORS.black
    },
    title: {
        color: COLORS.primary,
        fontSize: 14,
        marginBottom: 5,
        opacity: 0.6,
        fontFamily: "Nexa-Book"

    },
    modalAutoCharge: {
        fontSize: 20,
        fontFamily: "Nexa-Bold",
        color: COLORS.black,
        marginVertical: 10
    },
    modalAutoChargeDesc: {
        fontSize: 14,
        fontFamily: "Nexa-Book",
        color: COLORS.black,
        marginVertical: 10,
        opacity: 0.6,
        lineHeight: 24

    }, addAcctBox: {
        flexDirection: "row",
        alignItems: "center",
        height: 80,
        backgroundColor: "#FAFAFF",
        borderRadius: 15,
        padding: 20,
        marginVertical: 5
        // justifyContent:"space-between"
    },
    addAcct: {
        color: COLORS.black,
        opacity: 0.6,
        fontFamily: "Nexa-Book",
        paddingHorizontal: 20
    },
    addAcctBox2: {
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


