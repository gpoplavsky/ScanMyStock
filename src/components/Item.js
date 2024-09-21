import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Dimensions } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {colors} from '../global/colors'
import ShadowWrapper from './ShadowWrapper';

const Item = ({item,navigation}) => {

    const [checkButton, setCheckButton] = useState(true)

    const onPressCheckButton = () => {
        setCheckButton(!checkButton)
    }

    const onPressEdit = () => {
        navigation.navigate('Detail', {item})
    }
        
    const screenWidth = Dimensions.get('window').width;
    const itemWidth = screenWidth * 0.95;  

    return (
        <ShadowWrapper style={[styles.container, { width: itemWidth }]}>
            <View style={styles.checkboxContainer}>
                <TouchableWithoutFeedback 
                    accessible={true}
                    accessibilityRole='checkbox'
                    accessibilityState={checkButton}
                    onPress={onPressCheckButton}
                >
                    <View style={styles.button}>
                        {checkButton ? (
                            <MaterialIcons name="radio-button-checked" size={26} color={colors.dark} />
                        ) : (
                            <MaterialIcons name="radio-button-unchecked" size={26} color={colors.dark} />
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.titleContainer}>
                <TouchableOpacity 
                    onPress={onPressEdit}
                    style={styles.button}
                >
                    <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.editContainer}>
                <TouchableOpacity 
                    onPress={onPressEdit}
                    style={styles.button}
                >
                        <MaterialIcons name="edit" size={26} color={colors.dark}/>
                </TouchableOpacity>
            </View>
        </ShadowWrapper>
  )
}

export default Item

const styles = StyleSheet.create({
    container:{
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        borderColor: colors.dark,
        borderRadius: 3,
        borderWidth: 0.4,
        backgroundColor:"white"
        },
    checkboxContainer:{
        justifyContent:"center",
        width:48,
        height:48,
        position:"absolute",
        left:0,
        marginLeft:5
    },
    button:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        width:"100%"

    },
    titleContainer:{
        alignItems:"center",
        justifyContent:"center",
        width:"60%",
    },
    title:{
        color:colors.dark,
    },
    editContainer:{
        justifyContent:"center",
        width:48,
        height:48,
        position:"absolute",
        right:0,
        marginRight:5
    }
})