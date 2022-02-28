import React, {useEffect, useMemo, useReducer} from "react";
import {sleep} from "../utils/sleep";
import {createAction} from "../utils/createAction";
import {handleQuery, handleQueryNoToken} from "../graphql/requests";
import SecureStorage from "react-native-secure-storage";
import {resolve} from "@babel/core/lib/vendor/import-meta-resolve";


export const useAuth = () => {


    function randomString(length, chars) {
        let result = '';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }


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


            login: async (email, password, reject,) => {

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


                    return new Promise(async (resolve, reject) => {


                        let res = await handleQueryNoToken(qry);

                        if (res.errors) {
                            // console.log(res.errors)
                            return reject(res.errors)
                        }


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
                                                data: { amount_saved: 0.0, user_id: ${res.data.login.user.id},
                                                 community_id: 15 } }) {
                                                savingAccount {
                                                id
                                                    }
                                                  }
                                               }`

                            console.log(createSavingAcct)
                            let createSavingAcctRes = await handleQuery(createSavingAcct, res.data.login.jwt, false)
                        }

                        // console.log(qrySavingsRes.data.users[0].saving_account, "REZXXX")

                        const user = {
                            token: res.data.login.jwt,
                            id: res.data.login.user.id,
                            email: res.data.login.user.email,
                            firstname: res.data.login.user.firstname,
                            lastname: res.data.login.user.lastname
                            // avatar: res.data.login.user.avatar

                        };

                        await SecureStorage.setItem("user", JSON.stringify(user));
                        dispatch(createAction("SET_USER", user));


                    })


                } catch (e) {
                    console.log(e, "error @login")
                    return reject(e)

                }
            },


            register: async (email, password, referredBy,) => {
                const rString = randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');


                let codeVerification = `mutation {
                                        referralCheck(referral_code: "${referredBy}") {
                                                ok
                                                    }
                                                  }`

                let mtn = `mutation {
                                register(
                                    input: {
                                    email: "${email}"
                                    username: "${email}"
                                    password: "${password}"
                                    referred_by: "${referredBy}"
                                    referral_code:"${rString}"
                                    domain_url:"investment.tribearc.com"
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


                let otpQuery = `mutation{
                                    sendOtp(email:"${email}"){
                                        ok
                                            }
                                                }`


                try {

                    // console.log(mtn)

                    return new Promise(async (resolve, reject) => {

                        let codeVerificationRes = await handleQueryNoToken(codeVerification);

                        // console.log(codeVerificationRes)
                        if (!codeVerificationRes.data.referralCheck) {

                            return reject("Invalid referral code")
                        }


                        if (codeVerificationRes.data.referralCheck.ok) {

                            let res = await handleQueryNoToken(mtn);

                            // console.log(res.data)
                            if (res.data) {
                                let otpQryRes = await handleQueryNoToken(otpQuery);
                                return resolve(res.data)
                            }

                            if (res.errors) {
                                return reject(res.errors)
                            }
                        }

                    })


                } catch (e) {
                    console.log(e, "error @register")

                }

            },

            logout: async () => {
                await SecureStorage.removeItem("user");
                dispatch(createAction("REMOVE_USER"));
            },

        }), [],
    );


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
