import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Delivered from '../../screens/Delivered'
import ItemDetail from '../../screens/ItemDetail'
import Header from '../../components/Header'

const Stack = createNativeStackNavigator()

const DeliveryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
          header : () => <Header title={route.name === 'Delivered' ? 'Tarjetas despachadas' : 'Detalle'} />
        })}
    >
      <Stack.Screen name='Delivered' component={Delivered}/>
      <Stack.Screen name='Detail' component={ItemDetail} />
    </Stack.Navigator>
  )
}

export default DeliveryStack

const styles = StyleSheet.create({})