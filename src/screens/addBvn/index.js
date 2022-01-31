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


const AddBvn = ({navigation}) => {

    const user = useContext(UserContext)

    const [bvn, setBvn] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [savingId, setSavingId] = useState(null)


    useEffect(() => {


        BvnIdCheck()

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

                <TextInput
                    placeholder={"Enter BVN"}
                    value={bvn}
                    onChangeText={value => setBvn(value)}
                    style={styles.textInput}
                    keyboardType={"numeric"}
                    maxLength={10}
                />


                <Text style={styles.dontKnow}>Don't know your BVN? <Text onPress={() => Linking.openURL("tel:*565*0#")}
                                                                         style={styles.dial}> Dial *565*0#</Text></Text>

                <View style={{flex: 2, height: SIZES.height * 0.6, justifyContent: "flex-end"}}>
                    <CustomButton onPress={async () => {

                        try {
                            await AddBvn()
                            navigation.navigate("DashBoard")

                        } catch (e) {
                            console.log(e, "error")
                        }

                    }


                    } loading={isLoading} filled
                                  text={"Validate BVN"}/>
                </View>


            </KeyboardAwareScrollView>
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
        marginVertical: 20,
        paddingHorizontal: 20
    },
    dial: {
        color: COLORS.primary,
        fontFamily: "Nexa-Book",
        fontSize: 12,
    },
    dontKnow: {
        color: COLORS.black,
        fontFamily: "Nexa-Book",
        fontSize: 14
    }
})
