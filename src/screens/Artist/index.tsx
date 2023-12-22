import React from "react";
import { Text, Image, Flex, Box, Heading, FlatList, Spacer, IconButton, View } from "native-base";
import { musicsDemo } from "../../context/album";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../theme";
import Icon from "react-native-ionicons";

interface Props {
  route: any;
}

export default function Artist({ route }: Props) {
  const { id, name, img } = route.params;
  return (
    <Flex safeAreaTop p={10} flex={1} alignItems='center' bg={"primary.100"}>

      <Box height={"10%"} alignSelf={"flex-start"} width={"100%"}>
        <Heading color={"secondary.100"} alignSelf={"center"} fontSize={"2xl"}>{name} </Heading>
      </Box>
      <Image source={{ uri: img }} borderRadius={200} alt={name} size="2xl" />

      <Box alignSelf={"flex-start"} p={5} mt={10} bg={"#0F2167"} width={"full"}>
        <Text color={"secondary.100"} style={{ fontSize: 18 }}>{name} - História</Text>
        <Text color={"secondary.100"}>...</Text>

      </Box>

      <Box alignSelf={"flex-start"} mt={10}>
        <Text color={"secondary.100"}>Top Hits <Icon name="musical-note-sharp" size={20} /></Text>
      </Box>

      <FlatList mt={5} width={"100%"} data={musicsDemo}
        renderItem={({ item }) =>
          <Box alignItems={"center"} w={"full"} p={5} borderBottomWidth="1" _dark={{ borderColor: "muted.50" }} borderColor="muted.800" >
            
              <SafeAreaView style={styles.container}>
                <View style={styles.quadradoA}>
                <IconButton ml={4} borderRadius={"full"} style={{ backgroundColor: "#FFF" }} onPress={() => {console.log("Play!", item.id);
                }} _icon={{
                          as: Icon,
                          name: "play",
                          color: "primary.100",
                          size: "xs"
                      }} />
                </View>
             <View style={styles.quadradoB} />
             <View style={styles.quadradoC} >
             <Text _light={{ color: "warmGray.50" }} color="coolGray.800" bold>
                    {item.name}
                  </Text>
             </View>
              </SafeAreaView>
             
              <Spacer />
          </Box>} keyExtractor={item => item.id} />
    </Flex>
 );
}