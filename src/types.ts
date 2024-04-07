import exp from "constants";
import { ImgType } from "./hooks/types";

/** 
collectionType
1: 想看
2: 看过
3: 在看
4: 搁置
5: 抛弃
*/
export type CollectionType = 1 | 2 | 3 | 4 | 5;

/**
subjectType
1: 书籍
2: 动画
3: 音乐
4: 游戏
6: 三次元
*/
export type SubjectType = 1 | 2 | 3 | 4 | 6;

/**
EpType
0: 本篇 
1: 特别篇
2: OP
3: ED
4: 预告/宣传/广告
5: MAD
6: 其他
  */
export type EpType = 0 | 1 | 2 | 3 | 4 | 5 | 6

// user collection context state type
// {
//   subject_type: subjectType,
//   type: collectionType
// }

export interface Subject {
  id: number;
  eps: number;
  date: string;
  images: Record<ImgType, string>;
  name: string;
  name_cn: string;
  score: number;
  summary: string;
  // short_summary: string;
  platform: string;
  tags: SubjectTag[];
  infobox: InfoBoxItem[];
  rating: Rating;
  collection: {
    on_hold: number;
    dropped: number;
    wish: number;
    collect: number;
    doing: number;
  };
  relation: string;
  type: number;
}

export interface SubjectTag {
  name: string;
  count: number;
}

export interface Rating {
  rank: number;
  total: number;
  score: number;
  count: {
    [key: number]: number;
  };
}

export interface InfoBoxItem {
  key: string;
  value: string | { v: string }[];
}

export interface Character {
  id: number;
  name: string;
  type: number;
  images: Record<ImgType, string>;
  relation: string;
  actors: Actor[];
}

export interface Actor {
  images: Record<ImgType, string>;
  name: string;
  id: number;
}

export interface User {
  avatar: {
    large: string;
    medium: string;
    small: string;
  };
  sign: string;
  username: string;
  nickname: string;
  id: number;
  // user_group: 1;
}

export interface Episode {
  airdate: string;
  comment: number;
  desc: string;
  duration: string;
  id: number;
  name: string;
  name_cn: string;
  sort: number;
  subject_id: number;
  ep: number;
  type: EpType;
}