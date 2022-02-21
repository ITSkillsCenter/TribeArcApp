// @flow
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";

const clause = [

    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in." +
    " Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra " +
    "in sit semper et. Amet quam placerat sem."
    ,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.\n" +
    "\n" +
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.",

    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.\n" +
    "\n" +
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.\n" +
    "\n" +
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem."
]

const InvestmentTermsPage = ({navigation}) => {


    const date = new Date()

    return (
        <View style={styles.container2}>
            {/*<BackButton onPress={() => navigation.pop()}/>*/}
            <Text style={styles.title2}>Tribe arc Terms & Condition </Text>
            <Text style={styles.updatedAt}>Last updated on {date.toJSON().slice(0, 10).replace(/-/g, '/')} </Text>

            <ScrollView  showsVerticalScrollIndicator={false}>
                {clause.map((item, index) => (
                    <View>
                        <Text style={styles.clause}>{index + 1}. Clause {index + 1}</Text>
                        <Text style={styles.clauseDet}>{item}</Text>
                    </View>


                ))}

                <View>
                    <CustomButton filled text={"Accept & Continue"}/>
                </View>

            </ScrollView>

        </View>
    );
};

export default InvestmentTermsPage

const styles = StyleSheet.create({
    container2: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20
    },
    title2: {
        color: COLORS.primary,
        fontFamily: "Nexa-Bold",
        fontSize: 24,
        marginVertical: 20
    },
    updatedAt: {
        fontSize: 14,
        fontFamily: "Nexa-Bold",
        color: COLORS.black,
        opacity: 0.6,
        marginBottom: 10

    },
    clause: {
        fontSize: SIZES.width * 0.05,
        fontFamily: "Nexa-Book",
        color: COLORS.black,
        // marginVertical:15,
        marginTop: 25,
        marginBottom: 10
    },
    clauseDet: {
        color: COLORS.black,
        fontFamily: "Nexa-Book",
        lineHeight:20
    }


})

