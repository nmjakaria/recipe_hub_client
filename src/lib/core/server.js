// lib/core/server.js

import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    // handle 401, 404, 403
    return res.json();
}

export const authHeader = async () => {
    const token = await getUserToken();
    const header = token ? {
        authorization: `Bearer ${token}`,
    } : {};
    return header;
}

export const serverMutation = async (path, data, method = 'POST') => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ... await authHeader(),
        },
        body: JSON.stringify(data),
    });

    // handle 401, 404, 403

    return res.json();
}

export const serverFetchWithToken = async (path, options = {}) => {
    const token = await getUserToken();

    // 2. Set up default content headers
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // 3. Inject the active token into the Authorization header
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // 4. Execute the network call
    const res = await fetch(`${baseUrl}${path}`, {
        ...options,
        headers,
    });

    // 5. Intercept HTTP error statuses (401, 403, 404, etc.)
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP Error ${res.status}`);
    }

    return res.json();
}