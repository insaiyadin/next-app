import Link from "next/link";
import "../globals.css";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Providers from "../Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <section>
          <Link href="/protected">Protected</Link>
          <Link href="/api/auth/signin">Sign in</Link>
          <Link href="/api/auth/signout">Sign out</Link>
        </section>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
