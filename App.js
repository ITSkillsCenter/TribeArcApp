import React, {useContext, useEffect, useState} from "react";
import {Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import SplashScreen from "react-native-splash-screen";
import {COLORS, icons} from "./src/constants";
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
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
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
import CompleteProfile1 from "./src/screens/completeProfile1";
import CompleteProfile2 from "./src/screens/completeProfile2";
import ProfileCompletedSuccessScreen from "./src/screens/profileCompletedSuccessScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import StartSaving from "./src/screens/startSaving";
import StartInvesting from "./src/screens/startInvesting";
import InvestmentMainScreen from "./src/screens/InvestmentMainScreen";
import InvestmentDetailsScreen from "./src/screens/investmentDetailsScreen";
import InvestmentTermsPage from "./src/screens/investmentTermsPage";
import MyInvestmentDetailsScreen from "./src/screens/myInvestmentDetailsScreen";
import SavingsMainScreen from "./src/screens/savingsMainScreen";
import SavingsAccountPage from "./src/screens/savingsAccountPage";
import SavingsTransactionPage from "./src/screens/savingsTransactionPage";
import AutosaveSettingsPage from "./src/screens/autosaveSettingsPage";
import VoluntaryAccountPage from "./src/screens/voluntaryAccountPage";
import VoluntaryTransactionPage from "./src/screens/voluntaryTransactionPage";
import WithdrawalScreen from "./src/screens/withdrawalScreen";
import WithdrawalSuccessScreen from "./src/screens/withdrawalSuccessScreen";
import TopUpScreen from "./src/screens/topUpScreen";
import AccountDetailsPage from "./src/screens/accountDetailsPage";
import AddAccountDetailsScreen from "./src/screens/addAccountDetailsScreen";
import AccountDetailsSavedSuccess from "./src/screens/accountDetailsSavedSuccess";
import CardSettings from "./src/screens/cardSettings";
import PdfPage from "./src/screens/pdfPage";
import PaymentSuccessScreen from "./src/screens/paymentSuccessScreen";
import {handleQuery} from "./src/graphql/requests";
import OnBoarding from "./src/screens/onBoardng";
// import {GestureHandlerRootView} from "react-native-gesture-handler";

const App = () => {

    const {auth, state} = useAuth();
    const [viewedWelcomePage, setViewedWelcomePage] = useState(false)
    const [savingWlc, setSavingWlc] = useState(false)
    const [investWlc, setInvestWlc] = useState(false)
    // const [paidRegFee, setPaidRegFee] = useState(false);


    useEffect(() => {



        CheckWelcomePage()
        CheckSavingWlc()
        CheckInvestWlc()
        SplashScreen.hide()


    }, [])


    const RootStack = createNativeStackNavigator()
    const AuthStack = createNativeStackNavigator()
    const MainStack = createNativeStackNavigator()
    const Tab = createBottomTabNavigator();


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


    const CheckSavingWlc = async () => {
        try {
            const value = await AsyncStorage.getItem("@savingWlc");
            if (value !== null) {
                setSavingWlc(true);
            }
        } catch (error) {
            console.log("Error @savingWlc: ", error);

        }
    };

    const CheckInvestWlc = async () => {
        try {
            const value = await AsyncStorage.getItem("@investWlc");
            if (value !== null) {
                setInvestWlc(true);
            }
        } catch (error) {
            console.log("Error @investWlc: ", error);

        }
    };

    const AuthNavigation = () => {
        return (// <View style={{flex:1, backgroundColor:"white"}}>
            <AuthStack.Navigator screenOptions={{
                headerShown: false, // backgroundColor:"white"
            }}>
                <AuthStack.Screen name={"OnBoarding"} component={OnBoarding}/>
                <AuthStack.Screen name={"Login"} component={Login}/>
                <AuthStack.Screen name={"SignUp"} component={SignUp}/>
                <AuthStack.Screen name={"OtpScreen"} component={OtpScreen}/>
                <AuthStack.Screen name={"MainNavigation"} component={MainNavigation}/>
            </AuthStack.Navigator>

        );
    };

    const MainNavigation = () => {

        const user = useContext(UserContext);

        useEffect(() => {



        }, []);


        // const ChkRegFee = async () => {
        //
        //     let qry = `query {
        //                     users(where: { id: ${user.id} }) {
        //                     paid_reg_fee
        //                             }
        //                         }`
        //     try {
        //         const qryRes = await handleQuery(qry, user.token, false)
        //         // console.log(qryRes.data.users[0].paid_reg_fee)
        //         await setPaidRegFee(qryRes.data.users[0].paid_reg_fee)
        //
        //     } catch (e) {
        //         console.log(e, "ChkRegFeeErr")
        //     }
        // }


        return (
            <MainStack.Navigator
                initialRouteName={"BottomTabs"}
                screenOptions={{
                    headerShown: false,
                }}>
                <MainStack.Screen name={"WelcomePage"} component={WelcomePage}/>
                <MainStack.Screen name={"BottomTabs"} component={BottomTabs}/>
                <MainStack.Screen name={"RegistrationFee"} component={RegistrationFee}/>
                <MainStack.Screen name={"CompleteProfile1"} component={CompleteProfile1}/>
                <MainStack.Screen name={"CompleteProfile2"} component={CompleteProfile2}/>
                <MainStack.Screen name={"ProfileCompletedSuccessScreen"} component={ProfileCompletedSuccessScreen}/>
                <MainStack.Screen name={"RegFeeSuccessScreen"} component={RegFeeSuccessScreen}/>
                <MainStack.Screen name={"DashBoard"} component={DashBoard}/>
                <MainStack.Screen name={"Savings"} component={Savings}/>
                <MainStack.Screen name={"SavingsMainScreen"} component={SavingsMainScreen}/>
                <MainStack.Screen name={"SavingsAccountPage"} component={SavingsAccountPage}/>
                <MainStack.Screen name={"SavingsTransactionPage"} component={SavingsTransactionPage}/>
                <MainStack.Screen name={"AutosaveSettingsPage"} component={AutosaveSettingsPage}/>
                <MainStack.Screen name={"VoluntaryAccountPage"} component={VoluntaryAccountPage}/>
                <MainStack.Screen name={"VoluntaryTransactionPage"} component={VoluntaryTransactionPage}/>
                <MainStack.Screen name={"WithdrawalScreen"} component={WithdrawalScreen}/>
                <MainStack.Screen name={"WithdrawalSuccessScreen"} component={WithdrawalSuccessScreen}/>
                <MainStack.Screen name={"AccountDetailsPage"} component={AccountDetailsPage}/>
                <MainStack.Screen name={"LinkCard"} component={LinkCard}/>
                <MainStack.Screen name={"SuccessScreen"} component={SuccessScreen}/>
                <MainStack.Screen name={"DebitCardSuccessScreen"} component={DebitCardSuccessScreen}/>
                <MainStack.Screen name={"PdfPage"} component={PdfPage}/>
                <MainStack.Screen name={"AddAccountDetailsScreen"} component={AddAccountDetailsScreen}/>
                <MainStack.Screen name={"CardSettings"} component={CardSettings}/>
                <MainStack.Screen name={"AccountDetailsSavedSuccess"} component={AccountDetailsSavedSuccess}/>
                <MainStack.Screen name={"SettingsPage"} component={SettingsPage}/>
                <MainStack.Screen name={"CommunityQuestions"} component={CommunityQuestions}/>
                <MainStack.Screen name={"Profile"} component={Profile}/>
                <MainStack.Screen name={"EditProfile"} component={EditProfile}/>
                <MainStack.Screen name={"AddBvn"} component={AddBvn}/>
                <MainStack.Screen name={"ChangePassword"} component={ChangePassword}/>
                <MainStack.Screen name={"PasswordSuccessScreen"} component={PasswordSuccessScreen}/>
                <MainStack.Screen name={"InvestmentMainScreen"} component={InvestmentMainScreen}/>
                <MainStack.Screen name={"InvestmentDetailsScreen"} component={InvestmentDetailsScreen}/>
                <MainStack.Screen name={"MyInvestmentDetailsScreen"} component={MyInvestmentDetailsScreen}/>
                <MainStack.Screen name={"PaymentSuccessScreen"} component={PaymentSuccessScreen}/>
                <MainStack.Screen name={"InvestmentTermsPage"} component={InvestmentTermsPage}/>
                <MainStack.Screen name={"ReferralPage"} component={ReferralPage}/>
                <MainStack.Screen name={"PaymentWebPage"} component={PaymentWebPage}/>
                <MainStack.Screen name={"RecentTransactions"} component={RecentTransactions}/>
                <MainStack.Screen name={"TopUpScreen"} component={TopUpScreen}/>
            </MainStack.Navigator>


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


    const TabBarCustomButton = ({children, onPress}) => {

        return (
            <TouchableOpacity
                activeOpacity={0.6}
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onPress={onPress}>

                {children}

            </TouchableOpacity>
        );
    };

    const BottomTabs = ({navigation}) => {

        return (
            <Tab.Navigator
                detachInactiveScreens
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        paddingHorizontal: 15,
                        right: 0,
                        elevation: 5,
                        shadowOpacity: 0.1,
                        shadowOffset: {
                            width: 5,
                            height: -3,
                        },
                        // backgroundColor: "cyan",
                        borderTopColor: "rgba(175,174,174,0.7)",
                        height: Platform.OS === "android" ? 85 : 50,
                    },


                }}>
                <Tab.Screen name="DashBoard" component={DashBoard}
                            options={{
                                tabBarIcon: ({focused}) => (
                                    <View style={{alignItems: "center"}}>
                                        <Image source={icons.homeIcon}
                                               resizeMode={"center"}

                                               style={{
                                                   width: 22,
                                                   height: 22,
                                                   tintColor: focused ? COLORS.primary : COLORS.tertiary
                                               }}/>

                                        <Text style={{
                                            fontSize: 12,
                                            color: focused ? COLORS.primary : COLORS.tertiary,
                                            fontFamily: "Nexa-Bold"
                                        }}>Home</Text>
                                    </View>
                                ),
                            }}
                />
                <Tab.Screen
                    name="StartSaving"
                    component={savingWlc ? SavingsMainScreen : StartSaving}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: "center"}}>
                                <Image source={icons.savingsIcon}
                                       resizeMode={"center"}

                                       style={{
                                           width: 22,
                                           height: 22,
                                           tintColor: focused ? COLORS.primary : COLORS.tertiary
                                       }}/>

                                <Text style={{
                                    fontSize: 12,
                                    color: focused ? COLORS.primary : COLORS.tertiary,
                                    fontFamily: "Nexa-Bold"
                                }}>Savings</Text>
                            </View>
                        ),
                    }}/>
                <Tab.Screen
                    name="TopUpScreenDummy"
                    component={TopUpScreen}

                    options={{
                        tabBarIcon: ({focused}) => {
                            return (
                                <View
                                    style={{
                                        alignItems: "center",
                                        height: 50,
                                        justifyContent: "space-around",
                                        elevation: 7,
                                        shadowOpacity: 0.1,
                                        shadowOffset: {
                                            width: 4,
                                            height: 5,
                                        },
                                    }}>
                                    <View
                                        style={{
                                            width: 70,
                                            height: 70,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            bottom: 30,
                                            borderRadius: 35,

                                        }}
                                    >
                                        <Image
                                            source={icons.addIcon}
                                            resizeMode={"center"}

                                            style={{
                                                width: 53,
                                                height: 53,
                                            }}
                                        />
                                    </View>
                                </View>
                            );
                        },

                        tabBarButton: (props) => (
                            <TabBarCustomButton
                                {...props}
                                onPress={() => navigation.navigate("TopUpScreen")}
                            />
                        ),

                    }}

                />
                <Tab.Screen
                    name="StartInvesting"
                    component={investWlc ? InvestmentMainScreen : StartInvesting}
                    options={{
                        tabBarIcon: ({focused}) => (

                            <View style={{alignItems: "center"}}>
                                < Image source={icons.invIcon}
                                        resizeMode={"center"}
                                        style={{
                                            width: 22,
                                            height: 22,
                                            tintColor: focused ? COLORS.primary : COLORS.tertiary
                                        }}/>
                                <Text style={{
                                    fontSize: 12,
                                    color: focused ? COLORS.primary : COLORS.tertiary,
                                    fontFamily: "Nexa-Bold"
                                }}>Investment</Text>

                            </View>
                        ),
                    }}
                />
                <Tab.Screen name="Profile" component={Profile}
                            options={{
                                tabBarIcon: ({focused}) => (

                                    <View style={{alignItems: "center"}}>

                                        <Image source={icons.acctIcon}
                                               resizeMode={"center"}
                                               style={{
                                                   width: 22,
                                                   height: 22,
                                                   tintColor: focused ? COLORS.primary : COLORS.tertiary
                                               }}/>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: focused ? COLORS.primary : COLORS.tertiary,
                                                fontFamily: "Nexa-Bold"
                                            }}>Account</Text>

                                    </View>

                                ),
                            }}/>
            </Tab.Navigator>
        );
    };

    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: COLORS.primary,
            accent: COLORS.secondary,
        },
    };

    return (

        <AuthContext.Provider value={auth}>
            <PaperProvider theme={theme}>
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
