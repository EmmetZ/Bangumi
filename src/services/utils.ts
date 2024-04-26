import { ICON_PLACEHOLDER } from '../constant';

interface SortedData<T> {
  [key: string]: T[];
}

interface MergedData<T> {
  [key: string]: T;
}

export const transSummary = (data: string) => {
  if (!data) return '暂无简介';
  let phrase = data.split('\r\n');
  while (true) {
    let length = phrase.length;
    if (phrase[length - 1].length === 0) phrase = phrase.slice(0, -1);
    else break;
  }
  return phrase;
};

export const getAvatarUrl = (url: string, defaultUrl = ICON_PLACEHOLDER) => {
  if (!url) return defaultUrl;
  return url.replace('crt/l', 'crt/g');
};

export const sortData = <T extends Record<string, any>>(
  data: T[],
  filter: keyof T,
  value?: any[]
): SortedData<T> => {
  let sortedData: SortedData<T> = {};
  data.forEach((item) => {
    if (value && !value.includes(item[filter])) return;
    if (!sortedData[item[filter]]) {
      sortedData[item[filter]] = [];
    }
    sortedData[item[filter]].push(item);
  });
  return sortedData;
};

export const getSubjectAvatar = (url: string, size = 100) => {
  return url.replace(RegExp('/r/\\d+/'), `/r/${size}x${size}/`);
};

export const merge = <T extends Record<string, any>>(
  data: T[],
  filter: keyof T,
  mergeKey: keyof T
) => {
  let mergedData: MergedData<T> = {};
  data.forEach((item) => {
    if (!mergedData[item[filter]]) {
      mergedData[item[filter]] = deepCopy(item);
      return;
    }
    let m = mergedData[item[filter]][mergeKey];
    let i = item[mergeKey];
    if (Array.isArray(m)) {
      if (Array.isArray(i))
        (mergedData[item[filter]][mergeKey] as any[]).push(...(i as any[]));
      else (mergedData[item[filter]][mergeKey] as any[]).push(i);
    } else if (!Array.isArray(i))
      (mergedData[item[filter]][mergeKey] as any[]) = [m, i];
  });
  return Object.values(mergedData);
};

const deepCopy = <T>(data: T): T => {
  return JSON.parse(JSON.stringify(data));
};