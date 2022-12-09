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
import { BottomTabsParamList, ListingStackParamList, MainScreenProps, RootStackParamList } from "./typed";
import { useAppDispatch, useAppSelector } from "./hooks";
import React, { useEffect } from "react";
import { getTokenfromStore } from "./store/user/thunk";
import { setSocket } from "./store/appState/slice";
import { UserDashboardReqPage } from "./pages/UserDashboardReqPage";
import { UserDashboardListingPage } from "./pages/UserDashboardListingPage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { selectToken } from "./store/user/selector";
import { socket } from "./socket/socket";
import ChatPage from "./pages/ChatPage";


const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const BottomTab = createBottomTabNavigator<BottomTabsParamList>();

function BottomTabs({navigation}: MainScreenProps) {
  const token = useAppSelector(selectToken)
  useEffect(() => {
    navigation.navigate("Login")
  },[token])
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
      <BottomTab.Screen
        name="Chat"
        component={ChatPage}
      />
    </BottomTab.Navigator>
  );
}

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

const ListingStack = createStackNavigator<ListingStackParamList>();
function ListingStacks() {
  return (
    <ListingStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <ListingStack.Screen name="Listing" component={ListingPage} />
      <ListingStack.Screen name="Details" component={DetailsPage} />
    </ListingStack.Navigator>
  );
}

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTokenfromStore());
  }, []);
  useEffect(() => {
    socket.on('connect', () => {
      console.log("connected")
    });

    socket.on('disconnect', () => {
      console.log("disconnected")
    });

    socket.on('order_updated',(something)=> {
      console.log('got event order_updated with', something)
    })

    return () => {
      socket.off('connect');
      socket.off('disconnect');
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
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
