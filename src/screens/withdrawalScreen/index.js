// @flow
import React, {useRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
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


            <View style={styles.addAcctBox}>
                <Image style={{width: 30, height: 30}} source={icons.plusIconWhite}/>
                <Text style={styles.addAcct}>Add New Account</Text>
            </View>

            <View style={styles.addAcctBox2}>

                <View style={{justifyContent: "space-between", height: 50}}>
                    <Text style={{color: COLORS.black, fontSize: 18, fontFamily: "Nexa-Bold"}}>Andron James</Text>

                    <View style={{flexDirection: "row", width: "70%", justifyContent: "space-between"}}>
                        <Text style={{color: COLORS.black, fontSize: 14, fontFamily: "Nexa-Book"}}>Access Bank</Text>
                        <Text style={{color: COLORS.black, fontSize: 14, fontFamily: "Nexa-Book"}}>089675435</Text>

                    </View>

                </View>

                <Image source={icons.smallCheck} style={{width: 30, height: 30}}/>


            </View>


            <CustomButton onPress={() => {
                // navigation.navigate("WithdrawalSuccessScreen")
            }} filled text={"Submit"}/>


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
                modalHeight={SIZES.height * 0.5}
                handleStyle={{backgroundColor: 'transparent'}}
                childrenStyle={{backgroundColor: COLORS.white, borderRadius: 55,}}
                ref={modalizeRef}>
                {renderHeader()}
                {renderInner()}
            </Modalize>


            <Text style={styles.withdraw}>Withdrawal</Text>
            <Text style={styles.withdrawDesc}>Withdrawal from Voluntary Account</Text>

            <View style={{marginTop: 30}}>


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

            <View style={{flex:2, justifyContent: "flex-end"}}>
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
        fontSize: SIZES.width * 0.05,
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


