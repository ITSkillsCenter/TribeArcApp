// @flow
import React, {useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import {COLORS, icons, SIZES} from "../../constants";
import CustomInputBox from "../../components/CustomInputBox";


const EditProfile = ({navigation}) => {


    const [isLoading, setIsLoading] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNum, setPhoneNum] = useState("")

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
                />
                <View style={{marginVertical: 5}}/>

                <CustomInputBox
                    initialValue={phoneNum}
                    onChange={value => setPhoneNum(value)}
                    placeholderText={"Phone Number"}

                />


                {/*</View>*/}

                <View style={{flex: 2, justifyContent: "flex-end"}}>
                    <CustomButton
                        onPress={() => {
                            navigation.navigate("DashBoard")
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
