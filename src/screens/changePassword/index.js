// @flow
import React, {useContext, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Image, Text, Linking, TextInput, ActivityIndicator} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import BackButton from "../../components/BackButton";
import {COLORS, icons, SIZES} from "../../constants";
import CustomButton from "../../components/CustomButton";
import {UserContext} from "../../context/UserContext";
import {handleQuery} from "../../graphql/requests";
import axios from "axios";
import {BASE_URL} from "../../config";
import NotchResponsive from "../../components/NotchResponsive";


const ChangePassword = ({navigation}) => {

    const user = useContext(UserContext)


    // const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState("")
    const [editable, setEditable] = useState(false)
    const [passwordErr, setPasswordErr] = useState("")
    const [passwordLoading, setPasswordLoading] = useState(false)
    const [success, setSuccess] = useState(false)


    const ConfirmOldPassword = async () => {


        try {
            setPasswordLoading(true)

            const {data} = await axios.post(`${BASE_URL}/auth/local`, {
                identifier: user.email,
                password: oldPassword,
            });
            // console.log(data)

            if (data) {
                await setSuccess(true)
                await setEditable(true)
            }
            await setPasswordLoading(false)


        } catch (e) {
            console.log(e.response.data.data[0].messages[0].message, "")
            {
                e.response.data.data[0].messages[0].message === "Identifier or password invalid." ? setPasswordErr("Invalid password") : setPasswordErr("An Error Occurred")
            }
            await setPasswordLoading(false)

        }

    }


    const UpdatePassword = async () => {

        await setIsLoading(true)


        const qry = `mutation {
                    updateUser(input: { where: { id: ${user.id} }, data: { password: "${confirmPassword}" } }) {
                         user {
                               id
                     }
                         }
                        }`


        try {
            let res = await handleQuery(qry, user.token, false);
            await setIsLoading(false)

        } catch (e) {

            setIsLoading(false)
            console.log(e, "UpdatePassword error")

        }

    }


    return (

        <>
            <NotchResponsive color={COLORS.white}/>
            <View style={styles.container}>

                <BackButton onPress={() => navigation.pop()}/>
                <Text style={styles.changePassword}>Change Password</Text>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>

                    <View style={styles.box}>


                        <TextInput
                            placeholder={"Enter Old Password"}
                            value={oldPassword}
                            onBlur={() => ConfirmOldPassword()}
                            onChangeText={value => {
                                setOldPassword(value)
                                setPasswordLoading(false)
                                setPasswordErr("")
                                // console.log(value, "old")
                            }}
                            style={styles.textInput}
                        />
                        {passwordErr !== "" && <Text style={{color: "red",}}>{passwordErr}</Text>}
                        {success && <Text style={{color: "green"}}>Enter new password</Text>}
                        {passwordLoading &&
                            <ActivityIndicator style={{alignSelf: "flex-start"}} color={COLORS.primary}
                                               size={"small"}/>}

                        <TextInput
                            placeholder={"Enter New Password"}
                            value={newPassword}
                            placeholderTextColor={"#999999"}
                            editable={editable}
                            onChangeText={value => {
                                setNewPassword(value)
                                // console.log(value,"new")

                            }}
                            style={styles.textInput}
                        />

                        <TextInput
                            placeholder={"Confirm New Password"}
                            placeholderTextColor={"#999999"}
                            editable={editable}
                            value={confirmPassword}
                            onChangeText={value => {
                                setConfirmPassword(value)
                                // console.log(value,"confirm")

                            }}
                            style={styles.textInput}
                        />

                        {(newPassword !== confirmPassword && confirmPassword !== "") &&
                            <Text style={{color: "red", fontFamily: "Nexa-Book", marginVertical: 10}}>Passwords do not
                                match</Text>}


                    </View>


                </KeyboardAwareScrollView>

                <View style={{
                    flex: 2, justifyContent: "flex-end",
                }}>
                    <CustomButton
                        loading={isLoading}
                        filled
                        text={"Update Password"}
                        onPress={async () => {
                            try {

                                if (confirmPassword !== "") {
                                    await UpdatePassword()
                                    navigation.navigate("PasswordSuccessScreen")
                                }

                            } catch (e) {
                                console.log(e, "error: ")
                            }

                        }}

                    />
                </View>

            </View>

        </>
    );
};

export default ChangePassword


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        // paddingVertical: 20,
        // height: SIZES.height,
        backgroundColor: COLORS.white
    },
    box: {
        // flex: 1,

        // paddingHorizontal: 20,
        // paddingVertical: 20,
        height: SIZES.height * 0.6,
        backgroundColor: COLORS.white

    },
    changePassword: {
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        fontSize: 30,
        // marginVertical: 25
    },
    textInput: {
        borderColor: "#cbc8c8",
        borderWidth: 0.3,
        height: 55,
        borderRadius: 5,
        marginVertical: 10,
        paddingHorizontal: 20,
        color: COLORS.black

    },
})
