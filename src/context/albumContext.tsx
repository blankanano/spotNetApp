import { createContext, useContext, useState, ReactNode } from "react";

export type IAlbum = {
  id: string;
  album: string;
  img: string;
};

type IAlbumContext = {
  albums: IAlbum[];
  addFavAlbum: (id: string) => void;
  removeFavAlbum: (id: string) => void;
};

export const AlbumContext = createContext<IAlbumContext | null>(null);

type AlbumProviderProps = {
  children: ReactNode;
};

export const AlbumProvider: React.FC<AlbumProviderProps> = ({ children }) => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);

  const addFavAlbum = (id: string) => {
    const fav = albums.find((element) => element.id === id);
    // Add your logic for adding favAlbums here
  };

  const removeFavAlbum = (id: string) => {
    const fav = albums.find((element) => element.id === id);
    // Add your logic for removing favAlbums here
  };

  const albumContextValue: IAlbumContext = {
    albums,
    addFavAlbum,
    removeFavAlbum,
  };

  return (
    <AlbumContext.Provider value={albumContextValue}>
      {children}
    </AlbumContext.Provider>
  );
};

export const useAlbumContext = () => {
  const context = useContext(AlbumContext);
  if (!context) {
    throw new Error("useAlbumContext must be used within an AlbumProvider");
  }
  return context;
};