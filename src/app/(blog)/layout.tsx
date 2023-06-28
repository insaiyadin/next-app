import Link from "next/link";
import "../globals.css";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Providers from "../SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <section>
          {session && (
            <>
              {/* <span className="m-1">{JSON.stringify(session)}</span> */}
              <Link className="m-1" href="/protected">
                Protected
              </Link>
              <Link className="m-1" href="/api/auth/signout">
                Sign out
              </Link>
            </>
          )}
          {!session && (
            <>
              <Link className="m-1" href="/api/auth/signin">
                Sign in
              </Link>
              <Link className="m-1" href="/auth/signup">
                Sign up
              </Link>
            </>
          )}
        </section>
        {session ? <Providers>{children}</Providers> : children}
      </body>
    </html>
  );
}
