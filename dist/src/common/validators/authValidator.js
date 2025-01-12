"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const http_config_1 = require("../../config/http.config");
// Define the schema for signup data validation
const signupSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(3, 'Username is required')
        .max(20, 'Username must not exceed 20 characters'),
    password: zod_1.z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .max(20, 'Password must not exceed 20 characters'),
});
// Middleware function
const validateSignupData = (req, res, next) => {
    try {
        // Validate the request body using the schema
        signupSchema.parse(req.body);
        next(); // Continue to the next middleware/route handler if validation passes
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            // Send validation errors as a response
            res.status(http_config_1.HTTPSTATUS.BAD_REQUEST).json({
                errors: error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                })),
            });
        }
        next(error); // Pass other errors to the error-handling middleware
    }
};
exports.default = validateSignupData;
