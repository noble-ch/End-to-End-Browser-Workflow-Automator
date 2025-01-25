import { createMocks } from 'node-mocks-http';
import loginHandler from '@/pages/api/auth/signin/index';

describe('Login API', () => {
  it('should login successfully with valid credentials', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    });

    await loginHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Login successful',
      user: expect.any(Object),
    });
  });

  it('should fail with invalid credentials', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'wrongpassword',
      },
    });

    await loginHandler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Invalid credentials',
    });
  });
});

// signup test
import signupHandler from '@/pages/api/auth/signup/index';

describe('Register API', () => {
  it('should register a new user successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'newuser@example.com',
        password: 'password123',
      },
    });

    await signupHandler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'User registered successfully',
    });
  });

  it('should fail if user already exists', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    });

    await signupHandler(req, res);

    expect(res._getStatusCode()).toBe(409);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'User already exists',
    });
  });
});
