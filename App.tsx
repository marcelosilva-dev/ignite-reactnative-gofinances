import "react-native-gesture-handler";

import "intl";
import "intl/locale-data/jsonp/pt-BR";

import { StatusBar } from "react-native";

import React from "react";

import { Routes } from "./src/routes";

import { NavigationContainer } from "@react-navigation/native";

import { ThemeProvider } from "styled-components";

import AppLoading from "expo-app-loading";

import { SignIn } from "./src/screens/SignIn";

import { AuthProvider, useAuth } from "./src/hooks/auth";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { userStoragedLoading } = useAuth();

  if (!fontsLoaded || userStoragedLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
