// @flow
import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import NotchResponsive from "../../components/NotchResponsive";
import {COLORS, icons, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import {FONTS} from "../../constants/theme";

const Notification = ({navigation}) => {
    return (
        <>
            <NotchResponsive color={COLORS.white}/>

            <View style={styles.container}>
                <BackButton onPress={() => navigation.pop()}/>
                <Text style={styles.header}>Notifications</Text>


                <View style={{flex:0.3, justifyContent:"flex-end", alignItems:"center"}}>
                    <Image source={icons.notifiBell} style={styles.bell} resizeMode={"contain"}/>

                    <Text style={styles.notificationHead}>No Notification Available</Text>
                    <Text style={styles.notificationBody}>You do not have a notification yet</Text>

                </View>


            </View>

        </>
    );
};

export default Notification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
    },

    header: {
        fontSize: 26,
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        marginVertical: 10
    },

    bell: {
        width: SIZES.font1*3,
        height: SIZES.font1*3,
        alignSelf:"center"
    },
    notificationHead: {
        ...FONTS.h5,
        marginTop:SIZES.font7
    },
    notificationBody: {
        ...FONTS.body9,
        marginTop:SIZES.font10
    }
})
