interface Props {
  className?: string;
  imgUrl: string;
  borderRadius: number;
  size: number;
}

const CustomImg = ({ className, imgUrl, size, borderRadius }: Props) => {
  return (
    <span
      className={'border-shadow' + (className ? ` ${className}` : '')}
      draggable='false'
      style={{
        backgroundImage: `url(${imgUrl})`,
        display: 'inline-block',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${borderRadius}px`,
        aspectRatio: '1/1',
        backgroundSize: 'cover',
      }}
      // onClick={() => navigate(`/subject/${item.id}`)}
    />
  );
};

export default CustomImg;
