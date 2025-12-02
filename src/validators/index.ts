import { z } from "zod";

export const userRegistrationValidator = z.object({
        username: z.string()
            .trim()
            .nonempty('Name is required')
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name must be at most 50 characters'),
        email: z.string()
            .nonempty('Email is required')
            .trim()
            .email('Invalid email address'),
        password: z.string()
            .nonempty('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(20, 'Password must be at most 20 characters')
            .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[0-9]/, 'Password must contain at least one number')
            .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
        role: z.enum(['ADMIN', 'PROJECT_ADMIN', 'MEMBER'])
            
    }).strict();


export const userLoginValidator = z.object({
        email: z.string()
            .nonempty('Email is required')
            .trim()
            .email('Invalid email address'),
        password: z.string()
            .nonempty('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(20, 'Password must be at most 20 characters')
            .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[0-9]/, 'Password must contain at least one number')
            .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    }).strict();
