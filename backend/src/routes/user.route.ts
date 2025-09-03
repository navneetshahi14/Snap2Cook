import express from 'express';
import { loginUser, registerUser, verifyEmail } from '../controller/user.controller.js';

const router = express.Router();


router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/verifyEmail',verifyEmail);


export default router;