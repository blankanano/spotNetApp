import { extendTheme } from "native-base";
import { StyleSheet } from "react-native";

const THEME = extendTheme({
    colors: {
        primary: {
            100: '#000000'
        },
        secondary: {
            100: '#ffffff'
        },
    },
});

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      flexDirection: "row"
    },
    quadradoA: {
      height: "100%",
      width: "20%",
    },
    quadradoB: {
      height: "100%",
      flex: 1,
    },
    quadradoC: {
      height: "100%",
      flex: 2,
    }
  });

export default THEME;