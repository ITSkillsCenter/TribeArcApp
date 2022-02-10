// @flow
import React, {useContext, useEffect, useState} from 'react';
import {Image, Linking, StyleSheet, Text, TextInput, View} from "react-native";
import BackButton from "../../components/BackButton";
import {COLORS, icons, SIZES} from "../../constants";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import CustomButton from "../../components/CustomButton";
import {UserContext} from "../../context/UserContext";
import {handleQuery} from "../../graphql/requests";
import savings from "../savings";
import SelectDropdown from 'react-native-select-dropdown'
import axios from "axios";


const AddBvn = ({navigation}) => {

    const user = useContext(UserContext)

    const [bvn, setBvn] = useState("")
    const [acctNumber, setAcctNumber] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [savingId, setSavingId] = useState(null)
    const [banks, setBanks] = useState([])
    const [bankCode, setBankCode] = useState("")


    useEffect(() => {


        // BvnIdCheck()
        BVNTransaction()

    }, [])


    const BvnIdCheck = async () => {

        let bvnQry = `query {
                        users(where: { id: ${user.id} }) {
                        saving_account {
                        id
                                    }
                                }
                            }`


        try {

            let res = await handleQuery(bvnQry, user.token, false)
            await res.data.users[0].saving_account.id
            await setSavingId(res.data.users[0].saving_account.id)


        } catch (e) {
            console.log(e, "BvnCheckIDError")
        }

    }


    const AddBvn = async () => {
        setIsLoading(true)

        let updateBvn = `mutation {
                updateSavingAccount(
                input: { where: { id: ${savingId} }, data: { bvn: "${bvn}", bvn_status: true } }
                ) {
                    savingAccount {
                    id
                    bvn
                    bvn_status
                    user_id {
                    id
                    }
                        }
                    }
                }`

        try {

            let bvnPost = await handleQuery(updateBvn, user.token, false)
            await setIsLoading(false)
            console.log(bvnPost.data.updateSavingAccount.savingAccount, "updateBVNNNN")


        } catch (e) {
            setIsLoading(false)
            console.log(e, "AddBvnError")
        }

    }


    const BVNTransaction = async () => {
        try {
            const bankCode = await axios.get(`https://api.tribearc.com/banks/get_banks`)
            // console.log(bankCode.data.data, "CODEEEE")

            await setBanks(bankCode.data.data)

        } catch (e) {
            console.log(e, "ERRor for code")

        }

    }


    const ValidateBVN = async () => {

        try {

            let res = await axios.post(`https://api.tribearc.com/verify/bvn`, {
                bvn: `${bvn}`,
                account_number: `${acctNumber}`,
                bank_code: `${bankCode}`


            })

            console.log(res, "VALIDATERESS")


            console.log(`${bvn}`)
            console.log(`${acctNumber}`)
            console.log(`${bankCode}`)

        } catch (e) {
            console.log(e, "ValidateError")
        }


    }


    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>
            <Text style={styles.addBVN}>Add BVN</Text>

            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>


                <View style={styles.addBVNContainer}>
                    <Image source={icons.addBvn} style={styles.image}/>
                    <Text style={styles.text}>Your BVN is safe with us</Text>
                    <Text style={styles.link} onPress={() => Linking.openURL("https://tribearc.com")}>Learn more</Text>
                </View>


                <SelectDropdown
                    data={banks}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem.code, index)
                        setBankCode(selectedItem.code)

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
                    buttonTextStyle={{color: COLORS.black, fontFamily: "Nexa-Book"}}
                    buttonStyle={{
                        width: "100%",
                        backgroundColor: COLORS.white,
                        borderWidth: 0.5,
                        borderColor: COLORS.secondary,
                        borderRadius: 5,
                        height: 55
                    }}
                />


                <TextInput
                    placeholder={"Enter Account Number"}
                    value={acctNumber}
                    placeholderTextColor={"#999999"}
                    onChangeText={value => setAcctNumber(value)}
                    style={styles.textInput}
                    keyboardType={"numeric"}
                    maxLength={10}
                />

                <TextInput
                    placeholder={"Enter BVN"}
                    value={bvn}
                    placeholderTextColor={"#999999"}
                    onChangeText={value => setBvn(value)}
                    style={styles.textInput}
                    keyboardType={"numeric"}
                    maxLength={10}
                />


                <Text style={styles.dontKnow}>Don't know your BVN? <Text onPress={() => Linking.openURL("tel:*565*0#")}
                                                                         style={styles.dial}> Dial *565*0#</Text></Text>




            </KeyboardAwareScrollView>


            <View style={{flex: 2, justifyContent: "flex-end"}}>
                <CustomButton
                    onPress={async () => {
                        try {
                            // await AddBvn()
                            await ValidateBVN()
                            navigation.navigate("DashBoard")

                        } catch (e) {
                            console.log(e, "error")
                        }
                    }}
                    loading={isLoading} filled
                    text={"Validate BVN"}/>
            </View>
        </View>

    );
};

export default AddBvn


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20, height: SIZES.height, backgroundColor: COLORS.white

    }, addBVN: {
        color: COLORS.primary, fontFamily: "Nexa-Bold", fontSize: 30, marginVertical: 25
    }, addBVNContainer: {

        flexDirection: 'row',
        width: "100%",
        height: 60,
        borderWidth: 0.3,
        borderRadius: 5,
        borderColor: COLORS.secondary,
        alignItems: "center",
        paddingHorizontal: 20,
        marginVertical: 15
    },
    image: {
        width: 40, height: 40
    },
    text: {
        fontSize: 14,
        fontFamily: "Nexa-Book",
        color: COLORS.black, // backgroundColor:"cyan",
        width: '70%',
        paddingHorizontal: 10
    },
    link: {
        color: COLORS.secondary,
        fontFamily: "Nexa-Book",
        fontSize: 12
    },
    textInput: {
        borderColor: "#cbc8c8",
        borderWidth: 0.3,
        height: 55,
        borderRadius: 5,
        // marginVertical: 20,
        marginTop: 15,
        paddingHorizontal: 20,
        color: COLORS.black

    },
    dial: {
        color: COLORS.primary,
        fontFamily: "Nexa-Book",
        fontSize: 12,
    },
    dontKnow: {
        color: COLORS.black,
        fontFamily: "Nexa-Book",
        fontSize: 14,
        marginVertical: 20
    }
})
