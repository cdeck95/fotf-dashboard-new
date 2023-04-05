import React, { useEffect } from "react";

export const getAllNFTS = (title: string): void => {
  useEffect(() => {
    document.title = `${title}`;
  }, []);
};