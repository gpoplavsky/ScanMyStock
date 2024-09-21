import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
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