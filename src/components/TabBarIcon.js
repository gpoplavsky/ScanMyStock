import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from '../global/colors';


const TabBarIcon = ({icon,focused}) => {
  return (
    <View style={styles.container} >
      <View style={{backgroundColor: focused ? colors.color2 : "white",flex:1,borderRadius:3,width:42,height:42,alignItems:"center"}}>
        <MaterialIcons 
          style={styles.tabBarIcon}
          name={icon} 
          size={34} 
          color={focused ? "white" : colors.color2}
        />
      </View>
    </View>
  )
}

export default TabBarIcon

const styles = StyleSheet.create({
    container:{
        width:42,
        height:42,
        borderRadius:3,
        justifyContent:"center",
        alignItems:"center",
        padding:1,
    },
    tabBarIcon:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:3
    }
})