import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // jwt: {
  //   maxAge: 30,

  // },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
          value: "test@test.pl",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
          value: "asdf",
        },
      },
      async authorize(credentials) {
        const response = await fetch("http://localhost:8000/auth/signin", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = (await response.json()) as {
          user: { email: string };
          accessToken: string;
          expiresAt: string;
        };

        cookies().set("api-token", data.accessToken, {
          httpOnly: true,
          expires: new Date(data.expiresAt),
        });

        return {
          id: "123",
          email: data.user.email,
        };
      },
    }),
  ],
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    jwt: async ({ token, user }) => {
      const apiToken = cookies().get("api-token");
      token.isValid = !!apiToken;
      return token;
    },
    session: async ({ session, token }) => {
      (session.user as any).isValid = token.isValid;
      return session;
    },
  },
  events: {
    signOut(message) {
      const token = cookies().get("api-token");
      if (token) {
        console.log("Invalidate Token");
      }
    },
  },
  secret: "supersecret",
};
