import React, { useContext, useState } from "react";
import UserContext from "../../context/user";
import {  Flex, Heading, Icon, Input, Pressable } from "native-base";
import Button from "../../components/Button";
import { Alert  } from "react-native";
import { login } from "../../services/auth";
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Login() {

    const userData = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isWaiting, setIsWaiting] = React.useState(false);

    const handleLogin = () => {
      setUsername(username.toLocaleLowerCase());
      setIsWaiting(true);
      login({username, password})
          .then(function (response) {
            const userEmail = response.data.email || "";  // Usando uma string vazia se o email for null
            const userToken = response.data.token || "";  // Usando uma string vazia se o token for null

            userData.setUser({name: username, 
                              password:password, 
                              email: userEmail, 
                              token: userToken});
            console.log(userData.user?.token)
          })
          .catch(function (error) {           
            Alert.alert("Error", error.message);
          });
       setIsWaiting(false);
    }

    
    const [show, setShow] = React.useState(false);

    return (
            <Flex p={8} flex={1} justifyContent='center' alignItems='center'>
      
            <Heading>Login</Heading>
                <Input 
                  mt={"1.5"}
                  w={{ base: "90%", md: "25%" }} 
                  placeholder="Usuário" 
                  value={username}
                  onChangeText={setUsername}
                />

                <Input w={{ base: "90%", md: "25%" }}
                  mt={"1.5"}
                  type={show ? "text" : "password"} 
                  InputRightElement={
                    <Pressable 
                      onPress={() => setShow(!show)}>
                    </Pressable>
                  }
                  placeholder="Senha" 
                  value={password}  
                  onChangeText={setPassword}
                />

                <Flex width={'100%'}>
                    <Button  content="Login" handleClick={handleLogin} icon={ isWaiting ? <Icon as={AntDesign} size={5} name={"loading"} mr="2" color="muted.400" /> : <Icon as={AntDesign} size={5} mr="2" color="muted.400" name={"login"} />} />
                </Flex>
            </Flex>
    );
}