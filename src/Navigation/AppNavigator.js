import React from "react";
//import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CountriesListScreen from "../screens/CountriesListScreen";
import CountryProfileScreen from "../screens/CountryProfileScreen";
import FavouriteScreen from "../screens/FavouriteScreen";
import BottomNav from "../component/BottomNav";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="CountriesList" component={CountriesListScreen} />
        <Stack.Screen name="CountryProfile" component={CountryProfileScreen} />
        <Stack.Screen name="Favourite" component={FavouriteScreen} />
      </Stack.Navigator>
      <BottomNav />
    </>
  );
}
