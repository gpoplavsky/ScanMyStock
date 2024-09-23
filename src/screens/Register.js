import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputForm from '../components/InputForm'
import { colors } from '../global/colors'
import { useRegisterMutation } from '../services/auth'
import PrimaryBtn from '../components/PrimaryBtn'
import SecondaryBtn from '../components/SecondaryBtn'
import { useDispatch } from 'react-redux'
import { registerSchema } from '../validations/registerSchema'
import { deleteSession, insertSession } from '../db'
import { setUser } from '../features/auth/authSlice'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const Register = ({navigation}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorEmail,setErrorEmail] = useState("")
  const [errorPassword,setErrorPassword] = useState("")
  const [errorConfirmPassword,setErrorConfirmPassword] = useState("")
  const dispatch = useDispatch()

  const auth = getAuth()

  const onsubmit = async() => {
    try {
      registerSchema.validateSync({email,password,confirmPassword})
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;
      deleteSession();
      insertSession({
        email: user.email,
        idToken: user.accessToken,
        localId: user.uid
      })
      dispatch(setUser({
        email: user.email,
        idToken: user.idToken,
        localId: user.uid
      }))
      navigation.navigate('Registered')
      
    } catch (error) {
      console.log("Error en el registro:",error);
      
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorEmail("Este email ya está en uso")
          setErrorPassword("")
          setErrorConfirmPassword("")
          break;
        case "auth/invalid-email":
          setErrorEmail("Email inválido")
          break;
        case "auth/weak-password":
          setErrorPassword("La contraseña debe tener al menos 6 caracteres")
          break;
        default:
          switch (error.path) {
            case "email":
              setErrorEmail(error.message);
              setErrorPassword("");
              setErrorConfirmPassword("");
              break;
            case "password":
              setErrorPassword(error.message);
              setErrorEmail("");
              setErrorConfirmPassword("");
              break;
            case "confirmPassword":
              setErrorConfirmPassword(error.message);
              setErrorEmail("");
              setErrorPassword("");
              break;
            default:
              break;
          }
        } 
    }
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Image source={require('../../assets/img/logo.png')}/>
        <Text style={styles.title}>Registro de usuario</Text>
        <InputForm
          label={"Email"}
          value={email}
          placeholder={"Ingrese su email"}
          onChangeText={(t) => setEmail(t)}
          isSecure={false}
          error={errorEmail}
        />
        <InputForm
          label={"Contraseña"}
          value={password}
          placeholder={"Genere su contraseña"}
          onChangeText={(t) => setPassword(t)}
          error={errorPassword}
          isSecure={true}
        />
        <InputForm
          label={"Confirmar contraseña"}
          value={confirmPassword}
          placeholder={"Confirme su contraseña"}
          onChangeText={(t) => setConfirmPassword(t)}
          error={errorConfirmPassword}
          isSecure={true}
        />
        <PrimaryBtn
          onPress={onsubmit}
          Title={"Registrarse"}
        />
        <SecondaryBtn
          onPress={() => navigation.navigate('Login')}
          Title={"Iniciar sesión"}
        />
      </View>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  main:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:colors.light
  },
  container:{
    width:"90%",
    justifyContent:"center",
    alignItems:"center",
    gap:15,
    paddingVertical:20,
    borderRadius:10,
    backgroundColor:colors.dark,
  },
  title:{
    fontSize:24,
    color:colors.light,
    marginBottom:9,
    fontWeight:"bold"
  }
})