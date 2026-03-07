export interface ActionResult<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
    errors?: Record<string, string[]>;
}

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
}

export interface SessionPayload {
    userId: string;
    email: string;
    role: string;
    expiresAt: Date;
}
