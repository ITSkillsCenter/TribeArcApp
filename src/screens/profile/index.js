// @flow
import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import BackButton from "../../components/BackButton";
import {COLORS, icons, SIZES} from "../../constants";
import {UserContext} from "../../context/UserContext";
import AccountOptions from "../../components/AccountOptions";
import {AuthContext} from "../../context/AuthContext";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import CustomButton from "../../components/CustomButton";


const Profile = ({navigation}) => {

    const {logout} = useContext(AuthContext)
    const user = useContext(UserContext)

    const bs = React.createRef();
    const fall = new Animated.Value(1);


    const renderHeader = () => (
        <View style={{
            padding: 20,
            backgroundColor: "#fff",
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            width: SIZES.width,
            shadowColor: '#333333',
            shadowOffset: {width: -1, height: -3},
            shadowRadius: 2,
            shadowOpacity: 0.4,
            elevation: 0.3,
        }}>

            <TouchableOpacity onPress={() => bs.current.snapTo(1)}>
                <Text style={{
                    alignSelf: "flex-end",
                    color: "black",
                    fontFamily: "Nexa-Bold",
                    fontSize: 20,
                    right: 15
                }}>X</Text>

            </TouchableOpacity>

        </View>
    );


    const renderInner = () => (
        <View style={{
            backgroundColor: "#fff",
            paddingHorizontal: 20,
            height: 410,
            alignItems: "center"
        }}>

            <Text style={{fontSize: 20, color: COLORS.black, fontFamily: "Nexa-Bold"}}>Logout?</Text>
            <Text style={{fontSize: 16, color: "#999999", fontFamily: "Nexa-Book", marginVertical: 30}}>Are you sure you
                want to logout?</Text>

            <View style={{width: SIZES.width * 0.9, marginVertical: 10}}>
                <CustomButton onPress={() => logout()} filled text={"Confirm"}/>

            </View>

        </View>
    );

    return (
        <View>

            <BottomSheet
                ref={bs}
                snapPoints={[400, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
                enabledBottomInitialAnimation={true}
            />
            <Animated.View style={styles.container}>

                <BackButton onPress={() => navigation.pop()}/>
                <Text style={styles.myAccount}>My Account</Text>

                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                    navigation.navigate("EditProfile")
                }} style={styles.userDetails}>
                    <View style={styles.imgContainer}>
                        <Image style={styles.img} resizeMode={"contain"}
                               source={require("../../assets/images/userImg.png")}/>
                    </View>

                    <View style={styles.fullNameContainer}>
                        <Text style={styles.fullName}>{user?.firstname} {user?.lastname}</Text>

                        <Text style={styles.editProfile}>Edit Profile</Text>

                    </View>

                    <Image source={icons.arrowRight} style={{width: 20, height: 20}}
                           resizeMode={"contain"}/>


                </TouchableOpacity>


                <AccountOptions onPress={() => {
                    navigation.navigate("AddBvn")
                }} image={icons.addBvn} text={"Add your BVN"}/>
                <AccountOptions onPress={() => {
                }} image={icons.linkCard} text={"Card Settings"}/>
                <AccountOptions onPress={() => {
                    navigation.navigate("ChangePassword")

                }} image={icons.key} text={"Password Settings"}/>
                <AccountOptions
                    image={icons.logout}
                    text={"Logout"}
                    // onPress={() => logout()}
                    onPress={() => {
                        bs.current.snapTo(0)

                    }}

                />
            </Animated.View>
        </View>
    );
};

export default Profile


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        // paddingVertical: 20,
        height: SIZES.height,
        backgroundColor: COLORS.white

    },
    myAccount: {
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        fontSize: 30,
        marginVertical: 25
    },
    userDetails: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // height: 110,
        height:SIZES.height*0.15,
        width: "100%",
        // borderWidth:0.5,
        backgroundColor: 'white',
        // borderColor:"red",
        borderRadius: 15,
        paddingHorizontal: 20,
        marginVertical: 20,
        elevation: 2,
        shadowColor:"black",
        shadowOpacity: 0.15,
        shadowOffset: {
            width: 0,
            height: 0

        }
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    fullNameContainer: {
        width: SIZES.width * 0.6,
        // backgroundColor:"cyan",
        height: 50,
        justifyContent: "space-between",

    },
    fullName: {
        fontFamily: "Nexa-Bold",
        fontSize: 18,
        color: COLORS.black

    },

    editProfile: {
        fontFamily: "Nexa-Book",
        color: COLORS.primary,
        fontSize: 16

    }
})
