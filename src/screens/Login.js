import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputForm from '../components/InputForm'
import PrimaryBtn from '../components/PrimaryBtn'
import SecondaryBtn from '../components/SecondaryBtn'
import { colors } from '../global/colors'
import { loginSchema } from '../validations/loginSchema'
import { setUser } from '../features/auth/authSlice'
import { useLoginMutation } from '../services/auth'
import { useDispatch } from 'react-redux'

const Login = ({navigation}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorEmail, setErrorEmail] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [triggerLogin, {data, isSuccess, isError, error}] = useLoginMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    if(isError) {
      setErrorEmail("Email o contraseña inválido")
      setErrorPassword("Email o contraseña inválido")
    }
  },[isError])

  const onsubmit = async () => {
    try {
      loginSchema.validateSync({email,password})
      const {data} = await triggerLogin({email,password})
        //deleteSession()
        //insertSession(data)
        dispatch(setUser({
          email:data.email,
          idToken:data.idToken,
          localId:data.localId
        }))
    } catch (error) {
      console.error(error);
      switch (error.path) {
        case "email":
          setErrorEmail(error.message)
          setErrorPassword("")
          break;
        case "password":
          setErrorPassword(error.message)
          setErrorEmail("")
          break;
        default:
          break;
      }
      
    }
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Image source={require('../../assets/img/logo.png')}/>
        <Text style={styles.title}>Iniciar sesión</Text>
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
          placeholder={"Ingrese su contraseña"}
          onChangeText={(t) => setPassword(t)}
          error={errorPassword}
          isSecure={true}
        />
        <PrimaryBtn
          onPress={onsubmit}
          Title={"Ingresar"}
        />
        <SecondaryBtn
          onPress={() => navigation.navigate('Register')}
          Title={"Registrarse"}
        />
      </View>
    </View>
  )
}

export default Login

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