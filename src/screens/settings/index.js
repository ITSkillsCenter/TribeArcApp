import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from "react-native";
import {AuthContext} from "../../context/AuthContext";


const SettingsPage = ({navigation}) => {


    const {logout} = useContext(AuthContext);


    return (
        <SafeAreaView>
            <TouchableOpacity onPress={async () => {

                try {
                    await logout();
                    navigation.navigate("AuthNavigation")

                } catch (e) {
                    console.log("error:  ", e.message)

                }

            }
            }>
                <Text>Logout</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};


export default SettingsPage
