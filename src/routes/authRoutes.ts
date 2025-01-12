import { Router } from 'express';

import validateSignupData from '../common/validators/authValidator';
import {
  signinController,
  signupController,
} from '../controllers/authController';

const router = Router();

// signup
router.post('/signup', validateSignupData, signupController);

// signin
router.post('/signin', validateSignupData, signinController);

// password change
// router.patch(
//   '/password-change',
//   passwordChange
// );

export default router;
