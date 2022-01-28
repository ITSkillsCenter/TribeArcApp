// @flow
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import LottieView from "lottie-react-native";
import CustomButton from "../../components/CustomButton";
import {handleQuery} from "../../graphql/requests";
import {UserContext} from "../../context/UserContext";

const SuccessScreen = ({navigation, route}) => {


    const [savings, setSavings] = useState("")


    useEffect(() => {
        Balance()



    }, [])

    const user = useContext(UserContext)

    const Balance = async () => {

        const qry = `query users {
        users(where:{id:${user.id}}){
            id
            saving
        }
    }`
        // con

        try {

            let res = await handleQuery(qry, user.token, false);
            // console.log(res.data.users[0], "REZZZXXXX");
            setSavings(res.data.users[0].saving)


        } catch (e) {
            console.log(e, "Error")

        }

    }




    return (
        <View style={styles.container}>

            <View style={styles.checkMark}>
                <LottieView source={require("../../assets/images/checkMark.json")}
                            autoPlay loop={false}
                            style={{width: 268, height: 263}}/>
            </View>

            <View style={styles.tsBox}>
                <Text style={styles.ts}>Transaction Successful!</Text>
            </View>
            <View style={styles.tsBox}>
                <Text style={styles.desc}>Dear User you have successfully saved ₦{savings.toLocaleString()} this Month</Text>
            </View>

            <View style={{marginVertical: 20}}>
                <CustomButton filled onPress={() => navigation.navigate("DashBoard")} text={"Ok"}/>
            </View>

        </View>
    );
};

export default SuccessScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20
    },
    checkMark: {
        alignItems: "center",
        paddingVertical: 40,
        marginTop: 30

    },
    tsBox: {
        alignItems: "center",
        marginVertical: 10
    },
    ts: {
        fontFamily: "Nexa-Bold",
        fontSize: 26,
        color: COLORS.black
    },
    desc: {
        fontSize: 18,
        fontFamily: "Nexa-Book",
        textAlign: 'center',
        color: "#999999",
        width: SIZES.width * 0.7,
        letterSpacing: 0.6
    }
})

