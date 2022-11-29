import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ListingPage } from "./pages/ListingPage";
import { DetailsPage } from "./pages/DetailsPage";
import { LoginPage } from "./pages/LoginPage";
import { Provider } from "react-redux";
import store from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
// Lets define it here first for clear comparision
import { StackParamList } from "./typed";
import { useAppDispatch } from "./hooks";
import React, { useEffect } from "react";
import { getTokenfromStore } from "./store/user/thunk";
import { UserDashboardReqPage } from "./pages/UserDashboardReqPage";
import { UserDashboardListingPage } from "./pages/UserDashboardListingPage";

// const Stack = createStackNavigator();

// // You are using Line 46 Stack instead of RootStack, so Stack is the one you want to type
const Stack = createStackNavigator<StackParamList>();

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarStyle: { position: "absolute" },
//       }}
//     >
//       <Tab.Screen name="Listing" component={ListingPage} />
//       <Tab.Screen name="Details" component={DetailsPage} />
//       <Tab.Screen name="Add" component={AddNewPage} />
//     </Tab.Navigator>
//   );
// }

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const DashboardTab = createMaterialTopTabNavigator();

function DashboardTabs() {
  return (
    <DashboardTab.Navigator>
      <DashboardTab.Screen
        name="UserRequests"
        component={UserDashboardReqPage}
      />
      <DashboardTab.Screen
        name="UserListings"
        component={UserDashboardListingPage}
      />
    </DashboardTab.Navigator>
  );
}

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTokenfromStore());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="UserDashboard" component={DashboardTabs} />

        <Stack.Screen name="Listing" component={ListingPage} />
        <Stack.Screen name="Details" component={DetailsPage} />
      </Stack.Navigator>
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

{
  //   /* <Stack.Navigator>
  // <Stack.Screen name="Listing" component={ListingPage} />
  // <Stack.Screen name="Details" component={DetailsPage} />
  // </Stack.Navigator> */
}
