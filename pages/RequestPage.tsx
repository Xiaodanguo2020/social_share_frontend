import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectRequests } from "../store/request/selector";
import { fetchRequests } from "../store/request/thunk";
import RequestCard from "../componants/RequestCard";

export function RequestPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRequests());
    // dispatch(getTokenfromStore());
  }, []);

  const requetsData = useAppSelector(selectRequests);

  //   console.log("this is my select data", requestsData);

  return (
    <View style={{ alignItems: "center" }}>
      <ScrollView>
        {!requetsData ? (
          <ActivityIndicator />
        ) : (
          requetsData.map((req) => {
            return <RequestCard key={req.id} request={req} />;
          })
        )}
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.buttonText}>New request</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 16,
    alignSelf: "center",
    paddingHorizontal: 16,

    alignItems: "center",
    backgroundColor: "#3285D1",
    height: 40,
    justifyContent: "center",
    color: "white",
    borderRadius: 32,
    shadowColor: "#3285D1",
    shadowOpacity: 0.2,

    shadowOffset: {
      width: 4,
      height: 4,
    },
  },
  buttonText: {
    color: "white",
    // margin: 64,
    marginLeft: 0,
  },
});
