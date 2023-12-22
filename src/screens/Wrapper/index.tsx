import Home from "../Home";
import { useContext } from "react";
import UserContext from "../../context/user";
import Login from "../Login";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StackNavigation } from "../../routes/stack";

const Tab = createMaterialTopTabNavigator();

export default function Wrapper() {
  console.log("Entrou no Wrapper");

  /* 
    Invariant Violation: requireNativeComponent: "RNCViewPager" was not found in the UIManager.
    Erro ocorria por causa do componente estar em desuso e por isso foi reinstalado
    npm i react-native-pager-view

    Because, "@react-native-community/viewpager" is Deprecated.
  */

  const userData = useContext(UserContext);
  return userData.user != null ? (
    <Home />
  ) : (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Register" component={StackNavigation} />
    </Tab.Navigator>
  );
}