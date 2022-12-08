import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import { ListingPage } from "./pages/ListingPage";
import { DetailsPage } from "./pages/DetailsPage";
import { LoginPage } from "./pages/LoginPage";
import { Provider } from "react-redux";
import store from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
// Lets define it here first for clear comparision
import { RootStackParamList, StackParamList } from "./typed";
import { useAppDispatch, useAppSelector } from "./hooks";
import React, { useEffect } from "react";
import { getTokenfromStore } from "./store/user/thunk";
import { UserDashboardReqPage } from "./pages/UserDashboardReqPage";
import { UserDashboardListingPage } from "./pages/UserDashboardListingPage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import MapViewPage from "./pages/MapViewPage";
import DashboardPage from "./pages/DashboardPage";
import io from "socket.io-client";
import { wsUrl } from "./config/constance";
import { selectUser } from "./store/user/selector";
import { current } from "@reduxjs/toolkit";
import { updateOrderStatus } from "./store/listing/thunk";
import { get } from "react-hook-form";

// const Stack = createStackNavigator();

// // You are using Line 46 Stack instead of RootStack, so Stack is the one you want to type
const Stack = createStackNavigator<StackParamList>();
const socket = io(wsUrl);

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const BottomTab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="ListingRoot"
        component={ListingStacks}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="cleaning-services" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="RequestRoot"
        component={ListingStacks}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home-repair-service" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="User"
        component={DashboardTabs}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="house-user" size={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const DashboardTab = createMaterialTopTabNavigator();

export function DashboardTabs() {
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

const RootStack = createStackNavigator<RootStackParamList>();

function RootStacks() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        options={{
          headerShown: false,
        }}
        name="Main"
        component={BottomTabs}
      />
      <RootStack.Screen name="Login" component={LoginPage} />
    </RootStack.Navigator>
  );
}

const ListingStack = createStackNavigator<StackParamList>();
function ListingStacks() {
  return (
    <ListingStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: true,
      }}
    >
      <ListingStack.Screen name="Listing" component={ListingPage} />
      <ListingStack.Screen
        options={{
          headerShown: true,
        }}
        name="MapView"
        component={MapViewPage}
      />
      <ListingStack.Screen name="Details" component={DetailsPage} />
    </ListingStack.Navigator>
  );
}

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTokenfromStore());
  }, []);

  const currentUser = useAppSelector(selectUser);
  // console.log("user data", currentUser);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("order_updated", (order, listing, request) => {
      console.log("order_updated");
      if (currentUser.id === parseInt(request.userId)) {
        Alert.alert(
          "order update:",
          `your request to "${listing.title}" is ${order.status}`,
          [
            {
              text: "ok",
              // onPress: () => {
              //   dispatch(getTokenfromStore());
              // },
            },
          ]
        );
      }
    });

    socket.on("request_send", (listing, newRequest, newOrder) => {
      console.log("request_send");
      if (currentUser.id === parseInt(listing.userId)) {
        Alert.alert(
          `New request`,
          `there is new request for your listing "${listing.title}"`,
          [
            {
              text: "ok",
              // onPress: () => {
              //   dispatch(getTokenfromStore());
              // },
            },
          ]
        );
      }
      // dispatch(getTokenfromStore());
      console.log("listing", listing);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("request_send");
    };
  }, []);

  return (
    <NavigationContainer>
      <RootStacks />
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
