import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ItemList from '../components/ItemList';
import { useSelector } from 'react-redux';

const Home = ({navigation}) => {

  const items = useSelector(state => state.items.items) // se accede a los items del store

  const [filteredItems, setFilteredItems] = useState([]) 
  console.log(filteredItems);
  

  useEffect(() => {
    const checkinItems = items.filter(item => item.list === "")
    setFilteredItems(checkinItems)
  },[items])

  return (
    <View style={styles.container}>
      <View style={styles.itemList}>
        <ItemList items={filteredItems} navigation={navigation} list=""/>
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