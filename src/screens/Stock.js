import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import ItemList from '../components/ItemList';
import Search from '../components/Search';
import { useSelector } from 'react-redux';

const Stock = ({navigation}) => {

  const items = useSelector(state => state.items.items) // se accede a los items del store

  const [keyword, setKeyword] = useState('')
  const [filteredItems, setFilteredItems] = useState([])
 
  useEffect(() => {
    const stockItems = items.filter(item => item.list === 'stock')
    if (keyword) {
        setFilteredItems(stockItems.filter(item => item.title.includes(keyword)))
      } else {
        setFilteredItems(stockItems)
      }
    },[keyword, items])

  return (
    <View style={styles.container}>
      <Search onSearch={setKeyword}/>      
      <View style={styles.itemList}>
        <ItemList items={filteredItems} navigation={navigation} list="stock" />
      </View>
    </View>
  )
}

export default Stock

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