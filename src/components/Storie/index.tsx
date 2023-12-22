import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, Image, Flex } from "native-base";
import { TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../context/user";

interface Props {
    id: string;
    name: string,
    img : string,
    setArtist? : (name:string) => void
}

export default function Storie({ id, name, img }: Props) {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const navToHome = () => {
        navigation.navigate("Artist", { id, name, img });
    }

    return (
        <TouchableOpacity onPress={() => {navToHome()}} >
            <Image source={{ uri: img }} borderColor={"primary.200"} borderWidth={"4"} borderRadius={100} alt="Alternate Text" size="md" ml={2} mr={2} />
            <Flex alignItems={"center"}>
                <Text color={"secondary.100"}>{name}</Text>
            </Flex>
        </TouchableOpacity>
    );
}