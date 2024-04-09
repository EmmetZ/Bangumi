import { CollectionType, Subject, SubjectType } from "../types";

export type ImgType = "small" | "grid" | "large" | "medium" | "common";

export interface UserCollectionQuery {
  subject_type: SubjectType;
  type: CollectionType;
  limit: number;
  offset: number;
}

// user collection fetch response type
export interface Response<T> {
  data: T[];
  limit: number;
  offset: number;
  total: number;
}

export interface Collection {
  ep_status: number;
  rate: number;
  updated_at: string;
  subject: Subject;
}
