import React, { useEffect } from "react";

export default (ref, dependency) => {
  useEffect(() => {
    ref.current.focus();
  }, [ref]);
  useEffect(() => {
    ref.current.select();
  }, [dependency]);
};
