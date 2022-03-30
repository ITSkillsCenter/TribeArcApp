// @flow
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, ImageBackground, StyleSheet, Text, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import {UserContext} from "../../context/UserContext";
import {handleQuery} from "../../graphql/requests";
import LottieView from "lottie-react-native";
import NotchResponsive from "../../components/NotchResponsive";
import {FONTS} from "../../constants/theme";


const CardSettings = ({navigation}) => {

    const user = useContext(UserContext);

    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        GetAllCards()
    }, []);


    const GetAllCards = async () => {

        let qry = `query {
  users(where: { id: ${user.id} }) {
    credit_cards{
      authorization_payload
      id
    }
  }
}`

        try {
            setLoading(true)

            const cardRes = await handleQuery(qry, user.token, false)


            // console.log(cardRes.data.users[0].credit_cards[0].id, "REZZ")

            const arr = await cardRes.data.users[0].credit_cards.map((item) => {
                return item.authorization_payload
            })

            function getUniqueListBy(arr, key) {
                return [...new Map(arr.map(item => [item[key], item])).values()]
            }

            const singleCard = await getUniqueListBy(arr, 'bin')

            await setCards(singleCard)

            setLoading(false)

        } catch (e) {
            console.log(e, "GetAllCardsErr")
            setLoading(false)
        }

    }


    return (
        <>
            <NotchResponsive color={COLORS.white}/>
            <View style={styles.container}>
                <BackButton onPress={() => navigation.goBack()}/>

                <Text style={styles.inv}>Card Settings</Text>

                {loading ? <ActivityIndicator size={"large"} color={COLORS.primary}/> :
                    <FlatList
                        data={cards}
                        key={item => item.id}
                        style={{width: "100%", height: "70%"}}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <>
                                <View style={{alignItems: "center", justifyContent: "center",}}>

                                    <LottieView style={{width: SIZES.font1 * 5, height: SIZES.font1 * 5}}
                                                source={require("../../assets/images/emptyAnim.json")} autoPlay={true}/>
                                </View>

                                <Text style={styles.emptyDesc}> No investment available</Text>

                            </>
                        }
                        renderItem={({item}) => (

                            <ImageBackground resizeMode={"contain"} source={icons.shortBalFrame}
                                             style={styles.balanceFrame}>
                                <View style={{
                                    // flexDirection: "row",
                                    // justifyContent: 'space-between',
                                    paddingHorizontal: 40,
                                    // alignItems: 'center'
                                }}>
                                    <View>
                                        <Text style={styles.tsb}>**** **** **** {item.last4}</Text>
                                        <Text
                                            style={styles.cardType}>{item.card_type} {item.exp_month}/{item.exp_year}</Text>
                                    </View>

                                </View>
                            </ImageBackground>

                        )}

                    />}


                {/*<View style={{ justifyContent: "flex-end"}}>*/}
                {/*    <CustomButton filled text={"Remove Card"}/>*/}

                {/*</View>*/}


            </View>

        </>
    );
};

export default CardSettings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20
    },
    inv: {
        ...FONTS.h5,
        color: COLORS.primary,
        // fontSize: 24,
        marginVertical: 10,
        // fontFamily: "Nexa-Bold"
    },
    balanceFrame: {
        borderRadius: 15, // padding: 20,
        height: 140,
        width: "100%",
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
        ...FONTS.h8,
        color: COLORS.white,
        marginVertical: 20
    },
    cardType: {
        ...FONTS.h8,
        color: COLORS.white,
    },


})
