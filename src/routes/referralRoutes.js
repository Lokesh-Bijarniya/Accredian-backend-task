import { Router } from 'express';
import { body } from 'express-validator';
import { createeReferral } from '../controllers/referralController.js';

const router = Router();

const validateReferral = [
  body('referrerName').trim().notEmpty().withMessage('Referrer name is required'),
  body('referrerEmail').isEmail().normalizeEmail().withMessage('Invalid email address'),
  body('referrerPhone')
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Invalid phone number format'),
  body('refereeName').trim().notEmpty().withMessage('Referee name is required'),
  body('refereeEmail').isEmail().normalizeEmail().withMessage('Invalid email address'),
  body('course').trim().notEmpty().withMessage('Course selection is required'),
  body('terms').isIn(['true', 'false']).withMessage('Must accept terms and conditions')
];

router.post('/referrals', validateReferral, createeReferral);

export default router;