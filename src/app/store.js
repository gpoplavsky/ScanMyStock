import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import itemsReducer from "../features/items/itemsSlice";
import authReducer from "../features/auth/authSlice";
import { inventoryApi } from "../services/inventory";
import { authApi } from "../services/auth";

export const store = configureStore({
    reducer: {
        items: itemsReducer,
        auth: authReducer, 
        [inventoryApi.reducerPath]:inventoryApi.reducer,
        [authApi.reducerPath]:authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(inventoryApi.middleware,authApi.middleware),
})

setupListeners(store.dispatch);