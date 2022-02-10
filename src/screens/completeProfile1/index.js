// @flow
import React, {useContext, useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons} from "../../constants";
import BackButton from "../../components/BackButton";
import {launchImageLibrary} from "react-native-image-picker";
import CustomInputBox from "../../components/CustomInputBox";
import CustomButton from "../../components/CustomButton";
import {BASE_URL} from "../../config";
import {handleQuery} from "../../graphql/requests";
import {UserContext} from "../../context/UserContext";
import CustomTextInput from "../../components/CustomTextInput";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";


const CompleteProfile1 = ({navigation}) => {

    const user = useContext(UserContext)

    const [filePath, setFilePath] = useState(null);
    const [imageInfo, setImageInfo] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [nextOfKin, setNextOfKin] = useState("")
    const [nofNumber, setNofNumber] = useState("")
    const [isLoading, setIsLoading] = useState(false)


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


    const UpdateUserData = async () => {
        let qry = `mutation {
            updateUser(
            input: {
            where: { id: ${user.id} }
            data: {
             firstname: "${firstName}",
             lastname: "${lastName}",
             phone_number:"${phoneNumber}"
             
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


    return (
        <View style={styles.container}>
            {/*<BackButton onPress={() => navigation.pop()}/>*/}

            <View style={styles.box}>
                <Image style={{height: 80, width: 80, right: 15}} source={icons.circular1}/>
                <View style={styles.box2}>
                    <Text style={styles.text1}>Complete your Profile</Text>
                    <Text style={styles.text2}>please complete the fields below</Text>
                </View>
            </View>

            <Text style={styles.perInfo}>Personal info</Text>

            <ImageBackground
                resizeMode={"contain"}
                source={filePath ? {uri: filePath} : avatar ? {uri: avatar} : require("../../assets/images/userImg.png")}
                style={{width: 110, height: 110,  borderRadius: 10, aspectRatio: 1, marginBottom:10}}>
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


            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>

            <CustomTextInput
                initialValue={firstName}
                onChange={value => setFirstName(value)}
                placeholderText={"Enter First Name"}
                title={"First Name"}
            />

            <CustomTextInput
                initialValue={lastName}
                onChange={value => setLastName(value)}
                placeholderText={"Enter Last Name"}
                title={"Last Name"}
            />
            <CustomTextInput
                initialValue={phoneNumber}
                onChange={value => setPhoneNumber(value)}
                placeholderText={"Enter Phone Number"}
                title={"Phone Number"}
            />
            <CustomTextInput
                initialValue={nextOfKin}
                onChange={value => setNextOfKin(value)}
                placeholderText={"Enter Next of Kin's Name"}
                title={"Next of Kin"}
            />

            <CustomTextInput
                initialValue={nofNumber}
                onChange={value => setNofNumber(value)}
                placeholderText={"Enter Next of Kin's Number"}
                title={"Next of Kin's Phone Number"}
            />
            </KeyboardAwareScrollView>


            <View style={styles.saveButton}>
                <CustomButton
                    loading={isLoading}
                    filled={firstName !== "" && lastName !== "" && phoneNumber !== ""}
                    text={"Save & Continue"}
                    onPress={async () => {

                        await navigation.navigate("CompleteProfile2")


                    }}/>
            </View>

        </View>
    );
};


export default CompleteProfile1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20

    },
    box: {
        flexDirection: "row",
        height: 80,
        marginVertical:10
        // backgroundColor: "red"

    },
    box2: {
        paddingVertical: 20,
        justifyContent: "space-between"
    },
    text1: {
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        fontSize: 18
    },
    text2: {
        color: COLORS.black,
        fontFamily: "Nexa-Bold",
        fontSize: 14,
        opacity: 0.7
    },
    perInfo: {
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        fontSize: 18,
        marginBottom: 10

    },
    saveButton: {
        justifyContent: "flex-end",
        flex: 2,

    },


})
