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
import NotchResponsive from "../../components/NotchResponsive";
import {FONTS} from "../../constants/theme";


const ReferralPage = ({navigation}) => {


    const user = useContext(UserContext)

    const [code, setCode] = useState("")
    const [referral, setReferral] = useState(`${code}`)

    // const [copiedText, setCopiedText] = useState('');

    const copyToClipboard = async () => {
        await Clipboard.setString(`Join the moving train with TribeArc business community. Use my referral code- ${code}`);
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


        // console.log(qry)


        try {

            let res = await handleQuery(qry, user.token, false)

            // console.log(res.data.users[0].referral_code)
            await setCode(res.data.users[0].referral_code)


        } catch (e) {
            console.log(e, "getCodeErr")
        }
    }

    return (
        <>
            <NotchResponsive color={COLORS.white}/>
            <View style={styles.container}>
                <BackButton onPress={() => navigation.goBack()}/>


                <Image style={styles.img} source={icons.referralImg} resizeMode={"contain"}/>
                <Text style={styles.refer}>Refer a friend</Text>
                <Text style={styles.secureFutureText}>To Secure their future too</Text>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: SIZES.font1,
                    marginBottom: 10
                }}>
                    <Text style={{...FONTS.body9, color: COLORS.black}}>Copy Referral
                        Message</Text>

                    <View style={{alignItems: "center", flexDirection: "row", justifyContent: "center"}}>
                        <Image style={{width: SIZES.font3, height: SIZES.font3}}
                               source={icons.clipboard}/>
                        <Text
                            onPress={() => copyToClipboard()}
                            style={{
                                ...FONTS.body10,
                                alignItems: "center",
                                justifyContent: "center",
                                color: COLORS.primary
                            }}>Copy</Text>

                    </View>

                </View>

                <View style={styles.box}>
                    <Text style={styles.desc}>Join the moving train with TribeArc business community. Use my referral
                        code- {code}</Text>
                </View>

            </View>
        </>
    );
};

export default ReferralPage


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        height: SIZES.height,


    }, img: {
        width: SIZES.width * 0.7,
        height: SIZES.width * 0.7,
        alignSelf: "center",
        // backgroundColor: "red",
        marginVertical: SIZES.height * 0.05
    },
    refer: {
       ...FONTS.h5,
        alignSelf: "center",
        color: COLORS.black
    },
    secureFutureText: {
        ...FONTS.body8,
        alignSelf: "center",
        color: "#999999",
        marginVertical: 15
    },
    box: {

        padding: 20,
        borderWidth: 0.5,
        borderColor: COLORS.primary,
        borderRadius: 10,
    },
    desc: {
        ...FONTS.body8,
        alignSelf: "center",
        color: COLORS.black
    }

})
