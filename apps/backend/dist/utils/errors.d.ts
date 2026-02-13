export declare const ERRORS: {
    readonly INVALID_REQUEST: {
        readonly code: "REQ_001";
        readonly message: "Invalid data payload";
        readonly status: 400;
    };
    readonly INVALID_LOGIN: {
        readonly code: "AUTH_001";
        readonly message: "Invalid email or password";
        readonly status: 401;
    };
    readonly UNAUTHORIZED: {
        readonly code: "AUTH_002";
        readonly message: "You must be logged in to access this";
        readonly status: 401;
    };
    readonly AI_ERROR: {
        readonly code: "AI_001";
        readonly message: "An AI agent error";
        readonly status: 466;
    };
    readonly USER_NOT_FOUND: {
        readonly code: "USER_001";
        readonly message: "User not found";
        readonly status: 404;
    };
    readonly USER_ALREADY_EXISTS: {
        readonly code: "USER_002";
        readonly message: "User already exists";
        readonly status: 406;
    };
    readonly RESUME_NOT_FOUND: {
        readonly code: "RES_001";
        readonly message: "Resume not found";
        readonly status: 404;
    };
    readonly NOT_FOUND: {
        readonly code: "RES_002";
        readonly message: "Resource not found";
        readonly status: 404;
    };
    readonly INTERNAL_ERROR: {
        readonly code: "SYS_001";
        readonly message: "Something went wrong";
        readonly status: 500;
    };
    readonly REGISTRATION_DISABLED: {
        readonly code: "AUTH_003";
        readonly message: "Registration is currently disabled";
        readonly status: 403;
    };
};
export declare class AppError extends Error {
    readonly code: string;
    readonly statusCode: number;
    constructor(errorType: typeof ERRORS[keyof typeof ERRORS], details?: string);
}
//# sourceMappingURL=errors.d.ts.map