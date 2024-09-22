import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../firebase/database";

export const inventoryApi = createApi({
    reducerPath:"inventoryApi",
    baseQuery: fetchBaseQuery({baseUrl:BASE_URL}),
    tagTypes: ["Items"],
    endpoints: (builder) => ({
        // Obtener los items
        getItems: builder.query({
            query: () => 'items.json',
            transformResponse: (response) => {
                if (response) {
                    return Object.keys(response).map(key => ({ id: key, ...response[key]}))
                }
                return [];
            },
            providesTags: ["Items"]
        }),
        
        // Crear nuevos items
        postItems: builder.mutation({
            query: (newItem) => ({
                url: `items.json`,
                method: 'POST',
                body: newItem,
            }),
            invalidatesTags: ["Items"]
        }),
        
        // Actualizar items existentes
        updateItem: builder.mutation({
            query: ({id, ...item}) => ({
                url: `items/${id}.json`,
                method:'PUT',
                body: item,
            }),
            invalidatesTags: ["Items"]
        }),

        //Eliminar items seleccionados
        deleteItem: builder.mutation({
            query: (id) => ({
                url: `items/${id}.json`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Items"],
        })
    }),
});

export const {useGetItemsQuery, usePostItemsMutation, useUpdateItemMutation, useDeleteItemMutation} = inventoryApi;