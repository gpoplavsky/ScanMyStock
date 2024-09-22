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

const Register = ({navigation}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorEmail,setErrorEmail] = useState("")
  const [errorPassword,setErrorPassword] = useState("")
  const [errorConfirmPassword,setErrorConfirmPassword] = useState("")
  const [triggerRegister, {data,isSuccess,isError,error}] = useRegisterMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      console.log("Error en la mutación de registro:", error);
      setErrorEmail("Email inexistente")
    }
  },[isError, error])

  const onsubmit = async() => {
    try {
      registerSchema.validateSync({email,password,confirmPassword})
      const result = await triggerRegister({ email, password })
      if (result?.data) {
        const { email, idToken, localId } = result.data
        deleteSession()
        insertSession(result.data)
        dispatch(setUser({ email , idToken, localId}))
      } else {
        console.log("Error en la respuesta:", result);
      }
      
    } catch (error) {
      console.log(error);
      
      switch (error.path) {
        case "email":
          setErrorEmail(error.message)
          setErrorPassword("")
          setErrorConfirmPassword("")
          break;
        case "password":
          setErrorEmail("")
          setErrorPassword(error.message)
          setErrorConfirmPassword("")
          break;
        case "confirmPassword":
          setErrorEmail("")
          setErrorPassword("")
          setErrorConfirmPassword(error.message)
          break;
      } 
    }
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Image source={'../../assets/img/logo.png'}/>
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
    fontSize:22,
    color:colors.light,
    marginBottom:9
  }
})