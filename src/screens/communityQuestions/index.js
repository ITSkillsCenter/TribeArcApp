// @flow
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import RNPoll, {IChoice} from "react-native-poll";
import RNAnimated from "react-native-animated-component";
import {handleQuery} from "../../graphql/requests";
import {UserContext} from "../../context/UserContext";


// const questions = [
//
//     {
//         id: 1,
//         question: "Should the investments be limited to businesses within the continent?",
//         totalVotes: "25",
//         answers: [
//             {id: 1, choice: "Yes", votes: 9},
//             {id: 2, choice: "No", votes: 10},
//             {id: 3, choice: "Maybe", votes: 10},
//         ]
//
//     },
//     {
//         id: 2,
//         question: "Where should we hold our annual conference?",
//         totalVotes: "15",
//         answers: [
//             {id: 1, choice: "Lagos", votes: 10},
//             {id: 2, choice: "Abuja", votes: 9},
//             {id: 3, choice: "Kano", votes: 10},
//         ]
//     },
//     {
//         id: 3,
//         question: "Should the investments meetings be scheduled to Sundays only?",
//         totalVotes: "75",
//         answers: [
//             {id: 1, choice: "Yes", votes: 10},
//             {id: 2, choice: "No", votes: 9},
//             {id: 3, choice: "Maybe", votes: 10},
//         ]
//
//     },
//
// ]


const CommunityQuestions = ({navigation}) => {

    const user = useContext(UserContext)

    const [questions, setQuestions] = useState([])
    const [isSelected, setIsSelected] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    // const[answers, setAnswers]=useState([])

    useEffect(() => {

        GetQuestion()

    }, [])


    const GetQuestion = async () => {


        let getPolls = `query {
                polls(where: { users_id: ${user.id} }) {
                id
                question_id {
                    id
                    }
                }
            }`


        let qry = `query{
            questions(where:{ community_id:15}){
            id
            question
            answers{
            id
            choice
            votes
                }
              }
            }`
        try {

            setIsLoading(true)

            let response = await handleQuery(getPolls, user.token, false)

            // console.log(response.data.polls, "REZZZZZ")


            const arr = response.data.polls.map((item) => {
                return item.question_id.id
            })

            console.log(arr)

            let res = await handleQuery(qry, user.token, false)


            const UnansweredQuestions = await res.data.questions.filter(item => !arr.includes(item.id))
            console.log(UnansweredQuestions, "UNANSS")


            // console.log(res.data.questions)
            await setQuestions(UnansweredQuestions)
            // await setAnswers(res.data.questions)
            await setIsLoading(false)
            // console.log(res.data.questions[0].answers)
            // const arr = await res.data.questions[0].answers.map((item) => {
            //     return Number(item.votes)
            // })

            // console.log(arr)


        } catch (e) {
            console.log(e, "QuestionsError")
            await setIsLoading(false)

        }


    }


    const HandlePolls = async (question_id, answer_id, votes) => {


        let updateVotes = `mutation {
                            updateAnswer(input: { where: { id: ${answer_id} }, data: { votes: ${votes} } }) {
                            answer {
                                id
                                choice
                                votes
                                    }
                                  }
                                }`

        let createPoll = `mutation {
                    createPoll(
                    input: {
                    data: { users_id: ${user.id}, question_id: ${question_id}, answer_id: ${answer_id} , community_id: 15 }
                            }
                            ) {
                           poll {
                                id
                                question_id {
                                    id
                                    question
                                }
                                answer_id {
                                    votes
                                    choice
                                    id
                                }
                              }
                            }
                          }`

        // console.log(createPoll, updateVotes)

        try {

            await handleQuery(updateVotes, user.token, false)
            await handleQuery(createPoll, user.token, false)


        } catch (e) {
            console.log(e, "handlePollError")
        }


    }


    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>
            <Text style={styles.CommQues}>Community Polls</Text>

            <ScrollView showsVerticalScrollIndicator={false}>

                {isLoading && <ActivityIndicator size={"large"} color={COLORS.primary}/>}

                {questions.map((item, index) => (


                    <View key={index} style={{marginBottom: 40}}>


                        {/*{console.log(item.answers)}*/}

                        <Text style={styles.question}>Question {item.id}</Text>
                        <Text style={styles.mainQuestions}>{item.question}</Text>

                        <RNPoll
                            appearFrom="left"
                            animationDuration={350}
                            totalVotes={100}
                            choices={item.answers}
                            // hasBeenVoted={voted}
                            // style={{backgroundColor: "cyan", marginTop:0, paddingTop:0, top:0}}
                            fillBackgroundColor={"#F5F5FF"}
                            percentageTextStyle={{fontFamily: "Nexa-Book", fontSize: 20}}
                            choiceTextStyle={{fontFamily: "Nexa-Book", fontSize: 20}}
                            // pollContainerStyle={{ backgroundColor: "red"}}
                            checkMarkImageStyle={{right: 180, tintColor: COLORS.primary, width: 25, height: 25}}
                            checkMarkIconImageSource={require("../../assets/icons/blueCheck.png")}
                            PollContainer={RNAnimated}
                            PollItemContainer={RNAnimated}
                            onChoicePress={async (selectedChoice: IChoice) => {
                                // console.log("SelectedChoice: ", selectedChoice.votes)
                                let question_id = item.id
                                let answer_id = selectedChoice.id
                                let votes = selectedChoice.votes

                                await HandlePolls(question_id, answer_id, votes)

                            }}
                        />
                        {/*{console.log(item.answers.map((item) => {*/}
                        {/*    return Number(item.votes)*/}
                        {/*}).reduce((a, b) => a + b, 0))}*/}
                        <Text style={styles.totalVotes}>Total Votes: {item.answers.map((item) => {
                            return Number(item.votes)
                        }).reduce((a, b) => a + b, 0)}</Text>

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
