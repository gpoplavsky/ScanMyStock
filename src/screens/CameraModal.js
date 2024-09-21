import { Modal, StyleSheet, Text, View, Pressable,Alert, TouchableOpacity } from 'react-native'
import { colors } from '../global/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../reducers/itemReducer';


const CameraModal = ({ visibleCameraModal, handleVisibleCameraModal}) => {

    const dispatch = useDispatch();

    // Acá van los estados y permisos de la cámara
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scannedData, setScannedData] = useState([]);

    // Acá van las funciones de la cámara 

        // Función para manejar los códigos de barra escaneados y guardarlos en un array de Estado
        function handleBarcodeScanned({ type, data }) {
            const newItem = {
                id: Date.now(), // Genera un ID único basado en fecha/hora -> se va a reemplazar con firebase
                date: new Date().toISOString(), // Timestamp
                title: data, // Guarda el código escaneado como título
                dni: "",
                name: "",
                email: "",
                account: "",
                status: "",
                list: "",
            }
            dispatch(addItem(newItem)) // despacha la acción para agregar item
            setScannedData(newItem); // Almacena los datos escaneados localmente
        }    

    // un useEffect que al obtener un dato escaneado, cierra el modal de la cámara para que no se produzca un escaneo infinito

    useEffect(() => {
        if (!scannedData || scannedData.length === 0) {
            return; // No hace nada si scannedData es null, undefined o un array vacío
        } else {
            alert(`Código escaneado: ${scannedData.data}`);
            handleVisibleCameraModal();
            console.log({ scannedData });
        }
    }, [scannedData]);
    
      
    // Si los permisos de la cámara todavía no fueron cargados
    if (!permission) {
        return (
        <View style={styles.containerCamera}>
            <Text style={styles.message}>Se están cargando los permisos de la cámara...</Text>
        </View>
        );
    }

    // Si todavía no se dieron los permisos para ingresar a la cámara
    if (!permission.granted) {
        return (
        <View style={styles.containerCamera}>
            <Text style={styles.message}>Necesitamos tu permiso para acceder a la cámara</Text>
            <Pressable style={styles.primaryBtn} onPress={requestPermission}>
                <Text style={styles.primaryBtnText}>Conceder permiso</Text>
            </Pressable>
        </View>
        );
    }

    // Función para intercambiar entre camara frontal o trasera

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }


    return (
        <Modal 
            visible={visibleCameraModal} 
            animationType='slide' 
            onRequestClose={()=> {
                Alert.alert('Se cerró el scanner');
                {handleVisibleCameraModal()};
            }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text></Text>
                    <Text style={styles.title}>Scanner</Text>
                    <TouchableOpacity style={styles.icon} onPress={handleVisibleCameraModal}>
                        <MaterialIcons 
                        name="close" 
                        size={24} 
                        color={colors.dark} 
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerCamera}>
                    <CameraView style={styles.camera} 
                        facing={facing} 
                        onBarcodeScanned={handleBarcodeScanned} 
                        >
                    </CameraView>
                </View>
                <View style={styles.containerBottom}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.primaryBtn} onPress={toggleCameraFacing}>
                            <Text style={styles.primaryBtnText}>Cambiar cámara</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondaryBtn} onPress={handleVisibleCameraModal}>
                            <Text style={styles.secondaryBtnText}>Cerrar escaner</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default CameraModal

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
    containerCamera:{
        width:"95%",
        height:400,
        backgroundColor:"black",
        alignItems:"center",
        justifyContent:"center",
    },
    camera:{
        width:"95%",
        height:400
    },
    message:{
        textAlign:"center",
        color:colors.dark,
        fontSize:11,
        fontStyle:"italic"
    },
    containerBottom:{
        alignItems:"center",
        justifyContent:"center",
        marginBottom:30,
    },
    buttonContainer:{
        gap:5
    },
    primaryBtn:{
        backgroundColor: colors.color1,
        borderRadius: 3,
        width:277,
        height:48,
        justifyContent:"center"
    },
    primaryBtnText:{
        color: "white",
        fontWeight: "bold",
        textAlign:"center",
        fontSize:18
    },
    secondaryBtn:{
        backgroundColor: "#00000000",
        borderRadius: 3,
        width:277,
        height:48,
        justifyContent:"center"
    },
    secondaryBtnText:{
        color: colors.color1,
        fontWeight: "bold",
        textAlign:"center",
        fontSize:18
    }
})