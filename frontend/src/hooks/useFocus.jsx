import { useEffect } from 'react';

const useFocus = (ref, dependency = null) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [dependency]);
};

export default useFocus;
