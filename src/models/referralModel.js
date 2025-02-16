import prisma from '../config/prisma.js';

// Named export
export const createReferral = async (referralData) => {
  return prisma.referral.create({
    data: referralData
  });
};
