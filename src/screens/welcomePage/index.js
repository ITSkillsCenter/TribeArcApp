// @flow
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import vid from "../../assets/images/vid.mp4"
import CustomButton from "../../components/CustomButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoPlayer from "react-native-video-player";
import {handleQuery} from "../../graphql/requests";
import {UserContext} from "../../context/UserContext";


const WelcomePage = ({navigation}) => {

    const videoPlayer = useRef();
    // const [viewedWelcome, setViewedWelcome] = useState(false)
    const user = useContext(UserContext)

    const [video, setVideo] = useState("")
    const [text, setText] = useState("")


    useEffect(() => {

        WelcomeTextAndVid()

    }, [])


    const WelcomeViewed = async () => {

        try {
            await AsyncStorage.setItem('@ViewedWelcome', "true")
            navigation.navigate("BottomTabs")


        } catch (e) {
            console.log(e, " setItem Error : @ViewedWelcome")
        }
    }


    const WelcomeTextAndVid = async () => {

        let qry = `query {
  communities(where: { id: 15 }) {
    welcome_text
     welcome_video
  }
}`


        try {

            const qryRes = await handleQuery(qry, user.token, false)

            // console.log(qryRes.data.communities[0])
            await setVideo(qryRes.data.communities[0].welcome_video)

            if (qryRes.data.communities[0].welcome_text) {
                await setText(qryRes.data.communities[0].welcome_text)
            }


        } catch (e) {
            console.log(e, "WelcomeTextERR")
        }


    }


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.container2}>

                <View style={styles.textBox}>
                    <Text style={styles.text}>Welcome to</Text>
                    <Image style={styles.img} resizeMode={"contain"} source={require("../../assets/images/logo.png")}/>
                </View>


                {/*<Video*/}
                {/*    ref={ref => (videoPlayer.current = ref)}*/}
                {/*    playInBackground={false}*/}
                {/*    // allowsExternalPlayback*/}
                {/*    source={{uri: "https://youtu.be/jFGa2BBQXu0"}}*/}
                {/*    resizeMode={"stretch"}// the video file*/}
                {/*    paused={true}                  // make it start*/}
                {/*    style={styles.backgroundVideo}  // any style you want*/}
                {/*    // repeat={true}*/}
                {/*    controls={true}// make it a loop*/}
                {/*/>*/}

                <VideoPlayer
                    video={{uri: video}}
                    videoWidth={1600}
                    videoHeight={900}
                    autoplay
                    disableFullscreen
                    style={styles.backgroundVideo}
                    // customStyles={styles.backgroundVideo}
                    thumbnail={require("../../assets/images/imgPlcholder.png")}
                />


                <Text style={styles.textWlc}>{text}</Text>


            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    onPress={async () => {
                        await WelcomeViewed()
                        // CheckWelcomeViewed
                    }}
                    filled
                    text={"Start Saving"}
                />
            </View>


        </SafeAreaView>);
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
        // backgroundColor: 'cyan',
        // paddingHorizontal: 20,
    },
    textBox: {
        height: SIZES.height * 0.13,
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 30, // padding:0,
        // backgroundColor: "cyan"

    }, text: {
        color: COLORS.black,
        fontSize: 18,
        fontFamily: "Nexa-Book", // fontWeight:"400"
    }, img: {
        width: 159, height: 30,
    }, backgroundVideo: {
        borderRadius: 15, // width:SIZES.width,
        height: SIZES.height * 0.28,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(160,155,155,0.42)", // top: 0,

    }, buttonContainer: {
        flex: 2,
        justifyContent: 'flex-end'
    },
    textWlc: {
        alignSelf: "center",
        marginTop: 80,
        color: COLORS.primary,
        fontSize: 22,
        fontFamily: "Nexa-Bold"

    }


})
