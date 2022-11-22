import { StyleSheet } from "react-native";
import { ListingPage } from "./pages/ListingPage";
import { DetailsPage } from "./pages/DetailsPage";
import { AddNewPage } from "./pages/AddNewPage";
import { Provider } from "react-redux";
import store from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type ListingStackParamList = {
  Listing: undefined;
  Details: { listingId: number };
};

type RootTabParamList = {
  ListingRoot: undefined;
  Add: undefined;
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const ListingStack = createNativeStackNavigator<ListingStackParamList>();
function ListingRoot(){
  return <MyListingStack />
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { position: "absolute" },
      }}
    >
      <Tab.Screen name="ListingRoot" component={ListingRoot}></Tab.Screen>
      <Tab.Screen name="Add" component={AddNewPage}></Tab.Screen>
    </Tab.Navigator>
  );
}

function MyListingStack() {
  return (
    <ListingStack.Navigator>
      <ListingStack.Screen name="Listing" component={ListingPage}/>
      <ListingStack.Screen name="Details" component={DetailsPage} initialParams={{ listingId: 1 }}/>
    </ListingStack.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

export default AppWrapper;
