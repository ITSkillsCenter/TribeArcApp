import React, {useContext, useState} from "react"
import {Alert, Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import CustomInputBox from "../../components/CustomInputBox";
import CustomButton from "../../components/CustomButton";
import TextButtonComponent from "../../components/TextButtonComponent";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {AuthContext} from "../../context/AuthContext";
import {resolve} from "@babel/core/lib/vendor/import-meta-resolve";
import CustomTextInput from "../../components/CustomTextInput";


const SignUp = ({navigation}) => {

    const [emailOrNumber, setEmailOrNumber] = useState("");
    const [password, setPassword] = useState("");
    const [referredBy, setReferredBy] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [focused, setFocused] = useState(false)
    const [focused2, setFocused2] = useState(false)
    const [focused3, setFocused3] = useState(false)


    const {register} = useContext(AuthContext)


    return (

        <SafeAreaView style={styles.container}>

            <KeyboardAwareScrollView style={styles.container2} showsVerticalScrollIndicator={false}>

                <View>
                    <Image source={require("../../assets/images/register.png")} resizeMode={"contain"}
                           style={styles.img}/>
                </View>
                <View style={styles.registerBox}>
                    <Text style={styles.register}>Register</Text>
                </View>

                <View>
                    <CustomTextInput
                        title={"Email Address"}
                        placeholderText={"Enter Email Address"}
                        isPassword={false}
                        initialValue={emailOrNumber}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onChange={emailOrNumber => {
                            setEmailOrNumber(emailOrNumber);
                            setIsError(false)
                            setIsLoading(false)

                        }}
                        inputContainerStyle={{
                            backgroundColor: "#FFF",
                            borderColor: focused ? COLORS.primary : "grey",
                            fontSize: 16,
                            borderRadius: 0,
                            borderWidth: focused ? 1 : 0.5,
                            height: SIZES.width * 0.13,

                        }}

                    />
                    <CustomTextInput
                        title={"Create Password"}
                        onFocus={() => setFocused2(true)}
                        onBlur={() => setFocused2(false)}
                        placeholderText={"Create a Password"}
                        isPassword={true}
                        initialValue={password}
                        onChange={password => {
                            setPassword(password);
                            setIsError(false)
                            setIsLoading(false)
                        }}
                        inputContainerStyle={{
                            backgroundColor: "#FFF",
                            borderColor: focused2 ? COLORS.primary : "grey",
                            fontSize: 16,
                            borderRadius: 0,
                            borderWidth: focused2 ? 1 : 0.5,
                            height: SIZES.width * 0.13,

                        }}

                    />

                    <CustomTextInput
                        title={"Referral code"}
                        placeholderText={"Enter referral code"}
                        initialValue={referredBy}
                        onFocus={() => setFocused3(true)}
                        onBlur={() => setFocused3(false)}
                        props={{
                            maxLength: 5
                        }}
                        onChange={referredBy => {
                            setReferredBy(referredBy);
                            setIsError(false)
                            setIsLoading(false)


                        }}
                        inputContainerStyle={{
                            backgroundColor: "#FFF",
                            borderColor: focused3 ? COLORS.primary : "grey",
                            fontSize: 16,
                            borderRadius: 0,
                            borderWidth: focused3 ? 1 : 0.5,
                            height: SIZES.width * 0.13,

                        }}

                    />

                </View>

                {isError && <Text style={{color: "red"}}>{errMsg}</Text>}

                <CustomButton
                    text={"Register"}
                    filled={emailOrNumber && password && referredBy && true}
                    loading={isLoading}
                    // onPress={() => {
                    //     navigation.navigate("OtpScreen", emailOrNumber)
                    // }}
                    onPress={async () => {
                        try {
                            if (emailOrNumber.includes("@")) {
                                if (emailOrNumber && password && referredBy !== "") {
                                    setIsLoading(true)
                                    const reg = await register(emailOrNumber, password, referredBy)

                                    console.log(reg, "REGGG")
                                    if (reg) {

                                        navigation.navigate("OtpScreen", emailOrNumber)

                                    }

                                    // navigation.navigate("OtpScreen", emailOrNumber)

                                    setIsLoading(false)


                                }
                            } else {
                                Alert.alert("Invalid Email", "Enter a valid email address")

                            }


                        } catch (e) {
                            console.log("Reg error", e)
                            setIsLoading(false)
                            {
                                e &&
                                setIsError(true)
                            }
                            // {
                            //     e && setErrMsg(e)
                            // }

                            {
                                e[0].extensions.exception.data.data[0].messages[0].message && setErrMsg((e[0].extensions.exception.data.data[0].messages[0].message).replace("for this domain", ""))
                            }
                        }
                    }}


                />


                <TextButtonComponent
                    text={"Already have an account?"}
                    pressable={"Log In"}
                    onPress={() => navigation.navigate("Login")}
                />

            </KeyboardAwareScrollView>

        </SafeAreaView>


    )

}


export default SignUp


const styles = StyleSheet.create({
    container: {
        flex: 1, height: SIZES.height, backgroundColor: COLORS.white,
    }, container2: {
        height: SIZES.height, paddingHorizontal: 20, backgroundColor: COLORS.white,
    }, img: {
        width: SIZES.width, height: SIZES.height * 0.4,
    }, registerBox: {
        // marginVertical: 10,
        // backgroundColor:"cyan"
    }, register: {
        fontSize: 28, color: COLORS.black, fontFamily: "Nexa-Bold", paddingVertical: 10

    }

})
