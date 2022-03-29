import {Dimensions} from "react-native";

const {width, height} = Dimensions.get("window");

export const COLORS = {
    // primary colors
    primary: "#5151ff",
    secondary: "#788eea",
    tertiary: "#C3CFFF",
    white: '#FFFFFF',
    black: '#414042'


};
export const SIZES = {
    // global sizes
    radius: 24,
    radius2: 14,
    radius3: 8,
    padding: 24,


    // font sizes
    largeTitle: 36,
    // font1: 24,
    // font2: 18,
    // font3: 16,
    // font4: 14,
    // font5: 12,
    // font6: 10,

    font1: width * 0.08,
    font2: width * 0.076,
    font3: width * 0.068,
    font4: width * 0.062,
    font5: width * 0.056,
    font6: width * 0.048,
    font7: width * 0.042,
    font8: width * 0.038,
    font9: width * 0.035,
    font10: width * 0.03,

    // app dimensions
    width,
    height,
};
// export const FONTS = {
//     largeTitle: { fontSize: SIZES.largeTitle, lineHeight: 46, fontWeight: "bold" },
//     h1: { fontSize: SIZES.font1, lineHeight: 34, fontWeight: "bold" },
//     h2: { fontSize: SIZES.font2, lineHeight: 28, fontWeight: "bold" },
//     h3: { fontSize: SIZES.font3, lineHeight: 26, fontWeight: "bold" },
//     h4: { fontSize: SIZES.font4, lineHeight: 22, fontWeight: "bold" },
//     h5: { fontSize: SIZES.font5, lineHeight: 16, fontWeight: "bold" },
//     body1: { fontSize: SIZES.font1, lineHeight: 34, fontWeight: "normal" },
//     body2: { fontSize: SIZES.font2, lineHeight: 28, fontWeight: "normal" },
//     body3: { fontSize: SIZES.font3, lineHeight: 26, fontWeight: "normal" },
//     body4: { fontSize: SIZES.font4, lineHeight: 22, fontWeight: "normal" },
//     body5: { fontSize: SIZES.font5, lineHeight: 16, fontWeight: "normal" },
//     body6: { fontSize: SIZES.font6, lineHeight: 12, fontWeight: "normal" },
// };

export const FONTS = {
    largeTitle: {fontSize: SIZES.largeTitle, fontFamily: "Nexa-Bold"},
    h1: {fontSize: SIZES.font1, fontFamily: "Nexa-Bold"},
    h2: {fontSize: SIZES.font2, fontFamily: "Nexa-Bold"},
    h3: {fontSize: SIZES.font3, fontFamily: "Nexa-Bold"},
    h4: {fontSize: SIZES.font4, fontFamily: "Nexa-Bold"},
    h5: {fontSize: SIZES.font5, fontFamily: "Nexa-Bold"},
    h6: {fontSize: SIZES.font6, fontFamily: "Nexa-Bold"},
    h7: {fontSize: SIZES.font7, fontFamily: "Nexa-Bold"},
    h8: {fontSize: SIZES.font8, fontFamily: "Nexa-Bold"},
    h9: {fontSize: SIZES.font9, fontFamily: "Nexa-Bold"},
    h10: {fontSize: SIZES.font10, fontFamily: "Nexa-Bold"},
    body1: {fontSize: SIZES.font1, fontFamily: "Nexa-Book"},
    body2: {fontSize: SIZES.font2, fontFamily: "Nexa-Book"},
    body3: {fontSize: SIZES.font3, fontFamily: "Nexa-Book"},
    body4: {fontSize: SIZES.font4, fontFamily: "Nexa-Book"},
    body5: {fontSize: SIZES.font5, fontFamily: "Nexa-Book"},
    body6: {fontSize: SIZES.font6, fontFamily: "Nexa-Book"},
    body7: {fontSize: SIZES.font7, fontFamily: "Nexa-Book"},
    body8: {fontSize: SIZES.font8, fontFamily: "Nexa-Book"},
    body9: {fontSize: SIZES.font9, fontFamily: "Nexa-Book"},
    body10: {fontSize: SIZES.font10, fontFamily: "Nexa-Book"},
};


const appTheme = {
    COLORS,
    SIZES,
    FONTS,
    // darkTheme,
    // lightTheme,
};

export default appTheme;
