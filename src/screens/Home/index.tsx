import { Box, Flex, HStack, IconButton, Text } from "native-base";
import { useContext, useEffect, useState } from "react";
import UserContext, { RootStackParamList, storage } from "../../context/user";
import { FlatList } from "react-native";
import Card from "../../components/Card";
import Selected from "../../components/Selected";
import Storie from "../../components/Storie";
import { getAlbums, getStories } from "../../services/albuns";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AlbumContext, { IAlbum, albumsContext } from "../../context/album";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Home() {

    const userData = useContext(UserContext);
    const albumData = useContext(AlbumContext);
    
    // const [selectedAlbum, setSelectedAlbum] = useState("");
    // const [selectedId, setSelectedId] = useState("0");
    // const [albums, setAlbums] = useState([] as any);
    // const [stories, setStories] = useState();
    // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [selectedAlbum, setSelectedAlbum] = useState("");
    const [selectedId, setSelectedId] = useState<string | null>(null); // Alteração aqui
    const [albums, setAlbums] = useState<IAlbum[]>([]);
    const [stories, setStories] = useState();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    // useEffect(() => {
    //     if (selectedId !== "0" && albums) {
    //         const album = albums.find((element:any) => element.id === selectedId);
    //         navigation.navigate("Albums", { id: album.id });
    //         //navigation.navigate("Albums", { album: album });           
    //     }        
        
    // }, [selectedId]);

    useEffect(() => {
        if (selectedId && +selectedId !== 0 && albums) {
            const album = albums.find((element: any) => element.id === selectedId);
            if (album) {
                navigation.navigate("Albums", { id: album.id });
            }
        }
    }, [selectedId, albums, navigation]);

    // useEffect(() => {
    //     if(albums && albums != undefined){
    //         if(albumsContext.length !== albums.length){
    //             albumsContext.splice(0, albumsContext.length)
    //             albumsContext.push(...albums);
    //         }
    //     }
    // }, [albums]); 

    useEffect(() => {
        if(albums && albums != undefined){
            if(albumsContext.length !== albums.length){
                albumsContext.splice(0, albumsContext.length)
                albumsContext.push(...albums);
            }
        }
    }, [albums]);     

    useEffect(() => {
        if (userData && userData.user && userData.user.token) {
            getAlbums(userData.user.token).then(response => setAlbums(response.data)).catch(e => console.log("erro", e));
            getStories(userData.user.token).then(response => setStories(response.data)).catch(e => console.log("erro", e));      
            console.log(userData);
        }
    }, []);

    const logout = () => {
        const userDb = storage.getString("user");
        storage.delete("user");
        userData.setUser(null);
    }

    useEffect(() => {
        if (!userData || !userData.user || !userData.user.token) {
            navigation.navigate('Wrapper');
        }
    }, [userData])


    return (
        <Flex safeAreaTop p={5} flex={1} justifyContent='center' alignItems='center' bg={"primary.100"}>
            <HStack px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" maxW="350">
                <HStack alignItems="center">
                <Text color="white" fontSize="20" fontWeight="bold">
                    Olá, {userData.user ? userData.user.name : 'Usuário'}
                </Text>
                </HStack>
                <HStack>
                    <IconButton alignSelf={"flex-end"} ml={4} style={{ backgroundColor: "#FFF", borderRadius: 100 }} onPress={logout} _icon={{
                        as: MaterialIcons,
                        name: "logout",
                        color: "primary.100"
                    }} />
                </HStack>
            </HStack>

            <Box h={"3xs"}>
                {/* Stories */}
                <Text style={{ color: "#FFF" }} fontSize={'xs'} alignSelf={"flex-start"}>Artistas mais ouvidos</Text>
                <FlatList style={{ marginTop: "5%" }} horizontal={true} data={stories} renderItem={({ item }) => <Storie id={item.id} name={item.name} img={item.img} />} />
            </Box>
            
            <Text style={{ color: "#FFF" }} mt={"12"} fontSize={'xs'} alignSelf={"flex-start"}>Albuns mais ouvidos</Text>
            {/* Albuns */}
            <FlatList horizontal={true}
                data={albums}
                renderItem={({ item }) => <Card setSelectedId={setSelectedId} id={item.id} music={item.music} img={item.img} />}
                keyExtractor={(item) => item.id}
            />
            {
                selectedAlbum && selectedAlbum.toString() !== "" ? (<Selected text={selectedAlbum} />) : <></>
            }
        </Flex>
    );
}