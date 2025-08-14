import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/colors'
import { router } from 'expo-router'

const index = () => {

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require("../../assets/images/i1.png")} style={{
            width:"100%",height:"90%"
          }} />
        </View>
        <View style={styles.MainContainer}>
          <Text style={styles.WelcomeText}>
            Welcome Back
          </Text>
          <TextInput placeholder='Email' style={styles.textInput} />
          <TextInput placeholder='Password' style={styles.textInput} />
          <TouchableOpacity style={styles.btnSupport}>
            <Text onLongPress={()=>router.push('/verify-email')} style={styles.btnStyle}>
              Login
            </Text>
          </TouchableOpacity>
          <View style={{marginTop:20}}>
            <Text style={styles.redirectSignup}>
              Dont have account <Text style={{color:"blue"}} onPress={()=>router.push('/sign-up')} >Signup</Text>
            </Text>
        </View>
        </View>

    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f0f0f0",
        paddingVertical:20
    },
    imageContainer:{
      width:"100%",
      height:"50%",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
    },
    WelcomeText:{
      textAlign:"center",
      fontSize:40,
      fontWeight:"800"
    },
    MainContainer:{
      width:"100%",
      height:"50%",
      display:"flex",
      flexDirection:"column",
      gap:"2px",
      alignItems:"center",
    },
    textInput:{
      width:"80%",
      height:"auto",
      padding:10,
      fontSize:20,
      marginVertical:20,
      borderWidth:1,
      borderRadius:10
    },
    btnStyle:{
      fontSize:30,
      marginTop:20,
      backgroundColor:COLORS.primary,
      color: "#f0f0f0",
      width:"100%",
      textAlign:"center",
      borderRadius:10,
      padding:5,
      textTransform:'uppercase',
      fontWeight:600
    },
    btnSupport:{
      width:"80%",
      alignItems:"center",

    },
    redirectSignup:{
      fontSize:20
    }
})