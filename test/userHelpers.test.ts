import userHelpers from '../src/Helpers/userHelpers';
import { user } from '../src/config/mongoose';

jest.mock('../src/config/mongoose', () => ({
  user: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
  })),
}));

jest.mock('bcrypt', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
}));

describe('userHelpers.registerUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Register a new user', async () => {
    // Mock the user model to return null for both email and phone number
    user.findOne.mockResolvedValueOnce(null); // No matching email
    user.findOne.mockResolvedValueOnce(null); // No matching phone number

    // Mock bcrypt to return salt and hashed password
    const bcryptMock = require('bcrypt');
    bcryptMock.genSalt.mockResolvedValueOnce('somesalt');
    bcryptMock.hash.mockResolvedValueOnce('hashedpassword');

    // Mock data.save to simulate successful registration
    const saveMock = user().save.mockResolvedValueOnce({ _id: 'someid' });

    const userInfo = {
      name: 'John Doe',
      mobile: '1234567890',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    const result = await userHelpers.registerUser(userInfo);

    expect(result.status).toBe(true);
    expect(result.data).toEqual({ _id: 'someid' });
    expect(result.Message).toBe('Successfully registered');
    expect(user).toHaveBeenCalledWith({
      name: 'John Doe',
      mobile: '1234567890',
      email: 'john.doe@example.com',
      password: 'hashedpassword',
    });
    expect(saveMock).toHaveBeenCalled();
  });

  test('Attempt to register with existing phone number', async () => {
    // Mock the user model to return a matching phone number
    user.findOne.mockResolvedValueOnce({ _id: 'existingId' });

    const userInfo = {
      name: 'John Doe',
      mobile: '1234567890',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    const result = await userHelpers.registerUser(userInfo);

    expect(result.status).toBe(false);
    expect(result.Message).toBe('Phone number already exists, please try to login');
    expect(user.findOne).toHaveBeenCalledWith({ mobile: '1234567890' });
  });

  test('Attempt to register with existing email', async () => {
    // Mock the user model to return a matching email
    user.findOne.mockResolvedValueOnce({ _id: 'existingId' });

    const userInfo = {
      name: 'John Doe',
      mobile: '1234567890',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    const result = await userHelpers.registerUser(userInfo);

    expect(result.status).toBe(false);
    expect(result.Message).toBe('Email already exists, please try to login');
    expect(user.findOne).toHaveBeenCalledWith({ email: 'john.doe@example.com' });
  });

  test('Error handling', async () => {
    // Mock the user model to return null for both email and phone number
    user.findOne.mockResolvedValueOnce(null); // No matching email
    user.findOne.mockResolvedValueOnce(null); // No matching phone number

    // Mock bcrypt to return salt and hashed password
    const bcryptMock = require('bcrypt');
    bcryptMock.genSalt.mockResolvedValueOnce('somesalt');
    bcryptMock.hash.mockResolvedValueOnce('hashedpassword');

    // Mock data.save to throw an error during registration
    const saveMock = user().save.mockRejectedValueOnce(new Error('Some error'));

    const userInfo = {
      name: 'John Doe',
      mobile: '1234567890',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    try {
      await userHelpers.registerUser(userInfo);
      // Fail the test if the function does not throw an error
      fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Some error');
    }
  });
});
