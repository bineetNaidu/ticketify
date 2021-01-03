const stripe = {
  charges: {
    create: jest.fn().mockResolvedValue({}),
  },
};
