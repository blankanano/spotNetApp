import { createContext } from "react";
import { MMKV } from "react-native-mmkv";

export type RootStackParamList = {
  Wrapper: { id: number } | undefined;
  Home: { id: number } | undefined;
  Albums: { id: number } | undefined;
  Artist: { id : string, name : string, img : string } | undefined;
};

// Definição de tipo para os detalhes do usuário
export type IUser = {
  name: string;
  email: string;
  password: string;
  token: string;
};

// Definição do contexto do usuário
type IUserContext = {
  user: IUser | null; // Informações do usuário
  setUser: (userData: IUser | null) => void; // Função para atualizar as informações do usuário
};

// ID para armanezagem no dispositivo
export const storage = new MMKV({
  id: 'movieapp'
});

// Criação do contexto com valores padrão
const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
} as IUserContext);

export default UserContext;
