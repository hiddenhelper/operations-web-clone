import React from 'react';
require('mutationobserver-shim');

jest.mock('@stripe/react-stripe-js', () => ({
  CardElement: props => <input data-testid="credit-card" {...props} />,
  useStripe: () => ({
    createPaymentMethod: jest.fn().mockResolvedValue({ paymentMethod: { id: 'payment-id' } }),
  }),
  useElements: () => ({ getElement: jest.fn() }),
  Elements: () => <div />,
}));

jest.mock('popper.js', () => {
  const PopperJS = jest.requireActual('popper.js');
  return class {
    public static placements = PopperJS.placements;
    constructor() {
      return {
        update: jest.fn(),
        destroy: jest.fn(),
        scheduleUpdate: jest.fn(),
      };
    }
  };
});

document.createRange = jest.fn().mockReturnValue({
  setStart: jest.fn(),
  setEnd: jest.fn(),
  // @ts-ignore
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});
