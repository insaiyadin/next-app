"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  useEffect(() => {
    console.log(session.data);
    if (session.status === "loading") {
      return;
    }
    if (
      session.status === "unauthenticated" ||
      !(session.data?.user as any).isValid
    ) {
      signOut();
    }
  }, [session]);

  return <>{children}</>;
};
