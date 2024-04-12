import { useState } from 'react';

const useHelper = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  return {
    states: { isLoading, error },
    dispatches: {
      setError,
      setLoading,
    },
  };
};

export default useHelper;