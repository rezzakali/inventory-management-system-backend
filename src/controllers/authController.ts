import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ErrorCode from '../common/enum/error.code.enum';
import { BadRequestException } from '../common/utils/catch-errors';
import { logger } from '../common/utils/logger';
import { config } from '../config/app.config';
import { HTTPSTATUS } from '../config/http.config';
import asyncHandler from '../middleware/asyncHandler';
import User from '../models/userModel';

// signup controller
export const signupController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(
      `Signup attempt from IP: ${req.ip}, Username: ${req.body.username}`
    );
    const { username, password } = req.body;
    // check if user already exists in the database
    const user = await User.findOne({ username });
    if (user) {
      throw new BadRequestException(
        'User already exists with this email',
        ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
      );
    }

    //   hashed password
    const hashedPassword = bcrypt.hashSync(password, Number(config.SALT_ROUND));

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    // finally save to database
    await newUser.save();

    // send response
    res.status(HTTPSTATUS.CREATED).json({
      success: true,
      message: 'Thank you for registering!',
    });
  }
);

// signin controller
export const signinController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // destructure email and password from request body
    const { email, password } = req.body;

    // check user with the email
    const user = await User.findOne({ email });
    // if no user
    if (!user) {
      throw new BadRequestException(
        'Invalid credentials',
        ErrorCode.AUTH_NOT_FOUND
      );
    }

    // compare the password
    const isValidPassword = await bcrypt.compare(password, user.password);

    // if the password is invalid
    if (!isValidPassword) {
      throw new BadRequestException(
        'Invalid credentials',
        ErrorCode.AUTH_NOT_FOUND
      );
    }

    // generate a jwt token
    const token = jwt.sign({ _id: user._id }, config.JWT.SECRET, {
      expiresIn: config.JWT.EXPIRES_IN, // 30 days
    });

    const COOKIE_EXPIRATION =
      parseInt(config.COOKIE_EXPIRATION || '30', 10) * 24 * 60 * 60 * 1000; // Convert days to milliseconds

    // Set the token as a cookie
    res.cookie('token', token, {
      httpOnly: config.NODE_ENV === 'production' ? true : false, // Makes the cookie inaccessible to JavaScript on the client side
      secure: config.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: config.NODE_ENV === 'production' ? 'strict' : 'none', // Prevents cross-site request forgery (CSRF)
      maxAge: COOKIE_EXPIRATION, // Cookie expiry in milliseconds (30d)
    });

    // return response
    res.status(HTTPSTATUS.OK).json({
      success: true,
      message: 'Welcome back to your account.',
    });
  }
);

// Password-change
// export const passwordChange = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email, oldPassword, newPassword } = req.body;
//     // check user with the email
//     const user = await User.findOne({ email });

//     // if no user
//     if (!user) {
//       return next(new ErrorResponse('Invalid credentials', 404));
//     }
//     // Check if the current password is correct
//     const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

//     if (!isPasswordValid) {
//       return next(new ErrorResponse('Incorrect old password', 401));
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // udpate the password
//     user.password = hashedPassword;
//     await user.save();

//     return res.status(200).json({
//       success: true,
//       message: 'Password changed successfully!',
//     });
//   } catch (error) {
//     return next(new ErrorResponse(error?.message, 500));
//   }
// };
