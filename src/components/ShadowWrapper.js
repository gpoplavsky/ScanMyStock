import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'

const ShadowWrapper = ({style,children}) => {
  
  return (
    <View style={[styles.container,style]}>
      {children}
    </View>
  )
}

export default ShadowWrapper

const styles = StyleSheet.create({
  container:{
    shadowColor: "black",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.22,
    elevation: 4
  }
})