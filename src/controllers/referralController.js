import { PrismaClient } from '@prisma/client';
import createHttpError from 'http-errors';

const prisma = new PrismaClient();

export const createeReferral = async (req, res, next) => {
  try {
    const {
      referrerName,
      referrerEmail,
      referrerPhone,
      refereeName,
      refereeEmail,
      course,
      terms
    } = req.body;

    // Check for duplicate refereeEmail
    const existingReferral = await prisma.referral.findUnique({
      where: { refereeEmail },
    });

    if (existingReferral) {
      return res
        .status(409)
        .json({ message: 'This referee has already been referred.' });
    }

    // Create referral
    const newReferral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        referrerPhone,
        refereeName,
        refereeEmail,
        course,
        termsAccepted: terms === 'true' // Convert string to boolean
      }
    });

    res.status(201).json({
      message: 'Referral created successfully',
      referral: newReferral
    });
  } catch (error) {
    console.error(error);
    next(createHttpError(500, 'Something went wrong while creating the referral'));
  }
};
