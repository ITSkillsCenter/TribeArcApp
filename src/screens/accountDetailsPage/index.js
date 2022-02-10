// @flow
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "../../constants";
import BackButton from "../../components/BackButton";

export const AccountDetailsPage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>
            <Text style={styles.acctDet}>Account Details</Text>

            <View style={styles.addAcctBox}>

                <View style={{justifyContent: "space-between", height: 50}}>
                    <Text style={{color: COLORS.black, fontSize: 18, fontFamily: "Nexa-Bold"}}>Andron James</Text>
                    <View style={{flexDirection: "row", width: "70%", justifyContent: "space-between"}}>
                        <Text style={{color: COLORS.black, fontSize: 14, fontFamily: "Nexa-Book"}}>Access Bank</Text>
                        <Text style={{color: COLORS.black, fontSize: 14, fontFamily: "Nexa-Book"}}>089675435</Text>
                    </View>
                </View>

            </View>
            <TouchableOpacity onPress={()=>navigation.navigate("AddAccountDetailsScreen")} style={styles.addAcctButton}>
                <Text style={styles.addAcctText}>Add New Account</Text>
            </TouchableOpacity>


        </View>
    );
};

export default AccountDetailsPage

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white
    },
    acctDet: {
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        fontSize: 30,
        marginVertical: 25
    },
    addAcctBox: {
        flexDirection: "row",
        alignItems: "center",
        height: 100,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        padding: 20,
        marginVertical: 5,
        justifyContent: "space-between",
        shadowOpacity: 0.08,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0
        }

    },
    addAcctButton: {
        alignItems: "center",
        justifyContent: "center",
        height: 70,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#C4C4C4",
        marginVertical: 40,
        borderStyle: "dashed",


    },
    addAcctText: {
        color: COLORS.black,
        fontFamily: "Nexa-Book",
        fontSize: 14
    }

})
