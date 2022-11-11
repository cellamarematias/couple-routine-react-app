// Acá importo el archivo desde RTQ
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const API = "https://node-api-mysql-60j718rds-cellamarematias.vercel.app/api/tasks";

// Define a service using a base URL and expected endpoints
// retries para reintentar conn al server


  // INVALIDATIONS - para refecth - providesTags - invalidatesTags


export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: retry(fetchBaseQuery({ baseUrl: API }), {
    maxRetries: 2
  }),
  keepUnusedDataFor: 2400,
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTask: builder.query({
        query: () => "/",
        providesTags: ["Tasks"],
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    }),
    addTask: builder.mutation({
        query: (body) => ({
            url: API,
            method: 'POST',
            body,
            headers : {
                'Content-Type' : 'application/json'
            },
          }),
          invalidatesTags: ["Tasks"],
    }),
    editTask: builder.mutation({
        query: (body) => ({
            url: API + '/' + body.id,
            method: 'PATCH',
            body,
            headers : {
                'Content-Type' : 'application/json'
            },
          }),
          invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
        query: (body) => ({
            url: API + '/' + body.id,
            method: 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
          }),
          invalidatesTags: ["Tasks"],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints - el hook se genera aut. 
export const { useGetTaskQuery, useAddTaskMutation, useEditTaskMutation, useDeleteTaskMutation } = tasksApi;