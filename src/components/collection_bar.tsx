import { Button, Flex, Grid, Select } from "antd";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useCollectionContext } from "../contexts/collection";
import { CollectionType } from "../types";

const { useBreakpoint } = Grid;

interface Props {
  onCollapsed: () => void;
}

const CollectionBar = ({ onCollapsed }: Props) => {
  const { types, dispatch } = useCollectionContext();
  const value = [1, 2, 3, 4, 5];
  const lg = useBreakpoint().lg

  let labels: string[];
  if (types.subject_type === 4) {
    labels = ["想玩", "玩过", "在玩", "搁置", "抛弃"];
  } else if (types.subject_type === 3) {
    labels = ["想听", "听过", "在听", "搁置", "抛弃"];
  } else {
    labels = ["想看", "看过", "在看", "搁置", "抛弃"];
  }

  if (!lg) 
    return (
      <Flex gap='small'>
        <Button 
          onClick={onCollapsed}
          icon={<AiOutlineMenuUnfold />}
        />
        <Select
          value={value[types.type - 1]}
          defaultValue={types.type}
          options={labels.map((l, index) => ({ value: value[index], label: l }))}
          onChange={(value) => {
            dispatch({ type: "collection", value: value as CollectionType });
          }}
        />
      </Flex>
    );

  return (
    <Flex gap="middle">
      {labels.map((l, index) => (
        <Button
          type={index + 1 === types.type ? "primary" : "dashed"}
          key={value[index]}
          onClick={() => dispatch({ type: "collection", value: (index + 1) as CollectionType })}
        >
          {l}
        </Button>
      ))}
    </Flex>
  );
};

export default CollectionBar;
