import { Dispatch, createContext, useContext } from "react";
import { CollectionType, SubjectType } from "../types";

interface CollectionState {
  subject_type: SubjectType;
  type: CollectionType;
}

// user collection context action type
interface CollectionAction {
  type: "subject" | "collection";
  value: SubjectType | CollectionType;
}

// user collection context type
interface TCollectionContext {
  types: CollectionState;
  dispatch: Dispatch<CollectionAction>;
}

export const collectionReducer = (state: CollectionState, action: CollectionAction) => {
  switch (action.type) {
    case "subject":
      return { ...state, subject_type: action.value } as CollectionState;
    case "collection":
      return { ...state, type: action.value } as CollectionState;
  }
};

const CollectionContext = createContext<TCollectionContext>(
  {} as TCollectionContext
);

export const useCollectionContext = () => useContext(CollectionContext);

export default CollectionContext;