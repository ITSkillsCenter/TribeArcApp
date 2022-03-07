import React, {useContext, useState} from "react"
import {Alert, Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import CustomButton from "../../components/CustomButton";
import TextButtonComponent from "../../components/TextButtonComponent";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {AuthContext} from "../../context/AuthContext";
import CustomTextInput from "../../components/CustomTextInput";


const Login = ({navigation, route}) => {

    const otpSuccess = route.params
    const {login} = useContext(AuthContext)


    const [emailOrNumber, setEmailOrNumber] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [focused, setFocused] = useState(false)
    const [focused2, setFocused2] = useState(false)
    const [errMsg, setErrMsg] = useState("")


    return (

        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView style={styles.container2} showsVerticalScrollIndicator={false}>
                <View>
                    <Image
                        source={require("../../assets/images/login.png")}
                        resizeMode={"contain"}
                        style={styles.img}/>
                </View>

                <View style={styles.registerBox}>
                    <Text style={styles.register}>Login</Text>
                </View>

                <View>
                    {otpSuccess && <Text style={{color: "green"}}>OTP verified, login with your data</Text>}
                    {/*ENTER EMAIL*/}
                    <CustomTextInput
                        title={"Email Address"}
                        placeholderText={"Enter Email Address"}
                        isPassword={false}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        initialValue={emailOrNumber}
                        onChange={emailOrNumber => {
                            setEmailOrNumber(emailOrNumber);
                            setIsError(false)
                        }}
                        inputContainerStyle={{
                            backgroundColor: "#FFF",
                            borderColor: focused ? COLORS.primary : "grey",
                            fontSize: 16,
                            borderWidth: focused ? 1 : 0.5,
                            height: SIZES.width * 0.13,
                            borderRadius: 0,
                        }}
                    />


                    {/*ENTER PASSWORD*/}
                    <CustomTextInput
                        title={"Enter Password"}
                        placeholderText={"Enter your Password"}
                        isPassword={true}
                        initialValue={password}
                        onFocus={() => setFocused2(true)}
                        onBlur={() => setFocused2(false)}
                        onChange={password => {
                            setPassword(password);
                            setIsError(false)
                        }}
                        inputContainerStyle={{
                            backgroundColor: "#FFF",
                            fontSize: 16,
                            borderRadius: 0,
                            borderColor: focused2 ? COLORS.primary : "grey",
                            borderWidth: focused2 ? 1 : 0.5,
                            height: SIZES.width * 0.13,
                        }}
                    />
                </View>


                {isError && <Text style={{color: "red"}}>{errMsg}</Text>}
                {/*LOGIN BUTTON*/}
                <CustomButton
                    text={"Login"}
                    loading={isLoading}
                    filled={!!(emailOrNumber && password !== "")}
                    onPress={async () => {
                        try {
                            if (emailOrNumber.includes("@")) {
                                if (emailOrNumber && password !== "") {
                                    setIsLoading(true)
                                    await login(emailOrNumber, password);
                                }
                            } else {
                                Alert.alert("Invalid Email", "Enter a valid email address")
                            }

                        } catch (e) {
                            console.log("login error:", e[0].extensions.exception.data.data[0].messages[0].message)
                            await setIsLoading(false)
                            {
                                e && setIsError(true)
                            }

                            {
                                e[0].extensions.exception.data.data[0].messages[0].message && setErrMsg((e[0].extensions.exception.data.data[0].messages[0].message).replace("Identifier or password invalid.", "Invalid Email or password "))
                            }
                        }
                    }}
                />

                <TextButtonComponent
                    text={"Don't have an account?"}
                    pressable={"Register"}
                    onPress={() => navigation.navigate("SignUp")}
                />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}


export default Login


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: SIZES.height,
        backgroundColor: COLORS.white,
    },
    container2: {
        height: SIZES.height,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,

    },
    img: {
        width: SIZES.width,
        height: SIZES.height * 0.35,
    },
    registerBox: {
        marginVertical: 10
    },
    register: {
        fontSize: 28,
        color: COLORS.black,
        fontFamily: "Nexa-Bold",
        paddingVertical: 10
    }

})
