import { useEffect } from 'react';

const useSelect = (ref, dependency = null) => {
  useEffect(() => {
    ref.current.focus();
  }, [ref]);
  useEffect(() => {
    ref.current.select();
  }, [dependency]);
};
export default useSelect;
