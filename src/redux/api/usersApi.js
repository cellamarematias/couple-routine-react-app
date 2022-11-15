// Acá importo el archivo desde RTQ
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const API = "https://node-api-mysql-cellamarematias.vercel.app/api/users/auth";

// Define a service using a base URL and expected endpoints
// retries para reintentar conn al server


  // INVALIDATIONS - para refecth - providesTags - invalidatesTags


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: retry(fetchBaseQuery({ baseUrl: API }), {
    maxRetries: 2
  }),
  keepUnusedDataFor: 2400,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    postUser: builder.query({
        query: (body) => ({
            url: API,
            method: 'POST',
            body,
            headers : {
                'Content-Type' : 'application/json'
            },
            providesTags: ["Users"],
          }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints - el hook se genera aut. 
export const { useLazyPostUserQuery, usePostUserQuery } = userApi;