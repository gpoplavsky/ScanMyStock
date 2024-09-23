import {React, useEffect, useState} from 'react';
import { StyleSheet,  } from 'react-native';
import CameraModal from './src/screens/CameraModal';
import { colors } from './src/global/colors';
import MainNavigator from './src/navigation/MainNavigator';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { StatusBar } from 'expo-status-bar';
import { init } from './src/db';
import { getApps, initializeApp } from 'firebase/app';
import firebaseConfig from './src/firebase/config';


export default function App() {

  if (getApps().length === 0) {
    initializeApp(firebaseConfig)
  }

  useEffect(() => {
    init()
    .then(() => console.log('DB inicializada'))
    .catch(err => {
      console.log("Falló la incialización de la DB:");
      console.log(err.message);
    })
  },[])

  const [visibleCameraModal, setVisibleCameraModal] = useState(false);

  const handleVisibleCameraModal = () => {
    setVisibleCameraModal(!visibleCameraModal)
  }
      
  return (
    <>
      <Provider store={store} >
        <MainNavigator onPressCameraButton={handleVisibleCameraModal}/>
        <CameraModal visibleCameraModal={visibleCameraModal} handleVisibleCameraModal={handleVisibleCameraModal}/>
      </Provider>
      <StatusBar style='light' backgroundColor={colors.color1} />
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