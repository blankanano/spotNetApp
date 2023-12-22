import { createContext } from "react";

export type IAlbum = {
    id: string;
    album: string;
    img: string;
    music: string;
}

type IAlbumContext = {
    album: IAlbum | null;
    setAlbum: (albumData: IAlbum | null) => void;
}

export const favAlbums: IAlbum[] = [];

export function addFavAlbum(id: string, albumsContext: IAlbum[]) {
    const fav = albumsContext.find((element) => element.id === id);
    favAlbums.push(fav!);
}

export function removeFavAlbum(id: string) {
    const fav = favAlbums.find((element) => element.id === id);
    favAlbums.splice(favAlbums.indexOf(fav!), 1);
}

export const albumsContext: IAlbum[] = [];

export const musicsDemo = [
    { id: '1', name: 'Oh My God' },
    { id: '2', name: 'Poupa no chão' },
    { id: '3', name: 'Derere Dow Dow' },
    { id: '4', name: 'Não Precisa Coreção' },
    { id: '5', name: 'Bla Bla Bla' },
    { id: '6', name: 'Tapinha' },
    { id: '7', name: 'Carinhosamente' },
]

const AlbumContext = createContext<IAlbumContext | null>({ album: null, setAlbum: () => { } });

export default AlbumContext;