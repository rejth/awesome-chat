import { rest } from 'msw';

// API interceptors
export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    const { username, password } = req.body;
    return res(
      ctx.status(200),
      ctx.json({
        username,
        password,
      }),
    );
  }),
];
