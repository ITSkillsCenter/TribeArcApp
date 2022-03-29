// @flow
import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import NotchResponsive from "../../components/NotchResponsive";
import {COLORS} from "../../constants";
import BackButton from "../../components/BackButton";

const Notification = ({navigation}) => {
    return (
        <>
            <NotchResponsive color={COLORS.white}/>

            <View style={styles.container}>
                <BackButton onPress={() => navigation.pop()}/>
                <Text style={styles.header}>Notifications</Text>


            </View>

        </>
    );
};

export default Notification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20
    },

    header: {
        fontSize: 26,
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        marginVertical: 10
    },
})
