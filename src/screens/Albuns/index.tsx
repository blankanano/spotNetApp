import { Box, Flex, HStack, Heading, IconButton, Image, Text } from "native-base";
import { useEffect, useState } from "react";
import { RootStackParamList } from "../../context/user";
import { IAlbum, useAlbumContext } from "../../context/albumContext";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-ionicons";
import { favAlbums } from "../../context/album";

interface Props {
  route: any,
}

export default function Albums({ route }: Props) {
  const { album } = route.params;
  const { albums, addFavAlbum, removeFavAlbum } = useAlbumContext();
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (album && album.id && favAlbums.find((elem: IAlbum) => elem.id === album.id)) {
      setIsFavorite(true);
    }
  }, [albums, album]);

  function addFav(id: string) {
    if (album && album.id) {
      if (!isFavorite) {
        addFavAlbum(id);
        setIsFavorite(true);
      } else {
        removeFavAlbum(id);
        setIsFavorite(false);
      }
    }
  }

  function navToHome() {
    navigation.navigate("Home");
  }

  return (
    <Flex safeAreaTop p={10} flex={1} alignItems='center' bg={"primary.100"}>
      <HStack px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" maxW="350">
        <HStack alignItems="center" alignSelf={"center"}>
          <Text color="white" fontSize="20" fontWeight="bold"></Text>
        </HStack>
        <HStack>
          <IconButton alignSelf={"flex-end"} ml={4} style={{ backgroundColor: "#FFF", borderRadius: 100 }} onPress={() => { navToHome() }} _icon={{
            as: Icon,
            name: "home",
            color: "primary.100"
          }} />
        </HStack>
      </HStack>

      <Box height={"10%"} alignSelf={"flex-start"} width={"100%"}>
        <Heading color={"secondary.100"} alignSelf={"center"} fontSize={"2xl"}>
          {album && album.album ? album.album : "Nome do Álbum Indisponível"}
        </Heading>
      </Box>
      {album && album.img ? (
        <Image source={{ uri: album.img }} borderRadius={200} alt={album.album} size="2xl" />
      ) : (
        <Text color={"white"}>Imagem Indisponível</Text>
      )}
      <TouchableOpacity style={{ marginTop: 10 }} onPress={() => addFav(album && album.id ? album.id : "")}>
        <Icon name={isFavorite ? "heart-dislike" : "heart"} color={"#FFF"} size={40} />
      </TouchableOpacity>
      <Box alignSelf={"flex-start"} mt={10}>
        {album && album.topMusicas && album.topMusicas.length > 0 ? (
          <>
            <Text color={"secondary.100"}>
              Top Músicas <Icon name="musical-note-sharp" size={20} />
            </Text>
            {/* Renderização das músicas */}
          </>
        ) : (
          <Text color={"secondary.100"}>Não há músicas disponíveis.</Text>
        )}
      </Box>
    </Flex>
  );
}
