import { createContext } from "react";

// Definição de tipo para os detalhes do usuário
export type IUser = {
  name: string;
  email: string;
  token: string | null;
};

// Definição do contexto do usuário
type IUserContext = {
  user: IUser | null;  // Informações do usuário
  setUser: (userData: IUser) => void;  // Função para atualizar as informações do usuário
};

// Criação do contexto com valores padrão
const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

export default UserContext;
