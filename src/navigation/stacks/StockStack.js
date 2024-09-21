import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Header from '../../components/Header'
import Stock from '../../screens/Stock'
import ItemDetail from '../../screens/ItemDetail'

const Stack = createNativeStackNavigator()

const StockStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
          header : () => <Header title={route.name === 'Stock' ? 'Tarjetas en Bull' : 'Detalle'} />
        })}
    >
      <Stack.Screen name='Stock' component={Stock}/>
      <Stack.Screen name='Detail' component={ItemDetail} />
    </Stack.Navigator>
  )
}

export default StockStack

const styles = StyleSheet.create({})