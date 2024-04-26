import { useParams } from 'react-router-dom';
import ErrorModal from '../components/error_modal';
import { useSubjectPerson } from '../hooks/useSubject';
import { getAvatarUrl, merge } from '../services/utils';
import { Card, Flex, FloatButton, Space, Spin, Tag, Typography } from 'antd';
import CustomImg from '../components/custom_img';
import { PERSON_PLACEHOLDER } from '../constant';

const { Text } = Typography;

const PersonPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useSubjectPerson(parseInt(id!));
  if (isLoading) return <Spin />;
  if (error || !data) return <ErrorModal error={error} />;

  const data1 = merge(data, 'name', 'relation'); // todo 调整制作人顺序
  // console.log(data1);
  return (
    <>
      {data1.map((person) => {
        return (
          <Card
            key={person.id}
            style={{ border: 0 }}
            styles={{ body: { padding: 12 } }}
          >
            <Flex>
              <CustomImg
                imgUrl={
                  person.images
                    ? getAvatarUrl(person.images.large, PERSON_PLACEHOLDER)
                    : PERSON_PLACEHOLDER
                }
                size={77}
                borderRadius={10}
              />
              <Flex vertical style={{ margin: '0px 15px' }}>
                <Text style={{ fontSize: '18px', color: '#444444' }}>
                  {person.name}
                </Text>
                <Space.Compact style={{ marginTop: '3px'}}>
                  {typeof person.relation !== 'string' ? (
                    person.relation.map((r) => {
                      return <Tag key={r} style={{ color: "#909090"}}>{r}</Tag>;
                    })
                  ) : (
                    <Tag style={{ color: "#909090"}}>{person.relation}</Tag>
                  )}
                </Space.Compact>
              </Flex>
            </Flex>
          </Card>
        );
      })}
      <FloatButton.BackTop />
    </>
  );
};

export default PersonPage;
