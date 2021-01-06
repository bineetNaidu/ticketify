const stripe = {
  charges: {
    create: jest.fn().mockResolvedValue({}),
  },
};

export default stripe;
