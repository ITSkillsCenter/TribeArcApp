// @flow
import React, {useContext, useEffect, useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import {COLORS, icons, SIZES} from "../../constants";
import CustomInputBox from "../../components/CustomInputBox";
import {UserContext} from "../../context/UserContext";
import {handleQuery} from "../../graphql/requests";


const EditProfile = ({navigation}) => {


    const user = useContext(UserContext);

    useEffect(() => {

        GetUserData()
    }, []);


    const [isLoading, setIsLoading] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNum, setPhoneNum] = useState("")
    const [profession, setProfession] = useState("")


    const GetUserData = async () => {
        let qry = `query{
            users(where:{id:${user.id}}){
            firstname
            lastname
            email
            phone_number
            profession
                }
                    }`
        try {

            let res = await handleQuery(qry, user.token, false)
            console.log(res.data.users[0].profession, "REZZZ")
            await setEmail(res.data.users[0].email)
            await setFirstName(res.data.users[0].firstname)
            await setLastName(res.data.users[0].lastname)
            await setPhoneNum(res.data.users[0].phone_number)
            await setProfession(res.data.users[0].profession)


        } catch (e) {
            console.log(e, "GetUserDataError")
        }
    }


    const UpdateUserData = async () => {
        let qry = `mutation {
            updateUser(
            input: {
            where: { id: ${user.id} }
            data: {
             firstname: "${firstName}",
             lastname: "${lastName}",
             phone_number:"${phoneNum}"
             profession:"${profession}"
             
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

            console.log(qry)

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
            <Text style={styles.myProfile}>My Profile</Text>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>


                {/*<View>*/}
                <ImageBackground
                    source={require("../../assets/images/userImg.png")}
                    style={{width: 120, height: 120, marginVertical: 10}}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => console.log("image")}
                        style={{
                            backgroundColor: "#EFF2FF",
                            width: 40,
                            height: 40,
                            alignSelf: "flex-end",
                            alignItems: "center",
                            justifyContent: "center",
                            top: 80,
                            borderRadius: 40
                            // flex:1
                        }}>
                        <Image
                            source={icons.camera}
                            style={{width: 20, height: 20}}
                        />
                    </TouchableOpacity>
                </ImageBackground>


                <CustomInputBox
                    initialValue={firstName}
                    onChange={value => setFirstName(value)}
                    placeholderText={"First Name"}
                />
                <View style={{marginVertical: 5}}/>
                <CustomInputBox
                    initialValue={lastName}
                    onChange={value => setLastName(value)}
                    placeholderText={"Last Name"}
                />
                <View style={{marginVertical: 5}}/>

                <CustomInputBox
                    initialValue={email}
                    onChange={value => setEmail(value)}
                    placeholderText={"Email Address"}
                    props={{
                        editable: false
                    }}
                />
                <View style={{marginVertical: 5}}/>

                <CustomInputBox
                    initialValue={phoneNum}
                    onChange={value => setPhoneNum(value)}
                    placeholderText={"Phone Number"}

                />
                <View style={{marginVertical: 5}}/>

                <CustomInputBox
                    initialValue={profession}
                    onChange={value => setProfession(value)}
                    placeholderText={"Profession"}

                />


                {/*</View>*/}

                <View style={{flex: 2, justifyContent: "flex-end"}}>
                    <CustomButton
                        onPress={async () => {

                            try {
                                await UpdateUserData()
                                navigation.navigate("DashBoard")

                            } catch (e) {
                                console.log(e, "UpdateUserError")
                            }

                        }}
                        loading={isLoading}
                        filled text={"Update Profile"}
                    />
                </View>


            </KeyboardAwareScrollView>
        </View>


    );
};

export default EditProfile


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        // paddingVertical: 20,
        height: SIZES.height,
        backgroundColor: COLORS.white
    },
    myProfile: {
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        fontSize: 30,
        marginVertical: 25
    },

})
