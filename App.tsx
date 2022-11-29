import { ListingPage } from "./pages/ListingPage";
import { DetailsPage } from "./pages/DetailsPage";
import { LoginPage } from "./pages/LoginPage";
import { Provider } from "react-redux";
import store from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { StackParamList } from "./typed";
import { useAppDispatch } from "./hooks";
import React, { useEffect } from "react";
import { getTokenfromStore } from "./store/user/thunk";
import { UserDashboardPage } from "./pages/UserDashboardPage";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const DashboardTab = createMaterialTopTabNavigator();


function DashboardTabs() {
  return (
    <DashboardTab.Navigator>
      <DashboardTab.Screen name="Request" component={UserDashboardPage} />
      <DashboardTab.Screen name="Listing" component={UserDashboardPage} />
    </DashboardTab.Navigator>
  );
}

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

const RootStack = createStackNavigator()

function RootStacks() {
  <RootStack.Navigator>
    <RootStack.Screen name="Login" component={LoginPage}/>
    <RootStack.Screen name="Main" component={BottomTabs}/>
  </RootStack.Navigator>
}



const ListingStack = createStackNavigator<StackParamList>()
function ListingStacks() {
  return (<ListingStack.Navigator
    screenOptions={{
      // headerTransparent: true
    }}
  >
    <ListingStack.Screen name="Listing" component={ListingPage} />
    <ListingStack.Screen name="Details" component={DetailsPage} />
  </ListingStack.Navigator>)
}

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTokenfromStore());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <BottomTabs/>
    </NavigationContainer>
  );
}

export default AppWrapper;
