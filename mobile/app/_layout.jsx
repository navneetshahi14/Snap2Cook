import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, StatusBar, View } from "react-native";

import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function RootLayout() {

  const [token, setToken] = useState(undefined)

  useEffect(() => {
    const loadToken = async () => {
      const StoredToken = await SecureStore.getItemAsync("token");
      setToken(StoredToken);
    }

    loadToken();
  }, [])


  if (token === undefined) {
    // Loading screen jab tak token check ho raha hai
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }


  return (
    <>
      <StatusBar barStyle={"light-content"} />
      {/* <Redirect href={"/(tabs)"} /> */}
      <Stack screenOptions={{
        headerShown: false,
        animation:"slide_from_bottom"
      }} 
        initialRouteName={token ? "(tabs)" : "(auth)"}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  )
}
