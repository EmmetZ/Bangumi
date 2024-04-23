import { Button, Divider, Space } from "antd";
import { InfoBoxItem } from "../types";

interface Props {
  info: InfoBoxItem[];
}

const speItem = [
  "播放电视台",
  "其他电视台",
  "Copyright",
  "官方网站",
  "放送结束",
  "播放结束",
];

const InfoColumn = ({ info }: Props) => {
  const spe = info.filter(({ key }) => speItem.includes(key));
  return (
    <Space.Compact direction="vertical" style={{ marginTop: 5, width: "100%" }}>
      {info.map(
        ({ key, value }) =>
          !speItem.includes(key) && (
            <Entry label={key} value={value} key={key} />
          )
      )}
      {spe.length > 0 &&
        spe.map(({ key, value }) => (
          <Entry label={key} value={value} key={key} />
        ))}
      <Button type="default">+更多制作人员</Button>
    </Space.Compact>
  );
};

interface EntryProps {
  label: string;
  value: string | { v: string }[];
}

const Entry = ({ label, value }: EntryProps) => {
  return (
    <div>
      <div style={{ marginBottom: "2px" }}>
        <span style={{ color: "#666" }}>{label}: </span>
        <span style={{ color: "#222", wordBreak: "break-all" }}>
          {Array.isArray(value)
            ? value.map(({ v }, index) => {
                if (index === value.length - 1) return v;
                return v + " / ";
              })
            : value}
        </span>
      </div>
      <Divider style={{ margin: "3px 0" }} />
    </div>
  );
};

export default InfoColumn;
