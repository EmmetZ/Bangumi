import { Dispatch, createContext, useContext } from "react";
import { Character } from "../types";

export interface TCharacterContext {
  characters: Character[] | undefined;
  setCharacter: Dispatch<Character[]>;
}

const CharacterContext = createContext<TCharacterContext>({} as TCharacterContext);

export const useCharacterContext = () => useContext(CharacterContext);

export default CharacterContext;