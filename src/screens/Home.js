import { Button, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ItemList from '../components/ItemList';
import { useDispatch, useSelector } from 'react-redux';
import {usePostItemsMutation} from '../services/inventory';
import { updateItem } from '../features/items/itemsSlice';

const Home = ({navigation}) => {
  const items = useSelector(state => state.items.items) 
  const dispatch = useDispatch()
  const [filteredItems, setFilteredItems] = useState([]) 
  const [selectedItems, setSelectedItems] = useState([])
  const [showButton, setShowButton] = useState(false)
  const [postItems] = usePostItemsMutation()

  useEffect(() => {
    const checkinItems = items.filter(item => item.list === "")
    setFilteredItems(checkinItems)
  },[items])
  
  useEffect(() => {
    setShowButton(selectedItems.length > 0);
  },[selectedItems])

  const handleSendToStock = async () => {
    selectedItems.forEach(item => {
      dispatch(updateItem({...item, list: 'stock'}))
    })
    for (const item of selectedItems) {
      try {
        await postItems({id: item.id, ...item, list:'stock'})
      } catch (error) {
        console.error('Error actualizando la base de datos:', error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.itemList}>
        <ItemList items={filteredItems} navigation={navigation} list="" onItemsSelected={setSelectedItems}/>
      </View>
      {showButton && (
        <Button title='Enviar a Stock' onPress={handleSendToStock}/>
      )}
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