import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './api/usersApi';
import { tasksApi } from './api/tasksApi';
import { expensesApi } from './api/expensesApi';
import { savingsApi } from './api/savingsApi';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [expensesApi.reducerPath]: expensesApi.reducer,
    [savingsApi.reducerPath]: savingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(userApi.middleware, tasksApi.middleware, expensesApi.middleware, savingsApi.middleware),
});