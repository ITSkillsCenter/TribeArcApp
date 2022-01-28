// @flow
import * as React from 'react';
import {Image, Platform, TouchableOpacity} from "react-native";
import {icons} from "../constants";

const BackButton = ({onPress, containerStyle}) => {
    return (
        <TouchableOpacity style={{paddingVertical: 5, }} onPress={onPress}>
            <Image resizeMode={"contain"} source={icons.arrowLeft} style={{width: 20, height: 20,}}/>


        </TouchableOpacity>
    );
};

export default BackButton
