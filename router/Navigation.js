// // @flow
// import React from 'react';
// import {SafeAreaView, View} from "react-native";
// import {createNativeStackNavigator} from "@react-navigation/native-stack";
// import SignUp from "../src/screens/signUp";
// import Login from "../src/screens/login";
// import {SIZES} from "../src/constants";
// import WelcomePage from "../src/screens/welcomePage";
// import DashBoard from "../src/screens/dashBoard";
// import Savings from "../src/screens/savings";
// import LinkCard from "../src/screens/linkCard";
// import SuccessScreen from "../src/screens/successScreen";
// import DebitCardSuccessScreen from "../src/screens/debitCardSuccessScreen";
// import {useAuth} from "../src/hooks/useAuth";
// import {UserContext} from "../src/context/UserContext";
//
// const Stack = createNativeStackNavigator()
// const AuthStack = createNativeStackNavigator()
// const MainStack = createNativeStackNavigator()
//
//
// export const Navigation = () => {
//
//     const {state} = useAuth()
//
//     function renderScreens() {
//
//         // if (state.loading) {
//         //     return <RootStack.Screen name={"Splash"} component={SplashScreenDummy}/>;
//         //
//         // }
//
//
//         return (
//             state.user ?
//                 <Stack.Screen name={"MainNavigation"}>
//                     {() => (
//                         <UserContext.Provider value={state.user}>
//                             <MainNavigation/>
//                         </UserContext.Provider>
//                     )}
//                 </Stack.Screen> : <Stack.Screen name={"AuthNavigation"} component={AuthNavigation}/>
//
//
//         )
//     }
//
//
//     return (
//         // <View style={{flex:1, backgroundColor:"white"}}>
//         <Stack.Navigator screenOptions={{
//             headerShown: false,
//             // backgroundColor:"white"
//         }}>
//             {renderScreens()}
//
//         </Stack.Navigator>
//
//         // </View>
//
//     );
// };
//
// export const AuthNavigation = () => {
//     return (
//         // <View style={{flex:1, backgroundColor:"white"}}>
//         <AuthStack.Navigator screenOptions={{
//             headerShown: false,
//             // backgroundColor:"white"
//         }}>
//             <AuthStack.Screen name={"Login"} component={Login}/>
//             <AuthStack.Screen name={"SignUp"} component={SignUp}/>
//         </AuthStack.Navigator>
//
//         // </View>
//
//     );
// };
//
//
// export const MainNavigation = () => {
//     return (
//         // <View style={{flex:1, backgroundColor:"white"}}>
//         <MainStack.Navigator screenOptions={{
//             headerShown: false,
//             // backgroundColor:"white"
//         }}>
//             <MainStack.Screen name={"WelcomePage"} component={WelcomePage}/>
//             <MainStack.Screen name={"DashBoard"} component={DashBoard}/>
//             <MainStack.Screen name={"Savings"} component={Savings}/>
//             <MainStack.Screen name={"LinkCard"} component={LinkCard}/>
//             <MainStack.Screen name={"SuccessScreen"} component={SuccessScreen}/>
//             <MainStack.Screen name={"DebitCardSuccessScreen"} component={DebitCardSuccessScreen}/>
//
//
//         </MainStack.Navigator>
//
//         // </View>
//
//     );
// };
//
//
// export default Navigation
