
export interface SortedData<T> {
  [key: string]: T[];
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

export const getAvatarUrl = (url: string) => {
  return url.replace('crt/l', 'crt/g');
};

export const sortData = <T extends Record<string, any>>(
  data: T[],
  filter: string,
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