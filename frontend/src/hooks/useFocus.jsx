import React, { useEffect } from "react";

export default (ref, dependency) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [dependency]);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);
};
