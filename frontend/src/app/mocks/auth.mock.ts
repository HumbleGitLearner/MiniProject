/* eslint-disable max-len */
import { User } from "../models/user";

export const users: User[] = [
  {
    id: 1,
    // accountId: "1",
    email: "bartosz@app.com",
  },
  {
    id: 2,
    // accountId: "2",
    email: "john@app.com",
  },
  {
    id: 3,
    // accountId: "2",
    email: "mike@app.com",
  },
];

interface Tokens {
  [email: string]: string;
}

export const tokens: Tokens = {
  'loo@app.com':
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJhY2NvdW50SWQiOiIxIiwiZW1haWwiOiJsb29AYXBwLmNvbSIsInJvbGUiOiJPV05FUiIsImlhdCI6MTU4NDYxNTM5MywiZXhwIjoxNzM0NjE1OTkzLCJnaXZlbl9uYW1lIjoiTG9vIn0.sBXLt3_4NGG2Kkwdg-nOUpHDnsf7_u-5oX9GOcwhiK4',

  'test@app.com':
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJpZCI6IjIiLCJhY2NvdW50SWQiOiIyIiwiZW1haWwiOiJqb2huQGFwcC5jb20iLCJyb2xlIjoiT1dORVIiLCJpYXQiOjE1ODQ2MTU5NDIsImV4cCI6MTU4NDYxNjU0Mn0=.' +
    'mock-signature',

  'john@app.com':
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJpZCI6IjMiLCJhY2NvdW50SWQiOiIyIiwiZW1haWwiOiJtaWtlQGFwcC5jb20iLCJyb2xlIjoiUkVBREVSIiwiaWF0IjoxNTg0NjE1OTQyLCJleHAiOjE1ODQ2MTY1NDJ9.' +
    'mock-signature',
};
