import { Redirect, Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle={"light-content"}  />
      {/* <Redirect href={"/(auth)"} /> */}
      <Stack screenOptions={{
        headerShown: false,
      }} >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  )
}
