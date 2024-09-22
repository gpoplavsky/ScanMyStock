import { Button, StyleSheet, View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import ItemList from '../components/ItemList';
import Search from '../components/Search';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteItemMutation, useGetItemsQuery, useUpdateItemMutation } from '../services/inventory';
import { updateItem } from '../features/items/itemsSlice';

const Archived = ({navigation}) => {
  const {data: items = [], isLoading, error} = useGetItemsQuery()
  console.log(items);
  
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')
  const [filteredItems, setFilteredItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [showButton, setShowButton] = useState(false)
  const [updateItemInDB] = useUpdateItemMutation()
  const [deleteItem] = useDeleteItemMutation()


  useEffect(() => {
      // si los items existen
      if (!items || items.length === 0) return;

      // Filtrar los items cuya propiedad "list" sea "archived"
      const archivedItems = items.filter((item => item.list === 'archived'))   
  
      // Filtrar los items con el keyword si existe
      const newFilteredItems = keyword
      ? archivedItems.filter(item => item.title.includes(keyword))
      : archivedItems;
  
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
          await updateItemInDB({id: item.id, ...item, list:'delivered'})
        } catch (error) {
          console.error('Error actualizando la base de datos:', error);
        }
      }
    }

    const handleDeleteSelectedItems = async () => {
      for (const item of selectedItems) {
        try {
          await deleteItem(item.id)
        } catch (error) {
          console.error('Error eliminando el item:', error);
        }
      }
      setSelectedItems([])
    }
  
    if (isLoading) return
    <View><Text>Cargando...</Text></View>
    if (error) return <View><Text>Error al cargar los datos.</Text></View>  

  return (
    <View style={styles.container}>
      <Search onSearch={setKeyword}/>      
      <View style={styles.itemList}>
        <ItemList items={filteredItems} navigation={navigation} list="archived" onItemsSelected={setSelectedItems}/>
      </View>
      {showButton && (
        <><Button title='Tarjetas despachadas' onPress={handleSendToDelivered} /><Button title="Eliminar seleccionados" onPress={handleDeleteSelectedItems} /></>
      )}
    </View>
  )
}

export default Archived

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