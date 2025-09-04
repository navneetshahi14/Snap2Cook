import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../constants/colors'
import { useRouter } from 'expo-router'
import { API_URL } from '../../constants/api'
import * as SecureStore from 'expo-secure-store';

const SignUp = () => {

  const router = useRouter()

  const [user, setUser] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleRegister = async () => {
    const data = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user, email, password
      })
    })

    const res = await data.json();
    console.log(res)

    console.log(res.token);
    await SecureStore.setItemAsync('user',JSON.stringify(res));
    router.push('/verify-email')
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/images/i2.png")} style={{
          width: "100%", height: "90%"
        }} />
      </View>
      <View style={styles.MainContainer}>
        <Text style={styles.WelcomeText}>
          Create Account
        </Text>
        <TextInput placeholder='Username' style={styles.textInput} onChangeText={setUser} />
        <TextInput placeholder='Email' style={styles.textInput} onChangeText={setEmail} />
        <TextInput placeholder='Password' style={styles.textInput} onChangeText={setPassword} />
        <TouchableOpacity style={styles.btnSupport} onPress={handleRegister}>
          <Text style={styles.btnStyle}>
            Register
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.redirectSignup}>
            Already have Account <Text style={{ color: "blue" }} onPress={() => router.push('/')} >Signin</Text>
          </Text>
        </View>
      </View>

    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingVertical: 20
  },
  imageContainer: {
    width: "100%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  WelcomeText: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "800"
  },
  MainContainer: {
    width: "100%",
    height: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textInput: {
    width: "80%",
    height: "auto",
    padding: 10,
    fontSize: 20,
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 10
  },
  btnStyle: {
    fontSize: 30,
    marginTop: 20,
    backgroundColor: COLORS.primary,
    color: "#f0f0f0",
    width: "100%",
    textAlign: "center",
    borderRadius: 10,
    padding: 5,
    textTransform: 'uppercase',
    fontWeight: 600
  },
  btnSupport: {
    width: "80%",
    alignItems: "center",

  },
  redirectSignup: {
    fontSize: 20
  }
})