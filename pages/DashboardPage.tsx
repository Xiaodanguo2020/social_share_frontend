import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { UserScreenProps, UserType } from "../typed";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  selectMyListing,
  selectMyRequest,
  selectUser,
} from "../store/user/selector";
import { logOut } from "../store/user/slice";
import { DashboardTabs } from "../App";

export default function DashboardPage({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch();
  const userData: UserType = useAppSelector(selectUser);
  return (
    <View>
      <View style={styles.userContainer}>
        <Image style={styles.avatarImage} source={{ uri: userData?.image }} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{userData?.name}</Text>
          <Text>Amsterdam</Text>
          <Text style={styles.description}></Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch(logOut());
            navigation.navigate("Login");
          }}
        >
          <Text>LogOut</Text>
        </TouchableOpacity>
      </View>
      <DashboardTabs></DashboardTabs>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    resizeMode: "cover",
    backgroundColor: "blue",
  },
  name: {
    fontSize: 14,
    color: "#293F51",
    fontWeight: "600",
    marginBottom: 8,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingTop: 8,
    padding: 16,
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  description: {
    fontSize: 14,
    color: "#657D90",
    fontWeight: "400",
    opacity: 0.8,
  },
  button: {
    alignItems: "center",
    // backgroundColor: "#293F51",
    height: 40,
    justifyContent: "center",
    color: "white",
    borderRadius: 4,
    width: 88,
    borderColor: "#293F51",
    borderWidth: 1,
    margin: 8,
  },
});
