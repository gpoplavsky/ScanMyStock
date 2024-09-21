import { createSlice } from "@reduxjs/toolkit"

const cameraSlice = createSlice({
    name:"camera",
    initialState: {isCameraModalVisible: false},
    reducers: {
        showCameraModal: (state) => {
            state.isCameraModalVisible = true
        },
        hideCameraModal: (state) => {
            state.isCameraModalVisible = false
        }
    }
})

export const {showCameraModal, hideCameraModal} = cameraSlice.actions
export default cameraSlice.reducer