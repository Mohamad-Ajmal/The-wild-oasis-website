import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// NextAuth Configuration
export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
};

// Initialize NextAuth
const handler = NextAuth(authConfig);

// Export handler and authConfig
export { handler };