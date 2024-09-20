import { Alert, StyleSheet, Text, View, Modal, Pressable, TouchableOpacity } from 'react-native'
import PrimaryBtn from './PrimaryBtn';
import SecondaryBtn from './SecondaryBtn';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from '../global/colors';

const ModalPrimary = ({visible, text, title, modalPrompt, handleVisibleModal, handleModal, primaryTextBtn, secondaryTextBtn}) => {

  return (
 
    <Modal 
      visible={visible} 
      animationType='slide' 
      onRequestClose={()=> {
        Alert.alert('Se cerró el modal');
        {handleVisibleModal()};
      }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text></Text>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.icon} onPress={handleVisibleModal}>
            <MaterialIcons 
            name="close" 
            size={24} 
            color={colors.dark} 
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerContent}>
          <View style={styles.content}>
            <View style={styles.contentPrompt}>
              {modalPrompt}
            </View>
          </View>
        </View>
        <View style={styles.containerBottom}>
          <View style={styles.containerText}>
            <Text style={styles.text}>{text}</Text>
            <View style={styles.buttonContainer}>
              <PrimaryBtn onPress={handleModal} Title={"Confirmar"} />
              <SecondaryBtn onPress={handleVisibleModal} Title={"Cancelar"} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ModalPrimary

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white",
    alignItems: "center",
    justifyContent:"space-between"
  },
  header:{
    width:"95%",
    borderBottomColor:colors.dark,
    borderBottomWidth:1,
    paddingBottom:10,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  title:{
    color:colors.dark,
    fontSize:24,
    fontWeight:"bold",
    textAlign:"center",
  },
  icon:{
    marginRight:7
  },
  containerContent:{
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    display:"flex"
  },
  content:{
    width:"90%",
    height:180,
    justifyContent:"center",
    alignItems:"center",
    borderColor:"black",
    borderWidth:4,
  },
  contentPrompt:{
    margin:0,
    padding:0,
  },
  containerBottom:{
    alignItems:"center",
    justifyContent:"center",
    marginBottom:30,
  },
  containerText:{
    alignItems:"center",
    display:"flex"
  },
  text:{
    color:colors.dark,
    textAlign:"justify",
    marginBottom:30,
    fontSize:16
  },
  buttonContainer:{
    gap:5
  },
})