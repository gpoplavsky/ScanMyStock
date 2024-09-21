import {React, useState} from 'react';
import { StyleSheet,  } from 'react-native';
import CameraModal from './src/screens/CameraModal';
import { colors } from './src/global/colors';
import MainNavigator from './src/navigation/MainNavigator';
import { Provider } from 'react-redux';
import store from './src/store/index'


export default function App() {

  const [visibleCameraModal, setVisibleCameraModal] = useState(false);

  const handleVisibleCameraModal = () => {
    setVisibleCameraModal(!visibleCameraModal)
  }
      
  return (
    <>
      <Provider store={store}>
        <MainNavigator onPressCameraButton={handleVisibleCameraModal}/>
        <CameraModal visibleCameraModal={visibleCameraModal} handleVisibleCameraModal={handleVisibleCameraModal}/>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:"center"
  },
  tabNavigator:{
    width:"100%",
    borderTopWidth:1,
    borderColor:colors.light,
    position:"absolute",
    bottom:0
  }
});