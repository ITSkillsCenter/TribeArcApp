import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Pdf from 'react-native-pdf';
import {COLORS} from "../../constants";
import BackButton from "../../components/BackButton";

const PdfPage = ({navigation, route}) => {

    // console.log(route.params)

    const source = {uri: route.params, cache: true};
    //const source = require('./test.pdf');  // ios only
    //const source = {uri:'bundle-assets://test.pdf' };
    //const source = {uri:'file:///sdcard/test.pdf'};
    //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
    //const source = {uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"};
    //const source = {uri:"blob:xxxxxxxx-...?offset=0&size=xxx"};

    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.pop()}/>
            <Pdf
                source={source}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}/>
        </View>
    )
}

export default PdfPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        // alignItems: 'center',
        backgroundColor: COLORS.white
    },
    pdf: {
        flex: 1,
        width: "100%",
        height: Dimensions.get('window').height,
    }
});
