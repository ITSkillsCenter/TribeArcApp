// @flow
import React, {useRef, useState} from 'react';
import {Animated, FlatList, Image, StyleSheet, Text, View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import CustomButton from "../../components/CustomButton";

const slides = [
    {
        id: 1,
        title: "Save your Money",
        image: require("../../assets/icons/onBoarding1.png"),
        desc: "Amet minim mollit non deserunt ullamco est sit aliqua veniam consequat sunt nostrud amet."
    },
    {
        id: 2,
        title: "Invest your Money",
        image: require("../../assets/icons/onBoarding2.png"),
        desc: "Amet minim mollit non deserunt ullamco est sit aliqua veniam consequat sunt nostrud amet."

    },
];


const Paginator = ({data, scrollX}) => {
    return (
        <View style={styles.pagination}>
            {data.map((_, index) => {
                const inputRange = [
                    (index - 1) * SIZES.width,
                    index * SIZES.width,
                    (index + 1) * SIZES.width,
                ];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [25, 30, 25],
                    extrapolate: "clamp",
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: "clamp",
                });

                return (
                    <Animated.View
                        style={[styles.dot, {width: dotWidth, opacity}]}
                        key={index.toString()}
                    />
                );
            })}
        </View>
    );
};


const OnBoardingItem = ({item, appTheme}) => {
    return (
        <View style={styles.wrapper}>
            <Image style={styles.img2} resizeMode={"contain"} source={item.image}/>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.descs}>{item.desc}</Text>
        </View>
    );
};


const OnBoarding = ({navigation}) => {


    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const slidesRef = useRef(null);

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;


    return (
        <View style={styles.container}>


            <View style={styles.box}>

                <FlatList
                    data={slides}
                    keyExtractor={item => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    initialNumToRender={1}
                    maxToRenderPerBatch={1}
                    windowSize={3}
                    snapToAlignment={"center"}
                    bounces={"false"}
                    renderItem={({item}) => <OnBoardingItem item={item}/>}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {x: scrollX}}}],
                        {useNativeDriver: false},
                    )}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    scrollEventThrottle={32}
                    ref={slidesRef}
                />

                <Paginator data={slides} scrollX={scrollX}/>

            </View>


            <View style={{flex: 2, justifyContent: "flex-end",}}>


                <CustomButton onPress={() => navigation.navigate("SignUp")} filled text={"Register"}/>
                <CustomButton
                    onPress={() => navigation.navigate("Login")}
                    textStyle={{
                        color: COLORS.primary
                    }}
                    containerStyle={{
                        backgroundColor: "white",
                        borderColor: COLORS.primary,
                        borderWidth: 1,
                        bottom: 40
                    }} text={"Login"}/>
            </View>


        </View>
    );
};


export default OnBoarding

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,

    },
    box: {
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor:"yellow"
    },
    root: {
        flex: 1,
        padding: 5,
        width: SIZES.width,
        height: SIZES.height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {

        textAlign: 'center',
        width: '70%',
        bottom: 60,
        marginVertical: 20,
    },
    buttonContainer: {
        // width: SIZES.width,
        bottom: 40,
    },
    dot: {
        height: 4,
        borderRadius: 4,
        marginHorizontal: 8,
        backgroundColor: COLORS.primary,
    },
    pagination: {
        flexDirection: 'row',
        height: 64,
    },

    headerContainer: {
        top: 50,
        height: 63,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 85.84,
        height: 73.73,
    },

    wrapper: {
        width: SIZES.width * 0.9,
        alignItems: "center",

        // justifyContent: "center",
    },
    img2: {
        width: 300,
        height: 350,
        // marginVertical: 20,
        // top: 25,
        // backgroundColor: "cyan"
    },
    title: {
        fontSize: 24,
        fontFamily: "Nexa-Bold",
        color: COLORS.black,
        width: SIZES.width * 0.85,
        textAlign: "center",
        marginTop: 20
    },
    descs: {
        fontSize: 18,
        textAlign: "center",
        width: "100%",
        lineHeight: 28,
        color: COLORS.black,
        opacity: 0.7,
        fontFamily: "Nexa-Book",
        marginVertical: 20,
        marginBottom: 40

    }

})
