// @flow
import React, {useContext, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Image, Text, Linking, TextInput} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import BackButton from "../../components/BackButton";
import {COLORS, icons, SIZES} from "../../constants";
import CustomButton from "../../components/CustomButton";
import {UserContext} from "../../context/UserContext";
import {handleQuery} from "../../graphql/requests";


const ChangePassword = ({navigation}) => {

    const user = useContext(UserContext)


    // const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState("")


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
        <View style={styles.container}>

            <BackButton onPress={() => navigation.pop()}/>
            <Text style={styles.changePassword}>Change Password</Text>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.box}>


                    {/*<TextInput*/}
                    {/*    placeholder={"Enter Old Password"}*/}
                    {/*    value={oldPassword}*/}
                    {/*    onChangeText={value => {*/}
                    {/*        setOldPassword(value)*/}
                    {/*        console.log(value, "old")*/}
                    {/*    }}*/}
                    {/*    style={styles.textInput}*/}
                    {/*/>*/}

                    <TextInput
                        placeholder={"Enter New Password"}
                        value={newPassword}
                        placeholderTextColor={"#999999"}
                        onChangeText={value => {
                            setNewPassword(value)
                            // console.log(value,"new")

                        }}
                        style={styles.textInput}
                    />

                    <TextInput
                        placeholder={"Confirm New Password"}
                        placeholderTextColor={"#999999"}

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

                <View style={{
                    flex: 2, justifyContent: "flex-end", height: SIZES.height * 0.2,
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

            </KeyboardAwareScrollView>

        </View>


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
        marginVertical: 25
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
