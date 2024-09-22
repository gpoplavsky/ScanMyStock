import { createSlice } from "@reduxjs/toolkit"

export const itemsSlice = createSlice({
    name:"items",
    initialState: {
        items:[]
    },
    reducers:{
        // Acción para agregar un item
        addItem: (state, action) => {
            state.items.push(action.payload);         
        },
        // Acción para actualizar un item existente
        updateItem: (state, action) => {
            const updatedItem = action.payload
            const index = state.items.findIndex(item => item.id === updatedItem.id)
            if (index !== -1) {
                state.items[index] = updatedItem;
            }
        }        
    }
})

export const {addItem, updateItem} = itemsSlice.actions

export default itemsSlice.reducer