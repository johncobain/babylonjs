import React from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Home Page</Text>
      <Text onPress={() => router.push("/render")}>Render</Text>
    </View>
  );
}
