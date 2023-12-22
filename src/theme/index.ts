import { extendTheme } from "native-base";
import { StyleSheet } from "react-native";

const THEME = extendTheme({
    colors: {
        primary: {
            100: '#000000'
        },
        seconday: {
            100: '#ffffff'
        }
    }
});

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      flexDirection: "row"
    },
    quadradoA: {
    //   backgroundColor: "green",
      height: "100%",
      width: "20%",
    },
    quadradoB: {
    //   backgroundColor: "blue",
      height: "100%",
      flex: 1,
    },
    quadradoC: {
    //   backgroundColor: "orange",
      height: "100%",
      flex: 2,
    }
  });

export default THEME;