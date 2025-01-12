"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authValidator_1 = __importDefault(require("../common/validators/authValidator"));
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// signup
router.post('/signup', authValidator_1.default, authController_1.signupController);
// signin
router.post('/signin', authValidator_1.default, authController_1.signinController);
// password change
// router.patch(
//   '/password-change',
//   passwordChange
// );
exports.default = router;
