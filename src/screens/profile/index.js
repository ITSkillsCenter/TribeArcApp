// @flow
import React, {useContext, useRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BackButton from "../../components/BackButton";
import {COLORS, icons, SIZES} from "../../constants";
import {UserContext} from "../../context/UserContext";
import AccountOptions from "../../components/AccountOptions";
import {AuthContext} from "../../context/AuthContext";
import CustomButton from "../../components/CustomButton";
import {Modalize} from "react-native-modalize";


const Profile = ({navigation, route}) => {

    const name=route.params;

    console.log(name)

    const modalizeRef = useRef<Modalize>(null);

    const OpenModal = () => {
        modalizeRef.current?.open();
    };

    const CloseModal = () => {
        modalizeRef.current?.close();
    };


    const {logout} = useContext(AuthContext)
    const user = useContext(UserContext)


    const renderHeader = () => (

        <View style={{
            padding: 20,
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            width: SIZES.width,

        }}>

            <TouchableOpacity onPress={() => CloseModal()}>
                <Text style={{
                    alignSelf: "flex-end",
                    color: "black",
                    fontFamily: "Nexa-Bold",
                    fontSize: 28,
                    right: 15
                }}>x</Text>

            </TouchableOpacity>

        </View>

    );


    const renderInner = () => (
        <View style={{
            paddingHorizontal: 20,
            height: 410,
            alignItems: "center"
        }}>

            <Text style={{fontSize: 20, color: COLORS.black, fontFamily: "Nexa-Bold"}}>Logout?</Text>
            <Text style={{fontSize: 16, color: "#999999", fontFamily: "Nexa-Book", marginVertical: 30}}>Are you sure you
                want to logout?</Text>

            <View style={{width: SIZES.width * 0.9, marginVertical: 10}}>
                <CustomButton
                    onPress={() => {
                        logout();
                    }}
                    filled
                    text={"Confirm"}/>

            </View>
        </View>
    );

    return (
        <View>


            <Modalize
                modalHeight={SIZES.height * 0.45}
                handleStyle={{backgroundColor: 'transparent'}}
                childrenStyle={{backgroundColor: COLORS.white, borderRadius: 55,}}
                ref={modalizeRef}>
                {renderHeader()}
                {renderInner()}
            </Modalize>

            <View style={styles.container}>

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
                        <Text style={styles.fullName}>{name?.firstname} {name?.lastname}</Text>

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
                    onPress={() => OpenModal()}

                />
            </View>
        </View>
    );
};

export default Profile


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
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
        height: SIZES.height * 0.15,
        width: "100%",
        // borderWidth:0.5,
        backgroundColor: 'white',
        // borderColor:"red",
        borderRadius: 15,
        paddingHorizontal: 20,
        marginVertical: 20,
        elevation: 2,
        shadowColor: "black",
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
