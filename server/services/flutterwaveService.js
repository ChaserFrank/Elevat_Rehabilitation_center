//import Flutterwave from 'flutterwave-node-v3';
//import dotenv from 'dotenv';
//import prisma from '../prisma/client.js';
//import { ApiError } from '../middleware/errorHandler.js';

// Initialize dotenv
//dotenv.config();

// Initialize Flutterwave
/* const flw = new Flutterwave(
  process.env.FLUTTERWAVE_PUBLIC_KEY,
  process.env.FLUTTERWAVE_SECRET_KEY
); */

/**
 * Initiate a payment transaction
 * @param {Object} data - Payment data
 * @param {String} data.email - Customer email
 * @param {String} data.name - Customer name
 * @param {Number} data.amount - Amount to charge
 * @param {String} data.bookingId - Booking ID
 * @param {String} data.redirectUrl - URL to redirect after payment
 */
export const initiatePayment = async (data) => {
  /* const payload = {
    tx_ref: `REH-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
    amount: data.amount,
    currency: 'USD',
    payment_options: 'card',
    customer: {
      email: data.email,
      name: data.name
    },
    customizations: {
      title: 'RehabCare Session Payment',
      description: `Payment for booking #${data.bookingId}`,
      logo: process.env.LOGO_URL || 'https://rehabcare.com/logo.png'
    },
    redirect_url: data.redirectUrl
  }; */
  
  /* try {
    const response = await flw.Charge.card(payload);
    
    if (response.status === 'success') {
      return {
        status: 'success',
        paymentUrl: response.data.link,
        transactionId: response.data.id,
        reference: payload.tx_ref
      };
    } else {
      throw new ApiError('Failed to initiate payment', 400, response);
    }
  } catch (error) {
    throw new ApiError(error.message || 'Payment initiation failed', 400, error);
  } */
};

/**
 * Verify a payment transaction
 * @param {String} transactionId - Transaction ID from Flutterwave
 */
export const verifyPayment = async (transactionId) => {
  /* try {
    const response = await flw.Transaction.verify({ id: transactionId });
    
    if (response.data.status === 'successful') {
      return {
        status: 'success',
        transactionId: response.data.id,
        amount: response.data.amount,
        currency: response.data.currency,
        paymentType: response.data.payment_type,
        metaData: response.data.meta || {},
        customerDetails: response.data.customer || {}
      };
    } else {
      throw new ApiError('Payment verification failed', 400, response);
    }
  } catch (error) {
    throw new ApiError(error.message || 'Payment verification failed', 400, error);
  } */
};

/**
 * Save payment record to database
 * @param {Object} paymentData - Payment data
 */
export const savePayment = async (paymentData) => {
 /*  try {
    const payment = await prisma.payment.create({
      data: {
        bookingId: paymentData.bookingId,
        amount: paymentData.amount,
        currency: paymentData.currency || 'USD',
        transactionId: paymentData.transactionId,
        status: paymentData.status,
        paymentMethod: paymentData.paymentMethod,
        metaData: paymentData.metaData || {}
      }
    });
    
    // Update booking payment status
    await prisma.booking.update({
      where: { id: paymentData.bookingId },
      data: {
        paymentStatus: paymentData.status === 'success' ? 'paid' : 'pending',
        paymentId: payment.id
      }
    });
    
    return payment;
  } catch (error) {
    throw new ApiError('Failed to save payment record', 500, error);
  } */
};