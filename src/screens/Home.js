import { StyleSheet, View } from 'react-native'
import React from 'react'
import ItemList from '../components/ItemList';

const Home = ({navigation}) => {

  const items = ['Tarea 1', 'Tarea 2', 'Tarea 3', 'Tarea 4']; // DAtos de ejemplo

  return (
    <View style={styles.container}>
      <View style={styles.itemList}>
        <ItemList items={items} navigation={navigation} />
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:"center"
  },
  itemList:{
    flex:1,
    width:"100%"
  },


})