import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../global/colors'
import Item from './Item'

const ItemList = ({navigation, items, onItemsSelected}) => {
    // ItemList puede mostrar los items provenientes de un padre, un filtro, o seleccionar para una acción masiva

    // Primero vamos a crear las funciones para la selección de items
    // Creamos un estado para manejar los items seleccionados
    const [selectedItems, setSelectedItems] = useState([])

    useEffect(() => {
        onItemsSelected(selectedItems);
    },[selectedItems])

    // Luego, un manejador para avisarle al padre sobre los items seleccionados
    const handleSelectedItem = (item, isSelected) => {
        if (isSelected) {
            setSelectedItems([...selectedItems, item]); //los items seleccionados se agregan a un array
        } else {
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== item.id))
        }
    }

    // La otra funcionalidad de ItemList es de filtrar items por términos de búsqueda o filtros generales
    // Para eso, primero creamos un estado de items filtrados
    const [filteredItems, setFilteredItems] = useState(items)
    // Actualizamos la vista con los items filtrados
    useEffect(() => {
        setFilteredItems(items)
    }, [items])
    
    const renderItem = ({item}) => (
        <Item item={item} navigation={navigation} onSelectItem={handleSelectedItem}/> //Le pasamos la navegación (para ItemDetail) y el manejador de los items seleccionados, el que permitirá cambiar el checkbutton
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    )
}

export default ItemList

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:"100%",
        backgroundColor:colors.light,
    },
    listContainer: {
        alignItems: 'center',
        gap:10,
        
    },    
})