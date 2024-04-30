import { Alert, Button, Form, FormProps, Input } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/user';
import { getAccessToken, getAuthUrl } from '../services/auth';
import { getMe, getUser } from '../services/api';
import { OAuthInfo } from '../types';

type FieldType = {
  userId: number;
};

const LoginPage = () => {
  const { state, dispatch } = useUserContext();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const hasFetchedToken = useRef(false);
  const [token, setToken] = useState<OAuthInfo>();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  const onFinish: FormProps<FieldType>['onFinish'] = () => {
    setError(undefined);
    const userId = form.getFieldValue('userId');
    if (userId) {
      setLoading(true);
      getUser(userId)
        .then((res) => {
          dispatch({ type: 'set', user: res });
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

  useEffect(() => {
    // console.log('hasFetchedToken:', hasFetchedToken)
    if (code && !hasFetchedToken.current) {
      // console.log('code:', code);
      // console.log('hasFetchedToken:', hasFetchedToken)
      getAccessToken(code)
        .then((res) => {
          setToken(res.data);
          dispatch({ type: 'auth', auth: res.data });
          if (process.env.NODE_ENV === 'development') {
            hasFetchedToken.current = true;
          }
        })
        .catch((err) => {
          // console.error(err);
          // setError(err);
          throw err;
        });
    }
  }, [code]);

  useEffect(() => {
    if (token) {
      getMe({ headers: { Authorization: `${token.token_type} ${token.access_token}` }})
        .then((res) => {
          dispatch({ type: 'set', user: res });
          navigate('/');
        })
        .catch((err) => {
          throw err;
          // setError(err);
        });
    }
  });

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
          initialValue={state.user?.id}
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
          <div>
            <Button type='primary' htmlType='submit' loading={isLoading}>
              Login
            </Button>
            <Button>
              <a href={getAuthUrl()}>
                login with Bangumi
              </a>
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
