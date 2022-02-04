// @flow
import React, {useRef, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import Video from "react-native-video";
import vid from "../../assets/images/vid.mp4"
import CustomButton from "../../components/CustomButton";
import AsyncStorage from '@react-native-async-storage/async-storage';


const WelcomePage = ({navigation}) => {

    const videoPlayer = useRef();
    // const [viewedWelcome, setViewedWelcome] = useState(false)


    const WelcomeViewed = async () => {

        try {
            await AsyncStorage.setItem('@ViewedWelcome', "true")
            navigation.navigate("DashBoard")


        } catch (e) {
            console.log(e, " setItem Error : @ViewedWelcome")
        }
    }


    return (<SafeAreaView style={styles.container}>

        <View style={styles.container2}>

            <View style={styles.textBox}>
                <Text style={styles.text}>Welcome to</Text>
                <Image style={styles.img} resizeMode={"contain"} source={require("../../assets/images/logo.png")}/>
            </View>


            <Video
                ref={ref => (videoPlayer.current = ref)}
                playInBackground={false}
                // allowsExternalPlayback
                source={{uri: "https://youtu.be/jFGa2BBQXu0"}}
                resizeMode={"stretch"}// the video file
                paused={true}                  // make it start
                style={styles.backgroundVideo}  // any style you want
                // repeat={true}
                controls={true}// make it a loop
            />

            <View style={styles.buttonContainer}>
                <CustomButton
                    onPress={async () => {
                        await WelcomeViewed()
                        // CheckWelcomeViewed
                    }

                    }
                    filled
                    text={"Start Saving"}
                />
            </View>

        </View>


    </SafeAreaView>);
};


export default WelcomePage


const styles = StyleSheet.create({
    container: {
        flex: 1, height: SIZES.height, backgroundColor: 'white',


    },

    container2: {
        height: SIZES.height * 0.9, // backgroundColor: 'cyan',
        paddingHorizontal: 20,
    }, textBox: {
        height: SIZES.height * 0.13,
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 70, // padding:0,
        // backgroundColor: "cyan"

    }, text: {
        color: COLORS.black, fontSize: 18, fontFamily: "Nexa-Book", // fontWeight:"400"
    }, img: {
        width: 159, height: 30,

    }, backgroundVideo: {
        borderRadius: 15, // width:SIZES.width,
        height: SIZES.height * 0.3,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(243,240,240)", // top: 0,
        // bottom: 0,
        // left: 0,
        // right: 0,
    }, buttonContainer: {
        height: SIZES.height * 0.35, justifyContent: 'flex-end'
    }


})
