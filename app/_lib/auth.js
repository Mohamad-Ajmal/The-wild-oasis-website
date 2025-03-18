import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

// NextAuth Configuration
export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
   authorized({auth, request}) {
    return !!auth?.user;
   }, 
   async signIn({user, account, profile}){
    try {
      const existingGuest =  await getGuest(user.email);
      if(!existingGuest) await createGuest({email: user.email, fullName: user.name});
      return true;
    } catch (error) {
      return false;
    }
   },
   async session({ session, user }){
    const guest  = await getGuest(session.email);
    session.user.guestId = guest?.id;
    return guest;

   },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth, 
  signIn,
  signOut,
  handlers: {GET, POST},
} = NextAuth(authConfig);