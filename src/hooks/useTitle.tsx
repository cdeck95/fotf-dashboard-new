import React, { useEffect } from "react";

export const useTitle = (title: string): void => {
  useEffect(() => {
    document.title = `${title}`;
  }, []);
};