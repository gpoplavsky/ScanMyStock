import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import Archived from '../../screens/Archived'
import ItemDetail from '../../screens/ItemDetail'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const ArchiveStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
          header : () => <Header title={route.name === 'Archived' ? 'Tarjetas archivadas' : 'Detalle'} />
        })}
    >
      <Stack.Screen name='Archived' component={Archived}/>
      <Stack.Screen name='Detail' component={ItemDetail} />
    </Stack.Navigator>
  )
}

export default ArchiveStack

const styles = StyleSheet.create({})