// @flow
import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import CustomTextInput from "../../components/CustomTextInput";
import SelectDropdown from "react-native-select-dropdown";
import CustomButton from "../../components/CustomButton";

const AddAccountDetailsScreen = ({navigation}) => {


    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>


            <Text style={styles.withdraw}>Account Details</Text>

            <View style={{marginTop: 30}}>

                <Text style={styles.title}>Bank Name</Text>

                <SelectDropdown
                    data={[]}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                        // setBankCode(selectedItem.code)

                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem.name
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item.name
                    }}
                    rowStyle={{width: "100%"}}
                    dropdownStyle={{width: "90%"}}
                    defaultButtonText={"Select Bank"}
                    buttonTextStyle={{
                        color: COLORS.black,
                        fontSize: 12,
                        opacity: 0.6,
                        fontFamily: "Nexa-Book",
                        justifyContent: "flex-start"
                    }}
                    buttonStyle={{
                        width: "100%",
                        backgroundColor: "#f5f5ff",
                        borderRadius: 5,
                    }}
                />
                <CustomTextInput placeholderText={"Enter Bank Account Number"} title={"Bank Account Number"}/>
                <CustomTextInput placeholderText={"Enter Bank Name"} title={"Bank Name"}/>
            </View>

            <View style={{justifyContent: "flex-end", height: SIZES.height * 0.4}}>
                <CustomButton onPress={()=> navigation.navigate("AccountDetailsSavedSuccess")} filled text={"Save"}/>

            </View>


        </View>
    );
};

export default AddAccountDetailsScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20
    },
    withdraw: {
        fontSize: 26,
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        marginVertical: 20
    },
    withdrawDesc: {
        fontSize: 16,
        fontFamily: "Nexa-Book",
        color: COLORS.black
    },
    title: {
        color: COLORS.black,
        fontSize: 14,
        marginBottom: 5,
        opacity: 0.6,
        fontFamily: "Nexa-Book"

    },
    modalAutoCharge: {
        fontSize: 20,
        fontFamily: "Nexa-Bold",
        color: COLORS.black,
        marginVertical: 10
    },
    modalAutoChargeDesc: {
        fontSize: 14,
        fontFamily: "Nexa-Book",
        color: COLORS.black,
        marginVertical: 10,
        opacity: 0.6,
        lineHeight: 24

    }, addAcctBox: {
        flexDirection: "row",
        alignItems: "center",
        height: 80,
        backgroundColor: "#FAFAFF",
        borderRadius: 15,
        padding: 20,
        marginVertical: 5
        // justifyContent:"space-between"
    },
    addAcct: {
        color: COLORS.black,
        opacity: 0.6,
        fontFamily: "Nexa-Book",
        paddingHorizontal: 20
    },
    addAcctBox2: {
        flexDirection: "row",
        alignItems: "center",
        height: 80,
        backgroundColor: "#FAFAFF",
        borderRadius: 15,
        padding: 20,
        marginVertical: 5,
        justifyContent: "space-between"

    }

})


