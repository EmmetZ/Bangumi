import { Dispatch, createContext, useContext } from "react";
import { DSCharacter } from "../types";

export interface TCharacterContext {
  characters: DSCharacter[] | undefined;
  setCharacter: Dispatch<DSCharacter[]>;
}

const CharacterContext = createContext<TCharacterContext>({} as TCharacterContext);

export const useCharacterContext = () => useContext(CharacterContext);

export default CharacterContext;