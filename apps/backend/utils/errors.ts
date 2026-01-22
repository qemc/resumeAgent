
export const ERRORS = {

    INVALID_REQUEST: {
        code: 'REQ_001',
        message: 'Invalid data payload',
        status: 400
    },
    INVALID_LOGIN: {
        code: 'AUTH_001',
        message: 'Invalid email or password',
        status: 401
    },
    UNAUTHORIZED: {
        code: 'AUTH_002',
        message: 'You must be logged in to access this',
        status: 401
    },

    USER_NOT_FOUND: {
        code: 'USER_001',
        message: 'User not found',
        status: 404
    },

    RESUME_NOT_FOUND: {
        code: 'RES_001',
        message: 'Resume not found',
        status: 404
    },

    INTERNAL_ERROR: {
        code: 'SYS_001',
        message: 'Something went wrong',
        status: 500
    }
} as const;

export class AppError extends Error {
    public readonly code: string;
    public readonly statusCode: number;

    constructor(errorType: typeof ERRORS[keyof typeof ERRORS]) {
        super(errorType.message)

        this.code = errorType.code;
        this.statusCode = errorType.status;
        Error.captureStackTrace(this, this.constructor)
    }
}