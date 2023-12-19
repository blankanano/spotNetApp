import { NativeBaseProvider } from "native-base";
import THEME from "./src/theme";
import UserContext, { IUser } from "./src/context/user";
import Wrapper from "./src/screens/Wrapper";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./src/screens/Login";

import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

/* Acrescentada para tentar resolver o problema da chamada do wrapper */
enableScreens();

// const theme = {
//   ...DefaultTheme,
//   colors: {
//     primary: '#ff0000',
//     secondary: '#00ff00',
//   }
// }

// import { MMKV } from "react-native-mmkv";

// export const storage = new MMKV({
//   id: "movieapp",
// });


const StackNavigator = createStackNavigator();

export default function App() {
  //
  console.log("Entrou no APP");
  const [user, setUser] = useState<IUser | null>(null);
  console.log("Passou pelo setstate");

  // useEffect(() => {
  //   if (user != null) {
  //     storage.set("user", JSON.stringify(user));
  //   }
  // }, [user]);

  // useEffect(() => {
  //   const userDb = storage.getString("user");
  //   if (userDb) {
  //     setUser(JSON.parse(userDb));
  //   }
  // }, []);

  /* Exemplo do professor, que não funciona */
  // return (
  //   <NativeBaseProvider theme={THEME}>
  //     <UserContext.Provider value={{ user: user, setUser }}>
  //       {/* <StatusBar style="auto" /> */}
  //       <NavigationContainer>
  //         { <Wrapper /> }
  //       </NavigationContainer>
  //     </UserContext.Provider>
  //   </NativeBaseProvider>
  // );

  /* Chamando direto, funciona */
  return (
    <NativeBaseProvider theme={THEME}>
      <PaperProvider>
        <UserContext.Provider value={{ user: user, setUser }}>
          <NavigationContainer>
          {/* { <Wrapper /> } */}

            { <StackNavigator.Navigator initialRouteName="Login">
              <StackNavigator.Screen name="Login" component={Login} options={{ title: 'Login' }} />
            </StackNavigator.Navigator> }
          </NavigationContainer>
        </UserContext.Provider>
      </PaperProvider>
    </NativeBaseProvider>
  );

  /* Envolvida pelo GestureHandlerRootView, e tbm não funciona */
  // return (
  //   <NativeBaseProvider theme={THEME}>
  //     <PaperProvider>
  //       <UserContext.Provider value={{ user: user, setUser }}>
  //         <GestureHandlerRootView>
  //           <NavigationContainer>
  //             <Wrapper />
  //           </NavigationContainer>
  //         </GestureHandlerRootView>
  //       </UserContext.Provider>
  //     </PaperProvider>
  //   </NativeBaseProvider>
  // );


}