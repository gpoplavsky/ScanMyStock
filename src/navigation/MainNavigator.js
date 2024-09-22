import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './TabNavigator'
import AuthStack from './stacks/AuthStack'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../features/auth/authSlice'

const MainNavigator = ({onPressCameraButton}) => {

  const idToken = useSelector(state => state.auth.idToken)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const sessions = await fetchSession()
      if(sessions){
        dispatch(setUser(sessions))
      }
    })()
  },[])

  return (
    <NavigationContainer>
      {idToken ? <TabNavigator onPressCameraButton={onPressCameraButton}/> : <AuthStack/>}
    </NavigationContainer>
  )
}

export default MainNavigator