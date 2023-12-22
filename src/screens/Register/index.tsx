import { Flex, Heading, Input, Pressable } from "native-base";
import React, { useState } from "react";
import Button from "../../components/Button";
import { register } from "../../services/auth";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../context/user";

export default function Register() {
    const [show, setShow] = React.useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigator = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handleRegister = async () => {
     await setUsername(username.toLocaleLowerCase());
      register({username, password})
          .then(function (response) {
             console.log(response);
             Alert.alert("Conta criada com sucesso!", "Faça login para continuar");
          })
          .catch(function (error) {
            Alert.alert(error.message);
          });
    }

    return (
            <Flex p={8} flex={1} justifyContent='center' alignItems='center'>
                <Heading>Crie sua conta</Heading>

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
                    <Button  content="Registrar" handleClick={()=> {handleRegister()}}/>
                </Flex>
            </Flex>
    );
}