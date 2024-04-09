import { createContext, useContext } from "react";
import { Subject } from "../types";

const SubjectContext = createContext<Subject>({} as Subject);

export const useSubjectContext = () => useContext(SubjectContext);

export default SubjectContext;