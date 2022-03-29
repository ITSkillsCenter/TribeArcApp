// @flow
import React from "react";
import { Platform, SafeAreaView, View } from "react-native";
import * as Safety from "react-native-safe-area-context";

const NotchResponsive = ({ color }) => {
  return (
    <View>
      {Platform.OS === "android" ? <Safety.SafeAreaView style={{ flex: 0, backgroundColor: color }} /> :
        <SafeAreaView style={{ flex: 0, backgroundColor: color }} />}
    </View>
  );
};

export default NotchResponsive;
