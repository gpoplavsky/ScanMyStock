import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Header from '../../components/Header'
import Login from '../../screens/Login'
import Register from '../../screens/Register'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={(
        ({route}) => {
          return {
            header: () => <Header title={route.name === 'Login' ? 'Iniciar sesión' : 'Registrarse'}/>
          }
        }
      )}
    >
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Register' component={Register}/>
    </Stack.Navigator>
  )
}

export default AuthStack