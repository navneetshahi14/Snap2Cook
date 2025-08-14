import React from 'react'
import {Stack} from 'expo-router'

const AuthLayout = () => {
  return (
    <>
        <Stack 
            screenOptions={{
                headerShown:false,
                animation:"flip"
            }}
        >
            <Stack.Screen name='index' />
            <Stack.Screen name='sign-up' />
            <Stack.Screen name='verify-email' />
        </Stack>
    </>
  )
}

export default AuthLayout

// const styles = StyleSheet.create({
//     container: {
//         flex : 1,
//         backgroundColor: "#fff01"
//     }
// })