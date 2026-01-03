import { CreateDemoInput } from './demo.schema';

export const createDemoMessage = async (input: CreateDemoInput) => {
  // Simulate database operation
  return {
    message: `Hello ${input.name}, welcome to the demo!`,
    user: input,
    timestamp: new Date(),
  };
};

export const getDemoMessage = async () => {
  return {
    message: 'This is a GET request demo',
    timestamp: new Date(),
  };
};
