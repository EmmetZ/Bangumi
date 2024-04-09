import { Dispatch, createContext, useContext } from "react";
import { Episode } from "../types";

export interface TEpisodeContext {
  episodes: Episode[] | undefined;
  setEpisode: Dispatch<Episode[]>;
}

const EpisodeContext = createContext<TEpisodeContext>({} as TEpisodeContext);

export const useEpisodeContext = () => useContext(EpisodeContext);

export default EpisodeContext;