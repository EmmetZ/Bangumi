export const transSummary = (data: string) => {
  if (!data) return "暂无简介";
  let phrase = data.split("\r\n");
  // console.log(phrase);
  while (true) {
    let length = phrase.length;
    if (phrase[length - 1].length === 0) 
      phrase = phrase.slice(0, -1);
    else break;
  }
  return <>{phrase.map((p, i) => [p, <br key={i} />])}</>;
};

export const getAvatarUrl = (url: string) => {
  return url.replace("crt/l", "crt/g");
};
