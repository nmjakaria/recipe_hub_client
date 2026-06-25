//lib/core/session.js
"use server"
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";
import { unstable_noStore } from "next/cache";

export const getUserSession = async () => {
    unstable_noStore();
    const session = await auth.api.getSession({
        headers: await headers() // some endpoints might require headers
    })

    return session?.user || null;
}

export const getUserToken = async () => {
    unstable_noStore()
    const {token} = await auth.api.getToken({
        headers: await headers()
    });
    return token || null;
}

export const requireRole = async(role) =>{
    const user = await getUserSession()
    if(!user){
        redirect('/auth/signin')
    }
    if(user?.role !== role){
        redirect('/unauthorized')
    }
    return user;
}