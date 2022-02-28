import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {COLORS} from "../../constants";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import {handleQuery} from "../../graphql/requests";
import {UserContext} from "../../context/UserContext";
import CheckBox from '@react-native-community/checkbox';
import moment from "moment";


const TermsCondition = ({navigation}) => {

    const user = useContext(UserContext)

    const [terms, setTerms] = useState("")
    const [fullname, setFullname] = useState("")
    const [address, setAddress] = useState("")
    const [updated, setUpdated] = useState("")
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    // const [disabled, setDisabled] = useState(false)


    useEffect(() => {

        GetTerms()
    }, [])


    const GetTerms = async () => {

        let qry = `query {
  communities(where: { id: 15 }) {
    terms_condition
    updated_at
  }
}`
        try {
            setIsLoading(true)
            const termsRes = await handleQuery(qry, user.token, false)
            // console.log(termsRes.data.communities[0].updated_at)
            await setTerms(termsRes.data.communities[0].terms_condition)
            await setUpdated(termsRes.data.communities[0].updated_at)
            await setIsLoading(false)


        } catch (e) {
            console.log(e, "GetTermsErr")
            await setIsLoading(false)

        }
    }


    const AcceptTerms = async () => {

        let mtn = `mutation {
  createUserInvestmentAgreement(
    input: {
      data: {
        address: "${address}"
        users_id: ${user.id}
        fullname: "${fullname}"
        community: 15
        agreed: ${toggleCheckBox}
      }
    }
  ) {
    userInvestmentAgreement {
      users_id {
        id
      }
    }
  }
}`

        try {
            setLoading(true)

            if (toggleCheckBox) {
                await handleQuery(mtn, user.token, false)
                navigation.navigate("BottomTabs")

            }


            await setLoading(false)


        } catch (e) {
            console.log(e, "error")
            setLoading(false)

        }
    }


    return (
        <SafeAreaView style={styles.container}>

            <ScrollView showsVerticalScrollIndicator={false}>

                <Text style={styles.header}>
                    TribeArc Cooperative Membership and Subscription Agreement
                </Text>

                <Text style={styles.dateUpdated}>Last updated on {moment(updated).format("dddd, MMMM Do YYYY")}</Text>

                <View style={{marginVertical: 20,}}>
                    <CustomTextInput
                        title={"Full Name"}
                        initialValue={fullname}
                        onChange={setFullname}
                        inputContainerStyle={{
                            borderWidth: 0.5,
                            borderColor: COLORS.primary,
                            marginBottom: 15
                        }}
                        placeholderText={"Enter full Name"}/>

                    <CustomTextInput
                        title={"Address"}
                        initialValue={address}
                        onChange={setAddress}
                        inputContainerStyle={{borderWidth: 0.5, borderColor: COLORS.primary}}
                        placeholderText={"Enter your address"}/>

                </View>

                {isLoading ? <ActivityIndicator size={"small"} color={COLORS.primary}/> :
                    <Text style={styles.body}>{terms}
                        {"\n"}
                        In witness whereof, I have hereunto agreed by checking the box below on this
                        day <Text>{moment().format("dddd, MMMM Do YYYY")}</Text>
                    </Text>}

                <View style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 5, marginVertical: 5}}>

                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        boxType={"square"}
                        onValueChange={(newValue) => {

                            setToggleCheckBox(newValue)

                        }

                        }/>

                    <Text style={{paddingHorizontal: 5, color: COLORS.black, fontFamily: "Nexa-Book"}}> I agree to the
                        terms and conditions</Text>

                </View>

                <CustomButton onPress={async () => {
                    try {
                        if (toggleCheckBox) {
                            await AcceptTerms()

                        }

                    } catch (e) {
                        console.log(e, "ERR")
                    }

                }
                } loading={loading} filled text={"Continue"}/>

                <View style={{marginVertical: 50}}/>
            </ScrollView>

        </SafeAreaView>
    );
};


export default TermsCondition;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20
    },
    header: {
        color: COLORS.primary,
        fontSize: 22,
        fontFamily: "Nexa-Bold",
        marginTop: 20,
        lineHeight: 30
    },
    dateUpdated: {
        color: COLORS.black,
        marginVertical: 10,
        fontFamily: "Nexa-Book",
        opacity: 0.7

    },
    body: {
        color: COLORS.black,
        lineHeight: 20,
        opacity: 0.9,
        fontWeight: "500",
        fontFamily: "Nexa-book"
    }


})
