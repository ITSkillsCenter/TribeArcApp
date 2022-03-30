// @flow
import * as React from 'react';
import {Image, Platform, Pressable, TouchableOpacity} from "react-native";
import {icons, SIZES} from "../constants";

const BackButton = ({onPress, containerStyle, settingPress, settingStyle, ifSettings}) => {
    return (
        <Pressable style={{paddingVertical: 5,}} onPress={onPress}>
            <Image resizeMode={"contain"} source={icons.arrowLeft} style={{width: SIZES.font5, height: SIZES.font5,}}/>
            {ifSettings && <Pressable onPress={settingPress}
                                      style={settingStyle}>
                <Image source={icons.settingsIcon} style={{width: 30, height: 30}}/>
            </Pressable>}


        </Pressable>
    );
};

export default BackButton
