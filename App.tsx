import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ListingPage } from "./pages/ListingPage";
import { DetailsPage } from "./pages/DetailsPage";
import { AddNewPage } from "./pages/AddNewPage";
import { Provider } from "react-redux";
import store from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { position: "absolute" },
      }}
    >
      <Tab.Screen name="Listing" component={ListingPage}></Tab.Screen>
      <Tab.Screen name="Details" component={DetailsPage}></Tab.Screen>
      <Tab.Screen name="Add" component={AddNewPage}></Tab.Screen>
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

export default AppWrapper;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
