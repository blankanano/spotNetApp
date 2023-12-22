import { Image, Card as CardNative } from "native-base";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-ionicons";
import { IAlbum } from "../../context/album";
import { useAlbumContext } from "../../context/albumContext";

interface Props {
  id: string;
  description?: string;
  music?: string;
  album?: string;
  img?: string;
  setSelectedAlbum?: (album: string) => void;
  setSelectedId: (id: string) => void;
}

export default function Card({
  img,
  music,
  id,
  album,
  setSelectedAlbum,
  setSelectedId,
}: Props) {
  const { albums, addFavAlbum, removeFavAlbum } = useAlbumContext();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (albums.find((elem: IAlbum) => elem.id === id)) {
      setIsFavorite(true);
    }
  }, [albums, id]);

  const addFav = () => {
    if (!isFavorite) {
      addFavAlbum(id);
      setIsFavorite(true);
    } else {
      removeFavAlbum(id);
      setIsFavorite(false);
    }
  };

  return (
    <>
      <CardNative>
        <TouchableOpacity onPress={() => setSelectedId(id)}>
          <Image source={{ uri: img }} alt="Alternate Text" size="xl" m={2} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 10 }} onPress={addFav}>
          {isFavorite ? (
            <Icon name="heart-dislike" color={"#FFF"} size={20} />
          ) : (
            <Icon name="heart" color={"#FFF"} size={20} />
          )}
        </TouchableOpacity>
      </CardNative>
    </>
  );
}