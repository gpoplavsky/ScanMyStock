import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, BASE_AUTH_URL } from "../firebase/database";

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_AUTH_URL}),
    endpoints: (builder) => ({
        register: builder.mutation({
            query:({...user}) => ({
                url:`accounts:signUp?Key=${API_KEY}`,
                method:'POST',
                body:user,
            })
        }),
        login:builder.mutation({
            query:({...user}) => ({
                url:`accounts:signInWithPassword?key=${API_KEY}`,
                method:'POST',
                body:user,
            }) 
        }),
    }), 
});

export const {useLoginMutation, useRegisterMutation} = authApi