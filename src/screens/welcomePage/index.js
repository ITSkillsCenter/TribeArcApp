// @flow
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import vid from "../../assets/images/vid.mp4"
import CustomButton from "../../components/CustomButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoPlayer from "react-native-video-player";
import {handleQuery, handleQueryNoToken} from "../../graphql/requests";
import {UserContext} from "../../context/UserContext";
import NotchResponsive from "../../components/NotchResponsive";


const WelcomePage = ({navigation}) => {

    // const videoPlayer = useRef();

    const [video, setVideo] = useState("")
    const [text, setText] = useState("")


    useEffect(() => {

        WelcomeTextAndVid()

    }, [])


    //CHECK IF WELCOME SCREEN HAS BEEN VIEWED
    const WelcomeViewed = async () => {

        try {
            await AsyncStorage.setItem('@ViewedWelcome', "true")
            navigation.navigate("OnBoarding")
        } catch (e) {
            console.log(e, " setItem Error : @ViewedWelcome")
        }
    }


    //WELCOME TEXT FUNCTION
    const WelcomeTextAndVid = async () => {

        let qry = `query {
  welcomeMesssages {
    welcome_text
    welcome_video
  }
}

`
        try {
            const qryRes = await handleQueryNoToken(qry)
            // console.log(qryRes.data.welcomeMesssages[0].welcome_text)
            await setVideo(qryRes.data.welcomeMesssages[0].welcome_video)
            if (qryRes.data.welcomeMesssages[0].welcome_text) {
                await setText(qryRes.data.welcomeMesssages[0].welcome_text)
            }

        } catch (e) {
            console.log(e, "WelcomeTextERR")
        }
    }


    return (
        <>
            <NotchResponsive color={COLORS.white}/>
            <View style={styles.container}>

                {/*WELCOME TEXT*/}
                <View style={styles.container2}>
                    <View style={styles.textBox}>
                        <Text style={styles.text}>Welcome to</Text>
                        <Image style={styles.img} resizeMode={"contain"}
                               source={require("../../assets/images/logo.png")}/>
                    </View>

                    {/*VIDEO PLAYER*/}
                    <VideoPlayer
                        video={{uri: video}}
                        videoWidth={1600}
                        videoHeight={900}
                        autoplay
                        disableFullscreen
                        style={styles.backgroundVideo}
                    />
                    <Text style={styles.textWlc}>{text}</Text>
                </View>

                {/*CONTINUE BUTTON*/}
                <View style={styles.buttonContainer}>
                    <CustomButton
                        filled
                        text={"Continue"}
                        onPress={async () => {
                            await WelcomeViewed()
                        }}
                    />
                </View>
            </View>

        </>
    );
};

export default WelcomePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: SIZES.height,
        backgroundColor: 'white',
        paddingHorizontal: 20
    },
    container2: {
        height: SIZES.height * 0.8,
    },
    textBox: {
        height: SIZES.height * 0.13,
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 30,

    },
    text: {
        color: COLORS.black,
        fontSize: 18,
        fontFamily: "Nexa-Book",
    },
    img: {
        width: 159,
        height: 30,
    },
    backgroundVideo: {
        borderRadius: 15,
        height: SIZES.height * 0.28,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(160,155,155,0.42)",
    },
    buttonContainer: {
        flex: 2,
        justifyContent: 'flex-end'
    },
    textWlc: {
        alignSelf: "center",
        marginTop: 60,
        textAlign: "center",
        color: COLORS.primary,
        fontSize: 18,
        fontFamily: "Nexa-Book"
    }


})
