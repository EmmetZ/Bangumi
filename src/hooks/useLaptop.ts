import { useMediaQuery } from 'react-responsive';

const useLaptop = () => useMediaQuery({ query: '(min-width: 768px)' });

export default useLaptop;
