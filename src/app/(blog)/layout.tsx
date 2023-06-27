import Link from "next/link";
import "../globals.css";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
          {session?.user?.email} <br />
          <Link href="/protected">Protected</Link>
          {!session && <Link href="/api/auth/signin">Sign in</Link>}
          {session && <Link href="/api/auth/signout">Sign out</Link>}
        </section>
        {children}
      </body>
    </html>
  );
}
