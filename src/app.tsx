import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Spin } from 'antd';
import { useEffect, useReducer, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import UserContext, { useUserContext, userReducer } from './contexts/user';
import router from './router';
import { UpdateInterceptor, getUser } from './services/api';
import axios from 'axios';

const queryClient = new QueryClient();

const App = () => {
  const userId = import.meta.env.VITE_USER_ID ?? -1;
  // const userId = -1
  const [state, dispatch] = useReducer(userReducer, { user: undefined });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (userId === -1) {
      setLoading(false);
      return;
    }
    getUser(parseInt(userId))
      .then((res) => {
        dispatch({ type: 'set', user: res });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (userId !== -1 && state.user === undefined && isLoading)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin />
      </div>
    );
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ state, dispatch }}>
        <UpdateInterceptor />
        <RouterProvider router={router} />
      </UserContext.Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
