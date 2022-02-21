import React, {useContext, useState} from "react"
import {Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import CustomInputBox from "../../components/CustomInputBox";
import CustomButton from "../../components/CustomButton";
import TextButtonComponent from "../../components/TextButtonComponent";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {AuthContext} from "../../context/AuthContext";


const Login = ({navigation, route}) => {

    const otpSuccess = route.params
    // console.log(otpSuccess, "SUZZZZ")

    const [emailOrNumber, setEmailOrNumber] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)


    const {login} = useContext(AuthContext)


    return (

        <SafeAreaView style={styles.container}>

            <KeyboardAwareScrollView style={styles.container2} showsVerticalScrollIndicator={false}>

                <View>
                    <Image source={require("../../assets/images/login.png")}
                           resizeMode={"contain"}
                           style={styles.img}/>
                </View>


                <View style={styles.registerBox}>
                    <Text style={styles.register}>Login</Text>
                </View>


                <View>
                    {otpSuccess && <Text style={{color: "green"}}>OTP verified, login with your data</Text>}
                    <CustomInputBox
                        // label={"Email or Phone Number"}
                        placeholderText={"Enter Email Address"}
                        isPassword={false}
                        initialValue={emailOrNumber}
                        onChange={emailOrNumber => {
                            setEmailOrNumber(emailOrNumber);
                            setIsError(false)
                        }}
                    />


                    <CustomInputBox
                        // label={"Create Password"}
                        placeholderText={"Create a Password"}
                        isPassword={true}
                        initialValue={password}
                        onChange={password => {
                            setPassword(password);
                            setIsError(false)
                        }}

                    />
                </View>


                {isError && <Text style={{color: "red"}}>Something went wrong, Try again.</Text>}

                <CustomButton
                    text={"Login"}
                    loading={isLoading}
                    filled={!!(emailOrNumber && password !== "")}
                    onPress={async () => {

                        try {
                            if (emailOrNumber && password !== "") {
                                setIsLoading(true)
                                await login(emailOrNumber, password);
                                // navigation.navigate("MainNavigation")
                            }

                        } catch (e) {
                            console.log("login error:", e.message)
                            await setIsLoading(false)
                            {
                                e && setIsError(true)
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
        flex: 1, height: SIZES.height, backgroundColor: COLORS.white,

    }, container2: {
        height: SIZES.height, backgroundColor: COLORS.white, paddingHorizontal: 20,

    }, img: {
        width: SIZES.width, height: SIZES.height * 0.35,
    }, registerBox: {
        marginVertical: 10
    }, register: {
        fontSize: 28, color: COLORS.black, fontFamily: "Nexa-Bold", paddingVertical: 10
    }

})
