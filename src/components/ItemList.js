import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'
import Item from './Item'

const ItemList = ({items, navigation}) => {
    
    const renderItem = ({item}) => (
        <Item item={item} navigation={navigation} />
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
        backgroundColor:colors.light
    },
    listContainer: {
        alignItems: 'center',
        gap:10
    },    
})