import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import ItemList from '../components/ItemList';
import Search from '../components/Search';
import { useSelector } from 'react-redux';

const Delivered = ({navigation}) => {

  const items = useSelector(state => state.items.items) // se accede a los items del store
  
  const [keyword, setKeyword] = useState('')
  const [filteredItems, setFilteredItems] = useState([])

  useEffect(() => {
      const deliveredItems = items.filter(item => item.list === 'delivered') 
      if (keyword) {
        setFilteredItems(items.filter(item => item.title.includes(keyword)))
      } else {
        setFilteredItems(deliveredItems)
      }
    },[keyword, items])

  return (
    <View style={styles.container}>
      <Search onSearch={setKeyword}/>      
      <View style={styles.itemList}>
        <ItemList items={filteredItems} navigation={navigation} list="delivered"/>
      </View>
    </View>
  )
}

export default Delivered

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