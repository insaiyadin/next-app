"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./AuthProvider";

interface Props {
  children: ReactNode;
}

function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
}

export default Providers;
