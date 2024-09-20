import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from '../global/colors';

const CameraButton = ({onPressCameraButton}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cameraButton} onPress={onPressCameraButton}>
        <MaterialIcons name="camera-alt" size={48} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default CameraButton

const styles = StyleSheet.create({
  container:{
    width:80,
    height:60,
    backgroundColor: colors.color2,
    borderRadius: 6,
    padding:3,
    justifyContent:"center",
    alignItems:"center"
  },
  cameraButton:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
})