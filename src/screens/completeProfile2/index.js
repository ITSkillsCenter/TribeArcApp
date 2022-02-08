// @flow
import React, {useContext, useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons} from "../../constants";
import BackButton from "../../components/BackButton";
import {launchImageLibrary} from "react-native-image-picker";
import CustomInputBox from "../../components/CustomInputBox";
import CustomButton from "../../components/CustomButton";
import {BASE_URL} from "../../config";
import {handleQuery} from "../../graphql/requests";
import {UserContext} from "../../context/UserContext";

const CompleteProfile2 = ({navigation}) => {

    const user = useContext(UserContext)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    const UpdateUserData = async () => {
        let qry = `mutation {
            updateUser(
            input: {
            where: { id: ${user.id} }
            data: {
             firstname: "${firstName}",
             lastname: "${lastName}",
             phone_number:"${phoneNumber}"
             
              }
             }
                ) {
                user {
                firstname
                lastname
                email
                      }
                    }
                }`
        try {

            // console.log(qry)

            setIsLoading(true)

            let res = await handleQuery(qry, user.token, false)
            // console.log(res.data.updateUser.user)
            await setIsLoading(false)


        } catch (e) {
            console.log(e, "GetUserDataError")
        }
    }


    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>

            <View style={styles.box}>
                <Image style={{height: 80, width: 80, right: 15}} source={icons.circular1}/>
                <View style={styles.box2}>
                    <Text style={styles.text1}>Complete your Profile</Text>
                    <Text style={styles.text2}>please complete the fields below</Text>
                </View>
            </View>

            <Text style={styles.perInfo}>Work info</Text>


            <CustomInputBox
                initialValue={firstName}
                onChange={value => setFirstName(value)}
                placeholderText={"Enter First Name"}
            />

            <CustomInputBox
                initialValue={lastName}
                onChange={value => setLastName(value)}
                placeholderText={"Enter Last Name"}
            />
            <CustomInputBox
                initialValue={phoneNumber}
                onChange={value => setPhoneNumber(value)}
                placeholderText={"Enter Phone Name"}
            />

            <View style={styles.saveButton}>
                <CustomButton
                    loading={isLoading}
                    filled={firstName !== "" && lastName !== "" && phoneNumber !== ""}
                    text={"Submit"}
                    onPress={async () => {

                        await navigation.navigate("ProfileCompletedSuccessScreen")


                    }}/>
            </View>

        </View>
    );
};


export default CompleteProfile2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20

    },
    box: {
        flexDirection: "row",
        height: 80,
        marginVertical: 20
        // backgroundColor: "red"

    },
    box2: {
        paddingVertical: 20,
        justifyContent: "space-between"
    },
    text1: {
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        fontSize: 18
    },
    text2: {
        color: COLORS.black,
        fontFamily: "Nexa-Bold",
        fontSize: 14,
        opacity: 0.7
    },
    perInfo: {
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        fontSize: 18,
        marginVertical: 20

    },
    saveButton: {
        justifyContent: "flex-end",
        flex: 2,

    },


})
