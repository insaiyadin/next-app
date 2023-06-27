import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 30,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: "1", name: "Admin", email: credentials?.email };
        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token = user as unknown as { [key: string]: any };
      console.log(new Date().toLocaleTimeString());
      console.log(token);

      console.log(new Date((token["exp"] as number) * 1000));

      return token;
    },
    session: async ({ session, token }) => {
      session.user = { ...token };
      return session;
    },
  },
  secret: "supersecret",
};
