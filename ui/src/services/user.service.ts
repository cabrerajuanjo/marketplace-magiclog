import { jwtDecode } from "jwt-decode";

// const API_URL = import.meta.env.VITE_API_URL

type TokenPayload = {
    email: string;
    role: 'admin' | 'user';
    iat: number;
    exp: number;
}

type LoginResult = {
    tokenPayload: TokenPayload | null;
    responseCode: number;
}

type LoginResponse = {
    sessionToken: string;
}

// const base_url = import.meta.env.DEV? API_URL : '';

export async function login(email: string, password: string): Promise<LoginResult> {
    const response = await fetch(`/user/login`, {
        method: 'POST', headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
        return { tokenPayload: null, responseCode: response.status }
    }
    const result = await response.json() as LoginResponse;
    sessionStorage.setItem('sessionToken', result.sessionToken);
    const tokenPayload = jwtDecode<TokenPayload>(result.sessionToken)
    return { tokenPayload, responseCode: response.status };
}

export async function createAccount(email: string, password: string): Promise<number> {
    const response = await fetch(`/user`, {
        method: 'POST', headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify({ email, password })
    });
    return response.status
}

