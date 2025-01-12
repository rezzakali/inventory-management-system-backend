import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { HTTPSTATUS } from '../../config/http.config';

// Define the schema for signup data validation
const signupSchema = z.object({
  username: z
    .string()
    .min(3, 'Username is required')
    .max(20, 'Username must not exceed 20 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password must not exceed 20 characters'),
});

// Middleware function
const validateSignupData = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Validate the request body using the schema
    signupSchema.parse(req.body);

    next(); // Continue to the next middleware/route handler if validation passes
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Send validation errors as a response
      res.status(HTTPSTATUS.BAD_REQUEST).json({
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }
    next(error); // Pass other errors to the error-handling middleware
  }
};

export default validateSignupData;
