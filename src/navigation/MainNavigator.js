import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../screens/Home'
import Stock from '../screens/Stock'
import Archived from '../screens/Archived'
import Delivered from '../screens/Delivered'
import CameraModal from '../screens/CameraModal'
import TabNavigator from './TabNavigator'

const Stack = createNativeStackNavigator()

const MainNavigator = ({onPressCameraButton}) => {
  return (
    <NavigationContainer>
        <TabNavigator onPressCameraButton={onPressCameraButton}/>
    </NavigationContainer>
  )
}

export default MainNavigator

const styles = StyleSheet.create({})