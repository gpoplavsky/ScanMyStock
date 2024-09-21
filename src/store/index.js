import cameraReducer from '../reducers/cameraReducer';
import itemReducer from '../reducers/itemReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    items: itemReducer,
    camera: cameraReducer,
  }
})

export default store
