// @flow
import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import CustomInputBox from "../../components/CustomInputBox";
import Toast from "react-native-toast-message";
import Clipboard from '@react-native-clipboard/clipboard';
import {UserContext} from "../../context/UserContext";
import {handleQuery} from "../../graphql/requests";


const ReferralPage = ({navigation}) => {


    const user = useContext(UserContext)

    const [code, setCode] = useState("")
    const [referral, setReferral] = useState(`${code}`)

    // const [copiedText, setCopiedText] = useState('');

    const copyToClipboard = async () => {
        await Clipboard.setString(code);
        await Toast.show({
            type: 'success',
            text1: code,
            text2: 'Copied to clipboard'
        });
    };


    useEffect(() => {

        GetCode()

    }, [])


    const GetCode = async () => {

        let qry = `query{
            users(where:{id:${user.id}}){
                    id
                    referral_code
                        }
                    }`


        console.log(qry)


        try {

            let res = await handleQuery(qry, user.token, false)

            console.log(res.data.users[0].referral_code)
            await setCode(res.data.users[0].referral_code)


        } catch (e) {
            console.log(e, "getCodeErr")
        }
    }

    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>


            <Image style={styles.img} source={icons.referralImg} resizeMode={"contain"}/>
            <Text style={styles.refer}>Refer a friend</Text>
            <Text style={styles.secureFutureText}>To Secure their future too</Text>


            <CustomInputBox
                clipboardOnPress={() => copyToClipboard()}
                clipboard
                // short
                initialValue={code}
                placeholderText={"Referral link"}
                inputContainerStyle={{width: SIZES.width * 0.8, textAlign: "left", fontFamily: "Nexa-Bold"}}
                props={{
                    editable: false,
                }}
            />


        </View>
    );
};

export default ReferralPage


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20

    }, img: {
        width: SIZES.width * 0.8,
        height: SIZES.width * 0.8,
        alignSelf: "center",
        // backgroundColor: "red",
        marginVertical: SIZES.height * 0.08
    },
    refer: {
        fontSize: 28,
        alignSelf: "center",
        fontFamily: "Nexa-Bold",
        color: COLORS.black
    },
    secureFutureText: {
        fontSize: 20,
        alignSelf: "center",
        fontFamily: "Nexa-Book",
        color: "#999999",
        marginVertical: 15
    }

})
