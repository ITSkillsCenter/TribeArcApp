// @flow
import React, {useState} from 'react';
import {Image, Linking, StyleSheet, Text, TextInput, View} from "react-native";
import BackButton from "../../components/BackButton";
import {COLORS, icons, SIZES} from "../../constants";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import CustomButton from "../../components/CustomButton";


const AddBvn = ({navigation}) => {

    const [bvn, setBvn] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>
            <Text style={styles.addBVN}>Add BVN</Text>

            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>



                <View style={styles.addBVNContainer}>
                    <Image source={icons.addBvn} style={styles.image}/>
                    <Text style={styles.text}>Your BVN is safe with us</Text>
                    <Text style={styles.link} onPress={() => Linking.openURL("https://tribearc.com")}>Learn more</Text>
                </View>

                <TextInput
                    placeholder={"Enter BVN"}
                    value={bvn}
                    onChangeText={value => setBvn(value)}
                    style={styles.textInput}
                    keyboardType={"numeric"}
                    maxLength={10}
                />


                <Text style={styles.dontKnow}>Don't know your BVN? <Text onPress={() => Linking.openURL("tel:*565*0#")}
                                                                         style={styles.dial}> Dial *565*0#</Text></Text>

                <View style={{flex: 2, height:SIZES.height*0.6, justifyContent: "flex-end"}}>
                    <CustomButton onPress={() => navigation.navigate("DashBoard")} loading={isLoading} filled
                                  text={"Validate BVN"}/>
                </View>


            </KeyboardAwareScrollView>
        </View>

    );
};

export default AddBvn


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20, height: SIZES.height, backgroundColor: COLORS.white

    }, addBVN: {
        color: COLORS.primary, fontFamily: "Nexa-Bold", fontSize: 30, marginVertical: 25
    }, addBVNContainer: {

        flexDirection: 'row',
        width: "100%",
        height: 60,
        borderWidth: 0.3,
        borderRadius: 5,
        borderColor: COLORS.secondary,
        alignItems: "center",
        paddingHorizontal: 20,
        marginVertical: 15
    },
    image: {
        width: 40, height: 40
    },
    text: {
        fontSize: 14,
        fontFamily: "Nexa-Book",
        color: COLORS.black, // backgroundColor:"cyan",
        width: '70%',
        paddingHorizontal: 10
    },
    link: {
        color: COLORS.secondary,
        fontFamily: "Nexa-Book",
        fontSize: 12
    },
    textInput: {
        borderColor: "#cbc8c8",
        borderWidth: 0.3,
        height: 45,
        borderRadius: 5,
        marginVertical: 20,
        paddingHorizontal: 20
    },
    dial: {
        color: COLORS.primary,
        fontFamily: "Nexa-Book",
        fontSize: 12,
    },
    dontKnow: {
        color: COLORS.black,
        fontFamily: "Nexa-Book",
        fontSize: 14
    }
})
