import { useEffect } from 'react';

const useFocus = (ref, dependency = null) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref, dependency]);
};

export default useFocus;
