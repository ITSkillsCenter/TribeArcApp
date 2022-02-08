// @flow
import React from 'react';
import {FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";


const investments = [
    {
        "title": "Cocoa Investment",
        "active": true,
        "investment_price": 100000,
        "total_investment": 200,
        "duration": 12,
        "roi": 15,
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg"

    },
    {
        "title": "Cassava Investment",
        "active": false,
        "investment_price": 170000,
        "total_investment": 240,
        "duration": 16,
        "roi": 15,
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg"
    },
    {
        "title": "Real Estate Investment",
        "active": false,
        "investment_price": 120000,
        "total_investment": 140,
        "duration": 6,
        "roi": 15,
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg"
    }

]


const InvestmentMainScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>

            <Text style={styles.inv}>My Investment</Text>
            <ImageBackground source={icons.balFrame} style={styles.balanceFrame}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    paddingHorizontal: 40,
                    alignItems: 'center'
                }}>
                    <View>
                        <Text style={styles.tsb}>Investment Balance</Text>
                        <Text style={styles.balance}>₦ {}</Text>
                    </View>

                </View>
            </ImageBackground>

            <Text style={styles.allInv}>All Investments</Text>


            <FlatList
                data={investments}
                renderItem={({item}) => (

                    <View style={styles.box}>
                        <Image source={{uri: item.image}} style={{width: 120, height: 120}}/>
                        <View>
                            <Text>{item.title}</Text>
                            <Text> <Text>{item.roi}% </Text> return in {item.duration} months</Text>
                            <View>
                                <Text>₦{item.investment_price.toLocaleString()}</Text>
                                <Text>Per Slot</Text>
                            </View>
                        </View>
                        <View>

                        </View>

                    </View>


                )}/>


        </View>
    );
};

export default InvestmentMainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20
    },
    inv: {
        color: COLORS.primary,
        fontSize: 24,
        marginVertical: 10,
        fontFamily: "Nexa-Bold"
    },
    balanceFrame: {
        borderRadius: 15, // padding: 20,
        height: 200,
        width: SIZES.width,
        alignSelf: "center",
        justifyContent: "center", // alignItems: 'center'
    },
    saveFrame: {
        backgroundColor: '#EFF2FF',
        height: 120,
        width: SIZES.width * 0.9,
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 20
    },
    tsb: {
        color: COLORS.white,
        fontFamily: "Nexa-Bold",
        marginVertical: 20
    },
    balance: {
        color: COLORS.white,
        fontFamily: "Nexa-Bold",
        fontSize: 24
    },
    allInv: {
        color: COLORS.black,
        fontSize: 18,
        fontFamily: "Nexa-Bold",
        marginVertical: 10
    },
    box: {
        marginVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between"

    }
})
