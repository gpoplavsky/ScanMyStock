import {React, useEffect, useState} from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, CameraType, useCameraPermissions, dataScanner } from 'expo-camera';
import ModalPrimary from './src/components/ModalPrimary';
import PrimaryBtn from './src/components/PrimaryBtn';
import CameraModal from './src/screens/CameraModal';
import SecondaryBtn from './src/components/SecondaryBtn';
import CameraButton from './src/components/CameraButton';
import TabNavigator from './src/navigation/TabNavigator';
import TabBarIcon from './src/components/TabBarIcon';
import { colors } from './src/global/colors';
import Item from './src/components/Item';
import ItemList from './src/components/ItemList';
import MainNavigator from './src/navigation/MainNavigator';


export default function App() {

  const [visibleCameraModal, setVisibleCameraModal] = useState(false);

  const handleVisibleCameraModal = () => {
    setVisibleCameraModal(!visibleCameraModal)
  }
      
  return (
    <>
      <MainNavigator onPressCameraButton={handleVisibleCameraModal}/>
      <CameraModal
        visibleCameraModal={visibleCameraModal}
        handleVisibleCameraModal={handleVisibleCameraModal}
      />
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