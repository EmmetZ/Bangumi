import { Button, Form, FormProps, Input } from 'antd';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/user';
import ApiClient from '../services/api_client';

type FieldType = {
  userId: number;
};

const LoginPage = () => {
  const { dispatch } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const client = new ApiClient();
    if (values.userId) {
      setLoading(true);
      client
        .getUser(values.userId)
        .then((res) => {
          dispatch({ type: 'set', value: res });
          setLoading(false);
          navigate('/');
        })
        .catch((err) => {
          // console.error(err);
          setLoading(false);
        });
    }
  };
  return (
    <div className='login-card'>
      <Form name='login' style={{ margin: 'auto' }} onFinish={onFinish}>
        <Form.Item<FieldType>
          name='userId'
          label='User ID'
          rules={[{ required: true, message: 'Please input your user ID' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
