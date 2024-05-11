import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { signInSchema } from "./utils/zod/zod";
import { userSignIn } from "./api/user";
import { ZodError } from "zod";
import { clientRoutes } from "./utils/constant";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google,
    credentials({
      id: "credentials",
      type: "credentials",
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials,
          );

          const user = (await userSignIn({ email, password }))?.data;

          if (!user) return null;
          return user;
        } catch (error) {
          if (error instanceof ZodError) return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  jwt: { maxAge: 3600 },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        user.token = token;
        return token;
      }
      return token;
    },
    session({ token, session }) {
      session.user.token = token;
      return session;
    },
  },
  pages: {
    signIn: clientRoutes.signIn,
    signOut: "",
  },
});
