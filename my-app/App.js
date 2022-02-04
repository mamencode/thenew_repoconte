import React, { useState } from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RootNavigation from "./screens/RootNavigation";
import { CredentialsContext } from "./components/CredentialsContext";
import AppLoading from "expo-app-loading";

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkLoginCredentials = () => {
    AsyncStorage.getItem("user")
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch((error) => console.log("error"));
  };
  if (!appReady) {
    return (
      <AppLoading
        style={styles.apploading}
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <CredentialsContext.Provider
      value={{ storedCredentials, setStoredCredentials }}
    >
      <RootNavigation />
    </CredentialsContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  apploading: {
    flex: 1,
    justifyContent: "center",

    alignItems: "center"
  }
});
