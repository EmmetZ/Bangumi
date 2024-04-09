import { Alert, Button, Form, FormProps, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/user';
import ApiClient from '../services/api_client';

type FieldType = {
  userId: number;
};

const LoginPage = () => {
  const { user, dispatch } = useUserContext();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = () => {
    setError(undefined);
    const client = new ApiClient();
    const userId = form.getFieldValue('userId');
    if (userId) {
      setLoading(true);
      client
        .getUser(userId)
        .then((res) => {
          dispatch({ type: 'set', value: res });
          setLoading(false);
          navigate('/');
        })
        .catch((err) => {
          // console.error(err);
          setError(err);
          setLoading(false);
        });
    }
  };
  return (
    <div className='login-card'>
      <Form
        name='login'
        style={{ margin: 'auto' }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item<FieldType>
          name='userId'
          label='User ID'
          initialValue={user?.id}
          rules={[{ required: true, message: 'Please input your user ID' }]}
        >
          <Input
            onChange={(e) => form.setFieldValue('userId', e.target.value)}
          />
          {error && (
            <Alert
              message={error.message}
              type='error'
              showIcon
              style={{ margin: 5 }}
            />
          )}
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
