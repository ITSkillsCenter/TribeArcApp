import React, {useEffect, useState} from "react";
import {SafeAreaView, StatusBar, StyleSheet, View} from "react-native";
import SplashScreen from "react-native-splash-screen";
import {COLORS} from "./src/constants";
import SignUp from "./src/screens/signUp";
import Login from "./src/screens/login";
import {NavigationContainer} from "@react-navigation/native";
import {AuthContext} from "./src/context/AuthContext";
import {useAuth} from "./src/hooks/useAuth";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {UserContext} from "./src/context/UserContext";
import WelcomePage from "./src/screens/welcomePage";
import DashBoard from "./src/screens/dashBoard";
import Savings from "./src/screens/savings";
import LinkCard from "./src/screens/linkCard";
import SuccessScreen from "./src/screens/successScreen";
import DebitCardSuccessScreen from "./src/screens/debitCardSuccessScreen";
import Splash from "./src/screens/splash";
import {Provider as PaperProvider} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SettingsPage from "./src/screens/settings";
import CommunityQuestions from "./src/screens/communityQuestions";
import Profile from "./src/screens/profile";
import EditProfile from "./src/screens/editProfile";
import AddBvn from "./src/screens/addBvn";
import ChangePassword from "./src/screens/changePassword";
import PasswordSuccessScreen from "./src/screens/passwordSuccessScreen";
import OtpScreen from "./src/screens/otpScreen";
import ReferralPage from "./src/screens/referralPage";
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import PaymentWebPage from "./src/screens/paymentWebPage";
import RecentTransactions from "./src/screens/recentTransactions";
import RegistrationFee from "./src/screens/registrationFee";
import RegFeeSuccessScreen from "./src/screens/RegFeeSuccessScreen";
// import {GestureHandlerRootView} from "react-native-gesture-handler";

const App = () => {

    const {auth, state} = useAuth();
    const [viewedWelcomePage, setViewedWelcomePage] = useState(false)

    useEffect(() => {
        SplashScreen.hide()
        CheckWelcomePage()

    }, [])


    const RootStack = createNativeStackNavigator()
    const AuthStack = createNativeStackNavigator()
    const MainStack = createNativeStackNavigator()


    const CheckWelcomePage = async () => {
        try {
            const value = await AsyncStorage.getItem("@ViewedWelcome")

            // console.log(value, "VALLLA")

            if (value !== null) {
                setViewedWelcomePage(true)
            }

        } catch (error) {
            console.log("error @viewWelcome", error)
        }
    }


    const AuthNavigation = () => {
        return (// <View style={{flex:1, backgroundColor:"white"}}>
            <AuthStack.Navigator screenOptions={{
                headerShown: false, // backgroundColor:"white"
            }}>
                <AuthStack.Screen name={"Login"} component={Login}/>
                <AuthStack.Screen name={"SignUp"} component={SignUp}/>
                <AuthStack.Screen name={"OtpScreen"} component={OtpScreen}/>
                <AuthStack.Screen name={"MainNavigation"} component={MainNavigation}/>
            </AuthStack.Navigator>

        );
    };


    const MainNavigation = () => {
        return (// <View style={{flex:1, backgroundColor:"white"}}>
            <MainStack.Navigator
                initialRouteName={viewedWelcomePage ? "DashBoard" : "WelcomePage"}
                screenOptions={{
                    headerShown: false, // backgroundColor:"white"
                }}>
                <MainStack.Screen name={"WelcomePage"} component={WelcomePage}/>
                <MainStack.Screen name={"RegistrationFee"} component={RegistrationFee}/>
                <MainStack.Screen name={"RegFeeSuccessScreen"} component={RegFeeSuccessScreen}/>
                <MainStack.Screen name={"DashBoard"} component={DashBoard}/>
                <MainStack.Screen name={"Savings"} component={Savings}/>
                <MainStack.Screen name={"LinkCard"} component={LinkCard}/>
                <MainStack.Screen name={"SuccessScreen"} component={SuccessScreen}/>
                <MainStack.Screen name={"DebitCardSuccessScreen"} component={DebitCardSuccessScreen}/>
                <MainStack.Screen name={"SettingsPage"} component={SettingsPage}/>
                <MainStack.Screen name={"CommunityQuestions"} component={CommunityQuestions}/>
                <MainStack.Screen name={"Profile"} component={Profile}/>
                <MainStack.Screen name={"EditProfile"} component={EditProfile}/>
                <MainStack.Screen name={"AddBvn"} component={AddBvn}/>
                <MainStack.Screen name={"ChangePassword"} component={ChangePassword}/>
                <MainStack.Screen name={"PasswordSuccessScreen"} component={PasswordSuccessScreen}/>
                <MainStack.Screen name={"ReferralPage"} component={ReferralPage}/>
                <MainStack.Screen name={"PaymentWebPage"} component={PaymentWebPage}/>
                <MainStack.Screen name={"RecentTransactions"} component={RecentTransactions}/>

            </MainStack.Navigator>

            // </View>

        );
    };


    function renderScreens() {

        if (state.loading) {
            return <RootStack.Screen name={"Splash"} component={Splash}/>;

        }


        // console.log(state.user, "State USERR ")

        return (state.user ? <RootStack.Screen name={"MainNavigation"}>
                    {() => (<UserContext.Provider value={state.user}>
                        <MainNavigation/>
                    </UserContext.Provider>)}
                </RootStack.Screen> :

                <RootStack.Screen name={"AuthNavigation"} component={AuthNavigation}/>


        )
    }


    const toastConfig = {

        success: (props) => (
            <BaseToast
                {...props}
                style={{borderLeftColor: COLORS.primary}}
                contentContainerStyle={{paddingHorizontal: 15}}
                text1Style={{
                    fontSize: 20,
                    fontFamily: "Nexa-Bold"
                }}
                text2Style={{
                    fontSize: 14,
                    fontFamily: "Nexa-Bold"
                }}
            />
        ),

        error: (props) => (
            <ErrorToast
                {...props}
                text1Style={{
                    fontSize: 17
                }}
                text2Style={{
                    fontSize: 15
                }}
            />
        ),


    };


    return (
        // <GestureHandlerRootView>


        <AuthContext.Provider value={auth}>

            <PaperProvider>
                <SafeAreaView style={styles.container}>
                    {/*<StatusBar translucent={false} backgroundColor={"transparent"} />*/}
                    <NavigationContainer>
                        <RootStack.Navigator screenOptions={{
                            headerShown: false, // backgroundColor:"white"
                        }}>
                            {/*<RootStack.Screen name={"AuthNavigation"} component={AuthNavigation}/>*/}
                            {/*<RootStack.Screen name={"MainNavigation"} component={MainNavigation}/>*/}
                            {/**/}
                            {renderScreens()}

                        </RootStack.Navigator>


                    </NavigationContainer>
                    <Toast config={toastConfig}/>

                </SafeAreaView>
            </PaperProvider>

        </AuthContext.Provider>

        // </GestureHandlerRootView>


    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: 10,
        // height: SIZES.height,
        // alignItems: 'center',
        // justifyContent: 'center'
    }

})

export default App
