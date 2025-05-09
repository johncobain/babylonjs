import React from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 32, alignSelf: "center", marginVertical: 24 }}>
        Home Page
      </Text>
      <Text
        style={{
          padding: 16,
          fontSize: 24,
          borderColor: "#000",
          borderWidth: 1,
          backgroundColor: "#8686f6",
        }}
        onPress={() => router.push("/render")}
      >
        Render
      </Text>
    </View>
  );
}
