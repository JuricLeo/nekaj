"use client";

import { useState } from "react";
import { useEffect } from "react";

const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return <div>{children}</div>;
};

export default LangProvider;
