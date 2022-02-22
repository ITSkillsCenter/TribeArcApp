// @flow
import React, {useContext, useState} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import {handleQuery} from "../../graphql/requests";
import {UserContext} from "../../context/UserContext";
import CustomTextInput from "../../components/CustomTextInput";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";


const CompleteProfile2 = ({navigation}) => {

    const user = useContext(UserContext)

    const [profession, setProfession] = useState("")
    const [designation, setDesignation] = useState("")
    const [remuneration, setRemuneration] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    const UpdateUserData = async () => {
        let qry = `mutation {
            updateUser(
            input: {
            where: { id: ${user.id} }
            data: {
             profession: "${profession}"
             designation: "${designation}"
            remuneration: "${remuneration}"
             
              }
             }
                ) {
                user {
                profession
                designation
                remuneration
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
                <Image style={{height: SIZES.width*0.2, width: SIZES.width*0.2, right: 15}} source={icons.circular2}/>
                <View style={styles.box2}>
                    <Text style={styles.text1}>Complete your Profile</Text>
                    <Text style={styles.text2}>please complete the fields below</Text>
                </View>
            </View>

            <Text style={styles.perInfo}>Work Info</Text>


            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>

                <CustomTextInput
                    initialValue={profession}
                    onChange={value => setProfession(value)}
                    placeholderText={"Enter Profession"}
                    title={"Profession"}
                />

                <CustomTextInput
                    initialValue={designation}
                    onChange={value => setDesignation(value)}
                    placeholderText={"Enter Designation"}
                    title={"Designation"}
                />
                <CustomTextInput
                    initialValue={remuneration}
                    onChange={value => setRemuneration(value)}
                    placeholderText={"Enter Remuneration"}
                    title={"Remuneration"}
                    props={{
                        keyboardType:"numeric"
                }}
                />

            </KeyboardAwareScrollView>


            <View style={styles.saveButton}>
                <CustomButton
                    loading={isLoading}
                    filled={profession !== "" && designation !== "" && remuneration !== ""}
                    text={"Submit"}
                    onPress={async () => {
                        try {
                            await UpdateUserData()
                            await navigation.navigate("ProfileCompletedSuccessScreen")

                        } catch (e) {
                            console.log(e, "UpdateUserError2")
                        }



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
        paddingHorizontal: SIZES.width*0.04,

    },
    box: {
        flexDirection: "row",
        height: SIZES.width*0.2,
        // marginVertical: 20
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
        marginVertical: SIZES.width*0.03,

    },
    saveButton: {
        justifyContent: "flex-end",
        // flex: 2,

    },


})
