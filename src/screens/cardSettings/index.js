// @flow
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, ImageBackground, StyleSheet, Text, View} from "react-native";
import {COLORS, icons, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import {UserContext} from "../../context/UserContext";
import {handleQuery} from "../../graphql/requests";


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
    }
  }
}`

        try {
            setLoading(true)

            const cardRes = await handleQuery(qry, user.token, false)
            await setCards(cardRes.data.users[0].credit_cards)

            // console.log(cardRes.data.users[0].credit_cards, "REZZ")

            setLoading(false)


        } catch (e) {
            console.log(e, "GetAllCardsErr")
            setLoading(false)

        }

    }


    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>


            <Text style={styles.inv}>Card Settings</Text>

            {loading ? <ActivityIndicator size={"large"} color={COLORS.primary}/> :
                <FlatList
                    data={cards}
                    key={item => item.id}
                    style={{width: "100%", height: "70%"}}
                    showsVerticalScrollIndicator={false}
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
                                    <Text style={styles.tsb}>**** **** **** {item.authorization_payload.last4}</Text>
                                    <Text
                                        style={styles.cardType}>{item.authorization_payload.card_type} {item.authorization_payload.exp_month}/{item.authorization_payload.exp_year}</Text>
                                </View>

                            </View>
                        </ImageBackground>

                    )}

                />}


            <View style={{flex: 2, justifyContent: "flex-end"}}>
                <CustomButton filled text={"Remove Card"}/>

            </View>


        </View>
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
        color: COLORS.primary,
        fontSize: 24,
        marginVertical: 10,
        fontFamily: "Nexa-Bold"
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
        fontSize: 18,
        color: COLORS.white,
        fontFamily: "Nexa-Bold",
        marginVertical: 20
    },
    cardType: {
        color: COLORS.white,
        fontFamily: "Nexa-Bold",
        fontSize: 18
    },


})
