// import { NextResponse } from "next/server"

// export function middleware(request) {

//     const url = new URL('/about', request.url);
//     return NextResponse.redirect(url);
// }
import {auth} from "@/app/_lib/auth";
export const middleware = auth;
// Protect only the "/account" route
export const config = {
matcher: ['/account'],  
};
