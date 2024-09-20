import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Header from '../../components/Header'
import Home from '../../screens/Home'
import ItemDetail from '../../screens/ItemDetail'

const Stack = createNativeStackNavigator()

const CheckinStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
          header : () => <Header title={route.name === 'Home' ? 'Checkin' : 'Detalle'} />
        })}
    >
      <Stack.Screen name='Home' component={Home}/>
      <Stack.Screen name='Detail' component={ItemDetail}/>
    </Stack.Navigator>
  )
}

export default CheckinStack

const styles = StyleSheet.create({})