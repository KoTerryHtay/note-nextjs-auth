import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userName: string;
      email: string;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  basePath: "/api/auth",
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        id: {},
        userName: {},
        email: {},
      },
      authorize: async (credentials): Promise<User | null> => {
        const user = {
          id: credentials.id as string,
          name: credentials.userName as string,
          email: credentials.email as string,
        };

        // console.log("credentials >>>", credentials);
        // console.log("credentials user >>>", user);

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.sub,
          name: token.name,
          email: token.email,
        },
      };
    },
  },
});
