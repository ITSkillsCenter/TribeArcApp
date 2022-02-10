// @flow
import React, {useContext, useEffect, useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BackButton from "../../components/BackButton";
import {COLORS, icons, SIZES} from "../../constants";
import {UserContext} from "../../context/UserContext";
import {handleQuery} from "../../graphql/requests";
import {launchImageLibrary} from "react-native-image-picker";
import {BASE_URL} from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import CustomTextInput from "../../components/CustomTextInput";


const EditProfile = ({navigation}) => {


    const user = useContext(UserContext);

    useEffect(() => {

        GetUserData()
        GetImg()
    }, []);


    const [isLoading, setIsLoading] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNum, setPhoneNum] = useState("")
    const [profession, setProfession] = useState("")
    const [filePath, setFilePath] = useState(null);
    const [imageInfo, setImageInfo] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [nextOfKin, setNextOfKin] = useState("")
    const [nextOfKinPhoneNum, setNextOfKinPhoneNum] = useState("")


    const GetImg = async () => {

        const value = await AsyncStorage.getItem("ImageLocal")

        try {

            if (value !== null) {
                await setAvatar(value)
            }

        } catch (e) {
            console.log(e, "")
        }

    }

    const GetUserData = async () => {
        let qry = `query{
            users(where:{id:${user.id}}){
            firstname
            lastname
            email
            phone_number
            profession
                }
                    }`
        try {

            let res = await handleQuery(qry, user.token, false)
            // console.log(res.data.users[0].profession, "REZZZ")
            await setEmail(res.data.users[0].email)
            await setFirstName(res.data.users[0].firstname)
            await setLastName(res.data.users[0].lastname)
            await setPhoneNum(res.data.users[0].phone_number)
            await setProfession(res.data.users[0].profession)


        } catch (e) {
            console.log(e, "GetUserDataError")
        }
    }

    const UpdateUserData = async () => {
        let qry = `mutation {
            updateUser(
            input: {
            where: { id: ${user.id} }
            data: {
             firstname: "${firstName}",
             lastname: "${lastName}",
             phone_number:"${phoneNum}"
             profession:"${profession}"
             
              }
             }
                ) {
                user {
                firstname
                lastname
                email
                      }
                    }
                }`
        try {

            // console.log(qry)

            setIsLoading(true)

            let res = await handleQuery(qry, user.token, false)
            // console.log(res.data.updateUser.user)
            await setIsLoading(false)


        } catch (e) {
            console.log(e, "GetUserDataError")
        }
    }

    const ChooseFile = async () => {

        await launchImageLibrary("", (response) => {
            console.log("Response = ", response);

            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else if (response.customButton) {
                console.log(
                    "User tapped custom button: ",
                    response.customButton,
                );
                alert(response.customButton);
            } else {
                let source = response.assets[0].uri;
                setFilePath(source);
                setImageInfo(response.assets[0]);
            }
        });


    };


    const UploadFile = async () => {

        const formData = new FormData();
        formData.append('files', {
            uri: imageInfo.uri,
            name: imageInfo.fileName,
            type: imageInfo.type,
        });

        try {
            setIsLoading(true)


            await fetch(`${BASE_URL}/upload/`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                method: "POST",
                body: formData,
            }).then((res) => {
                return res.json()
            }).then(async (response) => {
                await UploadNow(response[0].url)
                await setIsLoading(false)
                // console.log(response[0].url, "IMG")
            })


        } catch (e) {
            // setLoading(false);
            console.log('e', e);
            console.log('e', e.response);
        }
    };

    const UploadNow = async (link) => {

        let query = `mutation {
                        updateUser(input: { where: { id: ${user.id} },
                         data: { avatar: "${link}" } }) {
                        user {
                        id
                        avatar
                            }
                          }
                        }`

        try {


            let {data} = await handleQuery(query, user.token, false);

            // console.log(data, "DAYTAA")

        } catch (e) {
            console.log('e', e);
            console.log('e', e.response);
        }
    };


    const [active, setActive] = useState()


    const TopTabs = createMaterialTopTabNavigator();

    const CustomTabBar = ({children, onPress}) => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 30,
                    height: 30,

                }}
                onPress={onPress}>
                {children}
            </View>
        );


    }

    const TabOne = () => {

        return (
            <View style={styles.tabOneContainer}>
                <CustomTextInput
                    initialValue={firstName}
                    onChange={value => setFirstName(value)}
                    placeholderText={"First Name"}
                    title={"First Name"}/>


                <CustomTextInput
                    title={"Last Name"}
                    initialValue={lastName}
                    onChange={value => setLastName(value)}
                    placeholderText={"Last Name"}

                />

                <CustomTextInput
                    title={"Email"}

                    initialValue={email}
                    onChange={value => setEmail(value)}
                    placeholderText={"Email Address"}
                    props={{
                        editable: false
                    }}

                />

                <CustomTextInput
                    title={"Phone Number"}
                    initialValue={phoneNum}
                    onChange={value => setPhoneNum(value)}
                    placeholderText={"Phone Number"}
                />


                <CustomTextInput
                    title={"Next of kin's Name"}
                    initialValue={nextOfKin}
                    onChange={value => setNextOfKin(value)}
                    placeholderText={"Next of kin's Name"}

                />


                <CustomTextInput
                    title={"Next of kin's Phone Number"}
                    initialValue={nextOfKinPhoneNum}
                    onChange={value => setNextOfKinPhoneNum(value)}
                    placeholderText={"Next of kin's Phone Number"}
                />

            </View>


        )
    }

    const TabTwo = () => {

        return (
            <View style={styles.tabOneContainer}>

                <Text>Tab2</Text>

            </View>

        )
    }


    function TopTab() {
        return (
            <TopTabs.Navigator
                screenOptions={{
                    // tabBarActiveTintColor: ({focused}) => focused ? "red" : "green"
                }}

                tabBar={({navigation}) => <CustomTabBar children={
                    <>
                        <TouchableOpacity activeOpacity={0.2} onPress={() => {
                            navigation.navigate("TabOne")
                            setActive(true)
                        }}>
                            <Text>Personal Info</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("TabTwo")}>
                            <Text>Work Info</Text>
                            {/*<View style={{width: "100%", height: 2, backgroundColor: COLORS.primary, borderRadius: 5}}/>*/}

                        </TouchableOpacity>

                    </>

                }/>}
            >
                <TopTabs.Screen
                    name={"TabOne"}
                    component={TabOne}
                    options={{}}
                />
                <TopTabs.Screen
                    name={"TabTwo"}
                    component={TabTwo}
                    options={{tabBarLabel: "Pending"}}
                />


            </TopTabs.Navigator>
        );
    }


    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>
            <Text style={styles.myProfile}>My Profile</Text>
            {/*<KeyboardAwareScrollView showsVerticalScrollIndicator={false}>*/}


            {/*<View>*/}
            <ImageBackground
                resizeMode={"contain"}
                source={filePath ? {uri: filePath} : avatar ? {uri: avatar} : require("../../assets/images/userImg.png")}
                style={{
                    width: 120,
                    height: 120,
                    // marginVertical: 10,
                    borderRadius: 130,
                    aspectRatio: 1,
                    alignSelf: "center"
                }}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => ChooseFile()}
                    style={{
                        backgroundColor: "#EFF2FF",
                        width: 40,
                        height: 40,
                        alignSelf: "flex-end",
                        alignItems: "center",
                        justifyContent: "center",
                        top: 80,
                        borderRadius: 40
                        // flex:1
                    }}>
                    <Image
                        source={icons.camera}
                        resizeMode={"contain"}
                        style={{width: 20, height: 20}}
                    />
                </TouchableOpacity>
            </ImageBackground>

            {TopTab()}


            {/*<CustomInputBox*/}
            {/*    initialValue={profession}*/}
            {/*    onChange={value => setProfession(value)}*/}
            {/*    placeholderText={"Profession"}*/}

            {/*/>*/}


            {/*</View>*/}

            {/*<View style={{flex: 2, justifyContent: "flex-end", height:SIZES.height*0.2}}>*/}
            {/*    <CustomButton*/}
            {/*        onPress={async () => {*/}

            {/*            try {*/}
            {/*                await UpdateUserData()*/}
            {/*                await UploadFile()*/}
            {/*                navigation.navigate("DashBoard")*/}


            {/*            } catch (e) {*/}
            {/*                console.log(e, "UpdateUserError")*/}
            {/*            }*/}

            {/*        }}*/}
            {/*        loading={isLoading}*/}
            {/*        filled text={"Update Profile"}*/}
            {/*    />*/}
            {/*</View>*/}

            {/*</KeyboardAwareScrollView>*/}
        </View>


    );
};

export default EditProfile


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        // paddingVertical: 20,
        height: SIZES.height,
        backgroundColor: COLORS.white
    },
    myProfile: {
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        fontSize: 30,
        marginVertical: 20
    },
    tabOneContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
    },

})
