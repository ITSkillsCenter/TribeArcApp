// @flow
import * as React from 'react';
import {Image, Platform, TouchableOpacity} from "react-native";
import {icons} from "../constants";

const BackButton = ({onPress, containerStyle,settingPress,settingStyle,ifSettings}) => {
    return (
        <TouchableOpacity style={{paddingVertical: 5,}} onPress={onPress}>
            <Image resizeMode={"contain"} source={icons.arrowLeft} style={{width: 20, height: 20,}}/>
            {ifSettings&&<TouchableOpacity onPress={settingPress} activeOpacity={0.8}
                               style={settingStyle}>
                <Image source={icons.settingsIcon} style={{width: 30, height: 30}}/>
            </TouchableOpacity>}


        </TouchableOpacity>
    );
};

export default BackButton
