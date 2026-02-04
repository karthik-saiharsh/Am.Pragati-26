export const GST_RATE = 0.18;
export const CURRENCY = "₹";

export const PAYU_URLS = {
  TEST: 'https://test.payu.in/_payment',
  PROD: 'https://secure.payu.in/_payment',
};

// Determine if running in production based on flag
const IS_PRODUCTION = process.env.NEXT_PUBLIC_IS_PRODUCTION === '1';

// Select appropriate PayU merchant key based on environment
export const PAYU_MERCHANT_KEY = IS_PRODUCTION
  ? process.env.NEXT_PUBLIC_PAY_U_KEY_PROD || ''
  : process.env.NEXT_PUBLIC_PAY_U_KEY_TEST || '';

// Select appropriate PayU URL based on environment
export const PAYU_URL = IS_PRODUCTION ? PAYU_URLS.PROD : PAYU_URLS.TEST;
