import { useEffect } from 'react';

const useFocus = (ref, dependency = null) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref, dependency]);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);
};

export default useFocus;
