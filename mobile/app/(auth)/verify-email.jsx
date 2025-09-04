import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../constants/colors";
import { router, useRouter } from "expo-router";
import { API_URL } from "../../constants/api";

import * as SecureStore from 'expo-secure-store';

const VerifyEmail = () => {

  const router = useRouter()

  const [email,setEmail] = useState("");
  const [otp,setOtp] = useState("");

  const handleVerifyEmail = async() =>{

    const mailed = await SecureStore.getItemAsync('user');
    const allMail = await JSON.parse(mailed);
    const mail= allMail?.email
    console.log(mail);
    setEmail(mail);
    // await SecureStore.deleteItemAsync('email');

    const tokens = await SecureStore.getItemAsync('user');
    console.log(tokens)
    const alltoke = await JSON.parse(tokens)
    console.log(alltoke)
    const token = alltoke?.token
    console.log(token)
    const data = await fetch(`${API_URL}/api/auth/verifyEmail`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        email,otp,token
      })
    })

    const res = await data.json();

    await SecureStore.deleteItemAsync('user')
    await SecureStore.setItemAsync('token',JSON.stringify(res?.token));

    router.push('/(tabs)')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/i3.png")}
          style={{
            width: "100%",
            height: "90%",
          }}
        />
      </View>
      <View style={styles.MainContainer}>
        <Text style={styles.WelcomeText}>Verify Email</Text>
        <TextInput placeholder="Enter Verification Code" style={styles.textInput} onChangeText={setOtp} />
        <TouchableOpacity onPress={handleVerifyEmail} style={styles.btnSupport}>
          <Text style={styles.btnStyle}>Verify Email</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>router.back()} style={styles.btnSupport}>
          <Text style={styles.btnStyle2}>Back to Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingVertical: 20,
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
    fontWeight: "800",
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
    borderRadius: 10,
    borderColor:COLORS.border,
    color:COLORS.text,
  },
  btnStyle: {
    fontSize: 25,
    marginTop: 20,
    backgroundColor: COLORS.primary,
    color: "#f0f0f0",
    width: "100%",
    textAlign: "center",
    borderRadius: 10,
    padding: 5,
    textTransform: "uppercase",
    fontWeight: 600,
  },
  btnStyle2: {
    fontSize: 20,
    marginTop: 20,
    backgroundColor: COLORS.background,
    color: COLORS.text,
    width: "100%",
    textAlign: "center",
    borderRadius: 10,
    padding: 5,
    textTransform: "uppercase",
    fontWeight: 400,
  },
  btnSupport: {
    width: "80%",
    alignItems: "center",
  },
  redirectSignup: {
    fontSize: 20,
  },
});
