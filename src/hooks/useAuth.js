import React, {useEffect, useMemo, useReducer} from "react";
import {sleep} from "../utils/sleep";
import {createAction} from "../utils/createAction";
import {handleQuery, handleQueryNoToken} from "../graphql/requests";
import SecureStorage from "react-native-secure-storage";

export const useAuth = () => {

    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case "SET_USER":
                    return {
                        ...state,
                        loading: false,
                        user: {...action.payload},
                    };
                case "REMOVE_USER":
                    return {
                        ...state,
                        user: undefined,
                    };
                case "SET_LOADING":
                    return {
                        ...state,
                        loading: action.payload,
                    };
                default:
                    return state;
            }
        },
        {
            user: undefined,
            loading: true,
        },
    );


    const auth = useMemo(() => ({

            login: async (email, password) => {

                let qry = `mutation {
                login(input: { identifier: "${email}", password: "${password}" }) {
                 jwt
                 user{
                   username
                   id
                   confirmed
                   email
                   firstname
                   lastname
                        }
                            }
                                }`

                // console.log(qry)


                try {
                    let res = await handleQueryNoToken(qry);
                    // console.log(res.data, "QQQQQQ")


                    let queryCommunityId = `query{
                        users(where:{id:${res.data.login.user.id}}){
                                    id
                                    communities{
                                    id
                                        }
                                       }
                                      }`


                    let qryRes = await handleQuery(queryCommunityId, res.data.login.jwt, false)
                    // console.log(qryRes.data.users[0].communities, "DAtATATTATA")

                    const arr = qryRes.data.users[0].communities.map((item) => {
                        return Number(item.id)
                    })

                    arr.push(15)
                    let updateCommunities = `mutation {
                        updateUser(
                        input: { where: { id: ${res.data.login.user.id} },
                        data: { communities: [${arr}] }}
                        ) {
                        user {
                        id
                        communities {
                        id
                            }
                               }
                                  }
                                     }`

                    let newComm = await handleQuery(updateCommunities, res.data.login.jwt, false)


                    let qrySavingsAcc = `query {
                            users(where: { id: ${res.data.login.user.id} }) {
                            id
                            email
                            saving_account {
                            id
                                    }
                                 }
                               }`

                    let qrySavingsRes = await handleQuery(qrySavingsAcc, res.data.login.jwt, false)

                    const savingAcctCheck = await qrySavingsRes.data.users[0].saving_account

                    if (!savingAcctCheck) {

                        let createSavingAcct = `mutation {
                                                createSavingAccount(input: {
                                                data: { amount_saved: 0.0, user_id: ${res.data.login.user.id}, community_id: 15 } }) {
                                                savingAccount {
                                                id
                                                    }
                                                  }
                                               }`

                        let createSavingAcctRes = await handleQuery(createSavingAcct, res.data.login.jwt, false)

                    }

                    // console.log(qrySavingsRes.data.users[0].saving_account, "REZXXX")

                    const user = {
                        token: res.data.login.jwt,
                        id: res.data.login.user.id,
                        email: res.data.login.user.email,
                        // avatar: res.data.login.user.avatar

                    };

                    await SecureStorage.setItem("user", JSON.stringify(user));
                    dispatch(createAction("SET_USER", user));

                } catch (e) {
                    console.log(e, "error @login")
                }
            },


            register: async (email, password) => {


                function randomString(length, chars) {
                    let result = '';
                    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
                    return result;
                }

                const rString = randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

                console.log(rString)


                let qry = `mutation {
                                register(
                                    input: {
                                    email: "${email}"
                                    username: "${email}"
                                    password: "${password}"
                                         }
                                     ) {
                                  jwt
                                  user {
                                  id
                                   email
                                   username
                                   confirmed
                                    }
                                      }
                                       }`


                try {
                    let res = await handleQueryNoToken(qry);

                    let otpQuery = `
                                mutation{
                                    sendOtp(email:"${email}"){
                                        ok
                                            }
                                                }`


                    let otpQryRes = await handleQueryNoToken(otpQuery);
                    // console.log(otpVerify, " VERIFYYYY")


                    // let updateComm = `mutation {
                    //                 updateUser(input: { where: { id: ${res.data.register.user.id} },
                    //                 data: { communities: 15 } }) {
                    //                 user {
                    //                 id
                    //                 communities {
                    //                             id
                    //                                 }
                    //                                  }
                    //                             }
                    //                           }`


                    // let addToComm = await handleQuery(updateComm, res.data.register.jwt, false)
                    // console.log(addToComm.data, "ADDED to COMM")


                } catch (e) {
                    console.log(e, "error @login")

                }


            },

            logout: async () => {

                await SecureStorage.removeItem("user");
                dispatch(createAction("REMOVE_USER"));
                // console.log("logout");
            },

        }), [],
    );

    // useEffect(() => {
    //     sleep(700).then(() => {
    //         let user = AsyncStorage.getItem("user")
    //         // .then(user => {
    //         // console.log(user, "STORED USERRR");
    //
    //         if (user) {
    //             dispatch(createAction("SET_USER", JSON.parse(user)));
    //         } else {
    //             dispatch(createAction("SET_LOADING", false));
    //         }
    //
    //         // });
    //     });
    //
    //
    // }, []);


    useEffect(() => {
        sleep(700).then(() => {
            SecureStorage.getItem("user").then(user => {
                // console.log(user, "STORED USERRR");

                if (user) {
                    dispatch(createAction("SET_USER", JSON.parse(user)));
                } else {
                    dispatch(createAction("SET_LOADING", false));
                }

            });
        });

    }, []);


    return {auth, state};

}
