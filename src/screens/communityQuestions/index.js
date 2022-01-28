// @flow
import React from 'react';
import {Text, ScrollView, View, StyleSheet} from "react-native";
import {COLORS, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import RNPoll from "react-native-poll";
import {IChoice} from "react-native-poll";
import RNAnimated from "react-native-animated-component";


const choices = [
    {id: 1, choice: "Yes", votes: 1},
    {id: 2, choice: "No", votes: 1},
    {id: 3, choice: "Maybe", votes: 1},
    // {id: 4, choice: "Reebok", votes: 5},
    // {id: 5, choice: "Under Armour", votes: 9},
];

const questions = [

        {
            id: 1,
            question: "Should the investments be limited to businesses within the continent?",
            totalVotes: "25",
            answers: [
                {id: 1, choice: "Yes", votes: 9},
                {id: 2, choice: "No", votes: 10},
                {id: 3, choice: "Maybe", votes: 10},
            ]

        },
        {
            id: 2,
            question: "Where should we hold our annual conference?",
            totalVotes: "15",
            answers: [
                {id: 1, choice: "Lagos", votes: 10},
                {id: 2, choice: "Abuja", votes: 9},
                {id: 3, choice: "Kano", votes: 10},
            ]
        },
        {
            id: 3,
            question: "Should the investments meetings be scheduled to Sundays only?",
            totalVotes: "75",
            answers: [
                {id: 1, choice: "Yes", votes: 10},
                {id: 2, choice: "No", votes: 9},
                {id: 3, choice: "Maybe", votes: 10},
            ]

        },

    ]
;

const CommunityQuestions = ({navigation}) => {
    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>
            <Text style={styles.CommQues}>Community Questions</Text>

            <ScrollView showsVerticalScrollIndicator={false}>

                {questions.map((item, index) => (

                    <View key={item.id} style={{marginBottom: 40}}>

                        <Text style={styles.question}>Question {item.id}</Text>
                        <Text style={styles.mainQuestions}>{item.question}</Text>

                        <RNPoll
                            appearFrom="left"
                            animationDuration={750}
                            totalVotes={30}
                            choices={item.answers}
                            // hasBeenVoted={true}
                            // style={{backgroundColor: "cyan", marginTop:0, paddingTop:0, top:0}}
                            fillBackgroundColor={"#F5F5FF"}
                            percentageTextStyle={{fontFamily: "Nexa-Book", fontSize: 20}}
                            choiceTextStyle={{fontFamily: "Nexa-Book", fontSize: 20}}
                            // pollContainerStyle={{ backgroundColor: "red"}}
                            checkMarkImageStyle={{right: 180, tintColor: COLORS.primary, width: 25, height: 25}}
                            checkMarkIconImageSource={require("../../assets/icons/blueCheck.png")}
                            PollContainer={RNAnimated}
                            PollItemContainer={RNAnimated}
                            onChoicePress={(selectedChoice: IChoice) =>
                                console.log("SelectedChoice: ", selectedChoice)
                            }
                        />

                        <Text style={styles.totalVotes}>Total Votes: {item.totalVotes}</Text>

                    </View>


                ))}


            </ScrollView>
        </View>


    );
};

export default CommunityQuestions;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 20,
        // paddingVertical: 20,
        height: SIZES.height,
        backgroundColor: COLORS.white
    },
    CommQues: {
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        fontSize: 30,
        marginVertical: 25

    },
    question: {
        color: COLORS.primary,
        fontSize: 16,
        marginVertical: 10,
        fontFamily: "Nexa-Book"
    },
    mainQuestions: {
        color: COLORS.black,
        fontSize: 18,
        // marginVertical:10,
        fontFamily: "Nexa-Book"
    },
    totalVotes: {
        alignSelf: "flex-end",
        fontFamily: "Nexa-Book",
        marginTop: 20,
        fontSize: 18,
        color: COLORS.black

    }


});
