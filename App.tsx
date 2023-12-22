import { NativeBaseProvider,  StatusBar} from 'native-base';
import THEME from './src/theme';
import Wrapper from './src/screens/Wrapper';
import { useEffect, useState } from 'react';
import UserContext, { IUser, storage } from './src/context/user';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Albums from './src/screens/Albuns';
import Artist from './src/screens/Artist';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { login } from './src/services/auth';
import { AlbumProvider } from './src/context/albumContext';

export default function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const Stack = createStackNavigator();

  useEffect(() => {
    if(user != null){
      storage.set("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const userDb = storage.getString("user");
    if (userDb) {
      setUser(JSON.parse(userDb)); 
      
      login({name: userDb.name, password: userDb.password})
        .then((res) => {})
        .catch((erro) => {
          if(erro.message.indexOf("401") >= 0){
            // Usuario não autorizado - apaga dados locais
            storage.delete("user");
          }
        })
    }   
  }, []);

  // return (
  //   <NativeBaseProvider theme={THEME}>
  //     <UserContext.Provider value={{ user, setUser }}>
  //       <StatusBar barStyle={"dark-content"} />
  //       <GestureHandlerRootView style={{ flex: 1 }}>
  //         <NavigationContainer>
  //           <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
  //             <Stack.Screen name='Wrapper' component={Wrapper} />
  //             <Stack.Screen name='Home' component={Home} />
  //             <Stack.Screen name='Albums' component={Albums} options={{headerShown: false}} />
  //             <Stack.Screen name='Artist' component={Artist} options={{headerShown: true, title: "Artista"}} />
  //           </Stack.Navigator>
  //         </NavigationContainer>
  //       </GestureHandlerRootView>

  //     </UserContext.Provider>
  //   </NativeBaseProvider>
  // );

  return (
    <NativeBaseProvider theme={THEME}>
      <UserContext.Provider value={{ user, setUser }}>
        <AlbumProvider>
          <StatusBar barStyle={'dark-content'} />
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Wrapper' component={Wrapper} />
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Albums' component={Albums} options={{ headerShown: false }} />
                <Stack.Screen name='Artist' component={Artist} options={{ headerShown: true, title: 'Artista' }} />
              </Stack.Navigator>
            </NavigationContainer>
          </GestureHandlerRootView>
        </AlbumProvider>
      </UserContext.Provider>
    </NativeBaseProvider>
  );
}