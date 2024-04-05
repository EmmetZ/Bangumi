import { Card } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

interface Props {
  id: number;
  imgUrl: string;
  name: string;
  date: string;
}

const SubjectCard = ({ id, imgUrl, name, date }: Props) => {
  const navigate = useNavigate();
  const [isShrunk, setIsShrunk] = useState(false);
  const handleMouseDown = () => {
    setIsShrunk(true);
  };

  const handleMouseUp = () => {
    setIsShrunk(false);
  };

  return (
    <Card
      className={isShrunk ? 'shrink' : 'shrink-back'}
      hoverable
      cover={
        <img
          className="collection-card-cover"
          alt={name}
          src={imgUrl}
          draggable="false"
        />
      }
      style={{ width: "100%", backgroundColor: "transparent" }}
      onClick={() => navigate(`/subject/${id}`)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Meta title={name} description={date} style={{ margin: '-15px -15px'}}/>
    </Card>
  );
};

export default SubjectCard;
