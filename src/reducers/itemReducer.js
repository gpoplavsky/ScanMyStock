import { createSlice } from "@reduxjs/toolkit";

// Estado inicial
const initialState = {
    items: [], // Lista de items escaneados
}

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        // Acción para agregar un item
        addItem: (state, action) => {
            state.items.push(action.payload); // Agrega un nuevo item escaneado al array de items
        },
        // Acción para actualizar un item existente
        updateItem: (state, action) => {
            const updatedItem = action.payload
            const index = state.items.findIndex(item => item.id === updatedItem.id)
            if (index !== -1) {
                state.items[index] = updatedItem;
            }
        },
    },
})

export const {addItem, updateItem} = itemSlice.actions

export default itemSlice.reducer