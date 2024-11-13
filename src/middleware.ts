import { Middleware } from '@reduxjs/toolkit';

const clientOnlyMiddleware: Middleware = () => (next) => (action) => {
  if (typeof window !== 'undefined') {
    return next(action);
  }
  return;
};

export default clientOnlyMiddleware;
