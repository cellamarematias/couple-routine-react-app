// Acá importo el archivo desde RTQ
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const API = "https://node-api-mysql-cellamarematias.vercel.app/api/expenses";

// Define a service using a base URL and expected endpoints
// retries para reintentar conn al server

// INVALIDATIONS - para refecth - providesTags - invalidatesTags

const token = sessionStorage.getItem('token');

export const expensesApi = createApi({
  reducerPath: 'expensesApi',
  baseQuery: retry(fetchBaseQuery({ baseUrl: API, prepareHeaders: (headers, { getState }) => {
    // If we have a token set in state, let's assume that we should be passing it.
    const token = sessionStorage.getItem('token');

    if (token) {
      headers.set('auth-token', `${token}`)
    }
    return headers;
  }, }), {
    maxRetries: 2
  }),
  keepUnusedDataFor: 2400,
  tagTypes: ["Expenses"],
  prepareHeaders: (headers, { getState }) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
  endpoints: (builder) => ({
    getExpenses: builder.query({
        query: () => "/",
        providesTags: ["Expenses"],
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    }),
    addExpenses: builder.mutation({
        query: (body) => ({
            url: API,
            method: 'POST',
            body,
            headers : {
                'Content-Type' : 'application/json'
            },
          }),
          invalidatesTags: ["Expenses"],
    }),
    editExpenses: builder.mutation({
        query: (body) => ({
            url: API + '/' + body.idgastos,
            method: 'PATCH',
            body,
            headers : {
                'Content-Type' : 'application/json'
            },
          }),
          invalidatesTags: ["Expenses"],
    }),
    deleteExpenses: builder.mutation({
        query: (id) => ({
            url: API + '/' + id,
            method: 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
          }),
          invalidatesTags: ["Expenses"],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints - el hook se genera aut. 
export const { useGetExpensesQuery, useAddExpensesMutation, useEditExpensesMutation, useDeleteExpensesMutation } = expensesApi;