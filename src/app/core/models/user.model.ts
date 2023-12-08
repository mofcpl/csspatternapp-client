export interface PatchUser {
    name: string | null,
    email: string | null,
    homepage: string | null,
    password: string | null
}

export interface User {
    name: string,
    id: string,
    token: string,
    email: string,
    homepage: string
}

export interface registerError {
    name: string | null,
    password: string | null,
    email: string | null
}