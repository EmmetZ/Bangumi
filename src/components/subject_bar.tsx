import { Button, Grid, Layout, Menu, theme } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { AiOutlineMenuFold } from "react-icons/ai";
import { useCollectionContext } from "../contexts/collection";
import { SubjectType } from "../types";

const { Sider } = Layout;
const { useBreakpoint } = Grid;

interface Props {
  collapsed: boolean;
  onCollapsed: () => void;
}
const SubjectBar = ({ collapsed, onCollapsed }: Props) => {
  const { dispatch } = useCollectionContext();

  const { lg } = useBreakpoint();
  const subjectValue: SubjectType[] = [2, 1, 3, 4, 6];
  const menuItems = ["动画", "书籍", "音乐", "游戏", "三次元"].map(
    (item, index) =>
      ({
        key: String(index + 1),
        label: item,
        onClick: () => {
          dispatch({ type: "subject", value: subjectValue[index] });
          onCollapsed();
        },
      } as ItemType<MenuItemType>)
  );
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      width="120px"
      style={
        lg
          ? {
              height: "100%",
            }
          : {
              //   margin: "10px",
              // border: "8px solid #ffffff",
              // border: '8px solid pink',
              // height: "100%",
              zIndex: 1000,
              position: "absolute",
            }
      }
      trigger={null}
      collapsed={lg ? false : collapsed}
    >
      {!lg && (
        <Button
          onClick={onCollapsed}
          icon={<AiOutlineMenuFold />}
          style={{
            width: "100%",
            border: "none",
            borderRadius: 0,
            borderBottom: "1px solid #f0f0f0",
          }}
        />
      )}
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={menuItems}
        style={{
          // borderRadius: borderRadiusLG,
          // backgroundColor: "pink",
          // border: "#ffffff",
          zIndex: 1000,
        }}
      />
    </Sider>
  );
};

export default SubjectBar;
