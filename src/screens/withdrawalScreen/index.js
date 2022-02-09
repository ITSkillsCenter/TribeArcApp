// @flow
import React, {useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import CustomTextInput from "../../components/CustomTextInput";
import SelectDropdown from "react-native-select-dropdown";
import CustomButton from "../../components/CustomButton";
import {Modalize} from "react-native-modalize";

const WithdrawalScreen = ({navigation}) => {


    const modalizeRef = useRef<Modalize>(null);

    const OpenModal = () => {
        modalizeRef.current?.open();
    };

    const CloseModal = () => {
        modalizeRef.current?.close();
    };


    const renderInner = () => (
        <View style={{
            backgroundColor: "#fff",
            paddingHorizontal: 20,
        }}>

            <Text style={styles.modalAutoCharge}>Withdrawal destination</Text>

            <CustomButton filled text={"Submit"}/>


        </View>
    );

    const renderHeader = () => (
        <View style={{
            padding: 20,
            // backgroundColor: "#fff",
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            width: SIZES.width,

        }}>

            <TouchableOpacity onPress={() => CloseModal()}>
                <Text style={{
                    alignSelf: "flex-end",
                    color: "black",
                    fontFamily: "Nexa-Book",
                    fontSize: 28,
                    right: 15
                }}>x</Text>

            </TouchableOpacity>

        </View>
    );


    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>


            <Modalize
                modalHeight={SIZES.height * 0.45}
                handleStyle={{backgroundColor: 'transparent'}}
                childrenStyle={{backgroundColor: COLORS.white, borderRadius: 55,}}
                ref={modalizeRef}>
                {renderHeader()}
                {renderInner()}
            </Modalize>


            <Text style={styles.withdraw}>Withdrawal</Text>
            <Text style={styles.withdrawDesc}>Withdrawal from Voluntary Account</Text>

            <View style={{marginTop: 40}}>


                <CustomTextInput placeholderText={"e.g 20,000"} title={"Amount to withdraw"}/>


                <Text style={styles.title}>Withdrawal Destination</Text>

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
                    defaultButtonText={"Select Account"}
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

                <CustomTextInput placeholderText={"Enter Password"} title={"Tribe arc password"}/>
            </View>

            <View style={{justifyContent: "flex-end", height: SIZES.height * 0.4}}>
                <CustomButton onPress={OpenModal} filled text={"Submit"}/>

            </View>


        </View>
    );
};

export default WithdrawalScreen

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

    },
})


