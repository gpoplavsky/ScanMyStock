import { StyleSheet, View, Text, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import ItemList from '../components/ItemList';
import Search from '../components/Search';
import { useGetItemsQuery, useUpdateItemMutation } from '../services/inventory';
import { useDispatch } from 'react-redux';
import { updateItem } from '../features/items/itemsSlice';

const Stock = ({navigation}) => {
  const {data: items = [], isLoading, error} = useGetItemsQuery()
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')
  const [filteredItems, setFilteredItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [showButton, setShowButton] = useState(false)
  const [updateItemInDB] = useUpdateItemMutation()

  // Un effect para filtrar los items que estén en la lista Stock y mostrar por búsqueda de título
  useEffect(() => {
    // si los items existen
    if (!items || items.length === 0) return;

    // Filtrar los items cuya propiedad "list" sea "stock"
    const stockItems = items.filter((item => item.list === 'stock'))   

    // Filtrar los items con el keyword si existe
    const newFilteredItems = keyword
    ? stockItems.filter(item => item.title.includes(keyword))
    : stockItems;

    // Verificar si realmente hay cambios en filteredItems antes de actualizar el estado
    if (JSON.stringify(newFilteredItems) !== JSON.stringify(filteredItems)) {
        setFilteredItems(newFilteredItems);
      } 
  },[keyword, items, filteredItems])

  useEffect(() => {
    setShowButton(selectedItems.length > 0)
  },[selectedItems])

  const handleSendToDelivered = async () => {
    selectedItems.forEach(item => {
      dispatch(updateItem({...item, list: 'delivered'}))
    })
    for (const item of selectedItems) {
      try {
        await updateItemInDB({ id: item.id, ...item, list: 'delivered'})
      } catch (error) {
        console.error('Error actualizando la base de datos:', error);
      }
    }
  }

    if (isLoading) return <View><Text>Cargando...</Text></View>
    if (error) return <View><Text>Error al cargar los datos.</Text></View>

  return (
    <View style={styles.container}>
      <Search onSearch={setKeyword}/>      
      <View style={styles.itemList}>
        <ItemList items={filteredItems} navigation={navigation} list="stock" onItemsSelected={setSelectedItems}/>
      </View>
      {showButton && (
        <Button title='Tarjetas despachadas' onPress={handleSendToDelivered}/>
      )}
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
  }
})