import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { sortData } from '../services/utils';
import '../styles/ep_manager.css';
import { Episode } from '../types';
import EMListItem, { EMListDivider } from './ep_manager_contents';
import { useSubjectsContext } from '../contexts/subject';

const { Title } = Typography;

const EpManager = () => {
  const eps = useSubjectsContext('eps');
  const navigate = useNavigate();
  const sortedEp = sortData(eps, "type", [0, 1]);
  // console.log(sortedEp);
  return (
    <>
      <Title level={4} style={{ margin: 0, padding: 0 }}>
        进度管理
        <Button
          type='link'
          className='more-eps'
          onClick={() => navigate(`./ep`)}
        >
          {'更多>>'}
        </Button>
      </Title>
      <div className='ep-manager-container'>
        {Object.keys(sortedEp).map((key) =>
          sortedEp[key].map((ep, index) => {
            if (ep.type === 0 || index !== 0)
              return <EMListItem ep={ep} key={ep.id} />;
            else if (ep.type === 1 && index === 0)
              return (
                <Fragment key={ep.id}>
                  <EMListDivider text='SP' />
                  <EMListItem ep={ep} />
                </Fragment>
              );
          })
        )}
      </div>
    </>
  );
};

export default EpManager;
