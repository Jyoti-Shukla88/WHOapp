import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/app/store";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/Navigation/AppNavigator";
import { checkVersionRequest } from "./src/features/versionslice";
import { View, Text, ActivityIndicator } from "react-native";

// Wrapper component for version check
function StartupWrapper() {
  const dispatch = useDispatch();
  const { loading, needsUpdate, currentVersion, remoteVersion } = useSelector(
    (state) => state.version
  );

  useEffect(() => {
    console.log("Dispatching version check...");
    dispatch(checkVersionRequest());
  }, [dispatch]);
  
  
  // Show loader while checking
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Checking version...</Text>
      </View>
    );
  }

  // Show update screen if outdated
  if (needsUpdate) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
          Update Required!{"\n"}
          Current: {currentVersion} | Latest: {remoteVersion}
        </Text>
      </View>
    );
  }
  return <AppNavigator />;
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StartupWrapper />
      </NavigationContainer>
    </Provider>
  );
}
