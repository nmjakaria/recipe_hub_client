// src/proxy.js
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from './lib/auth'


// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        const loginUrl = new URL('/auth/signin', request.url)
        // loginUrl.searchParams.set('message', 'Please login to view this page')
        // loginUrl.searchParams.set('type', 'error')

        return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path'],
}