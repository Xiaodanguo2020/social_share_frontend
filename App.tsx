import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ListingPage } from "./pages/ListingPage";
import { Provider } from "react-redux";
import store from "./store";
import { NavigationContainer } from "@react-navigation/native";

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <ListingPage />
      </View>
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
