// Acá importo el archivo desde RTQ
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const API = "https://node-api-mysql-60j718rds-cellamarematias.vercel.app/api/expenses";

// Define a service using a base URL and expected endpoints
// retries para reintentar conn al server

// INVALIDATIONS - para refecth - providesTags - invalidatesTags

export const expensesApi = createApi({
  reducerPath: 'expensesApi',
  baseQuery: retry(fetchBaseQuery({ baseUrl: API }), {
    maxRetries: 2
  }),
  keepUnusedDataFor: 2400,
  tagTypes: ["Expenses"],
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