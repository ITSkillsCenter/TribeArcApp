// @flow
import React from 'react';
import {FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";


const CardSettings = ({navigation}) => {
    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>


            <Text style={styles.inv}>Card Settings</Text>
            <ImageBackground source={icons.shortBalFrame} style={styles.balanceFrame}>
                <View style={{
                    // flexDirection: "row",
                    // justifyContent: 'space-between',
                    paddingHorizontal: 40,
                    // alignItems: 'center'
                }}>

                    <View>
                        <Text style={styles.tsb}>**** **** **** 5675</Text>
                        <Text style={styles.cardType}>MasterCard 12/24</Text>
                    </View>

                </View>
            </ImageBackground>

            <View style={{flex: 2, justifyContent: "flex-end"}}>
                <CustomButton text={"Remove Card"}/>

            </View>


        </View>
    );
};

export default CardSettings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20
    },
    inv: {
        color: COLORS.primary,
        fontSize: 24,
        marginVertical: 10,
        fontFamily: "Nexa-Bold"
    },
    balanceFrame: {
        borderRadius: 15, // padding: 20,
        height: 200,
        width: SIZES.width,
        alignSelf: "center",
        justifyContent: "center", // alignItems: 'center'
    },
    saveFrame: {
        backgroundColor: '#EFF2FF',
        height: 120,
        width: SIZES.width * 0.9,
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 20
    },
    tsb: {
        fontSize: 18,
        color: COLORS.white,
        fontFamily: "Nexa-Bold",
        marginVertical: 20
    },
    cardType: {
        color: COLORS.white,
        fontFamily: "Nexa-Bold",
        fontSize: 18
    },
    allInv: {
        color: COLORS.black,
        fontSize: 18,
        fontFamily: "Nexa-Bold",
        marginVertical: 10
    },
    box: {
        marginVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between"

    },
    status1: {
        backgroundColor: "#85FCA647",
        height: 25,
        width: 75,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    status2: {
        backgroundColor: "#FFB16947",
        height: 25,
        width: 75,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"

    },
    active: {
        color: "#00711F",
        fontSize: 12,
        fontFamily: "Nexa-Bold"
    },
    ended: {
        color: "#EB996E",
        fontSize: 12,
        fontFamily: "Nexa-Bold"
    },
    title: {
        fontSize: 20,
        fontFamily: "Nexa-Book",
        lineHeight: 24,
        color: COLORS.black
    },
    duration: {
        color: COLORS.black,
        fontFamily: "Nexa-Book",
        marginVertical: 10
    },
    perSlot: {
        color: COLORS.black,
        fontFamily: "Nexa-Book",
        fontSize: 12,
        opacity: 0.6

    },
    amtInv: {
        color: COLORS.black,
        fontFamily: "Nexa-Bold",
        fontSize: 16


    }

})
