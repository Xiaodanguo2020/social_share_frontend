import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  selectMyListing,
  selectMyRequest,
  selectUser,
} from "../store/user/selector";
import { EnrichedListing, UserType } from "../typed";
import ListingSmallCard from "../componants/ListingSmallCard";
import { listingFetched } from "../store/listing/slice";
import moment from "moment";
import { Status } from "../typed";
import { updateOrderStatus } from "../store/listing/thunk";

export const UserDashboardListingPage = () => {
  const dispatch = useAppDispatch();
  const myListingData = useAppSelector(selectMyListing);
  const userData: UserType = useAppSelector(selectUser);
  const [status, setStatus] = useState<Status>("created");

  // const changeStatus = async (value: Status) => {
  //   setStatus(value);
  // };

  return (
    <ScrollView>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={"default"}
        showHideTransition={"fade"}
      />
      {!myListingData ? (
        <Text>loading...</Text>
      ) : (
        myListingData.map((list) => (
          <View key={list.id} style={styles.cardContainer}>
            <ListingSmallCard
              key={list.id}
              listing={{ ...list, user: userData }}
            />
            {list?.requests.map((req) => (
              <View key={req.id} style={styles.requestContainer}>
                <Text style={[styles.statusText]}>{req?.order?.status}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.userContainer}>
                    <Image
                      style={styles.avatarImage}
                      source={{ uri: req.user.image }}
                    />

                    <Text style={styles.description}>{req.user.name}</Text>
                  </View>
                  <View style={styles.dateContainer}>
                    <Text style={styles.description}>
                      start {moment(req.start_date).format("DD-MM-YY")}
                    </Text>
                    <Text style={styles.description}>
                      end {moment(req.end_date).format("DD-MM-YY")}
                    </Text>
                  </View>
                </View>
                <Text style={styles.title}>{req.title}</Text>
                <Text style={styles.description}>{req.description}</Text>
                {req?.order?.status === "accepted" ? (
                  <Text style={{ color: "blue" }}>
                    Address: {req.user.street_name} {req.user.house_nr}{" "}
                    {req.user.zip_code} Tel: 003156679989
                  </Text>
                ) : (
                  <Text></Text>
                )}
                {req?.order?.status !== "created" ? (
                  <Text></Text>
                ) : (
                  <View style={styles.choiceContainer}>
                    <TouchableOpacity
                      style={styles.buttonSec}
                      // color="black"
                      // backgroundColor="#293F51"
                      onPress={() => {
                        dispatch(
                          updateOrderStatus(list.id, req.id, "rejected")
                        );
                      }}
                    >
                      <Text>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonPrim}
                      // color="black"
                      // backgroundColor="#293F51"
                      onPress={() => {
                        dispatch(
                          updateOrderStatus(list.id, req.id, "accepted")
                        );
                      }}
                    >
                      <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    margin: 16,
  },
  requestContainer: {
    padding: 16,
    paddingBottom: 16,
    width: "100%",
    margin: 8,
    // borderBottomWidth: 1,
    backgroundColor: "rgba(41,63,81,0.05)",
    alignSelf: "center",
  },
  image: {
    width: 64,
    height: 64,
    resizeMode: "cover",
    backgroundColor: "blue",
    marginBottom: 16,
    alignSelf: "center",
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 14,
    color: "#293F51",
    fontWeight: "400",
    marginBottom: 8,
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: "#657D90",
    fontWeight: "400",
    opacity: 0.8,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    resizeMode: "cover",
    backgroundColor: "blue",
    marginRight: 8,
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
    // width: "100%",
    justifyContent: "flex-start",
    margin: 8,
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },

  dateContainer: {
    alignSelf: "flex-end",
    justifyContent: "space-between",
    // flexDirection: "row",
  },
  choiceContainer: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 8,
    alignSelf: "flex-end",
  },
  buttonSec: {
    alignItems: "center",
    // backgroundColor: "#293F51",
    height: 32,
    justifyContent: "center",
    color: "white",
    borderRadius: 4,
    width: 88,
    borderColor: "#293F51",
    borderWidth: 1,
    marginLeft: 8,
  },
  buttonPrim: {
    alignItems: "center",
    backgroundColor: "#293F51",
    height: 32,
    justifyContent: "center",
    color: "white",
    borderRadius: 4,
    width: 88,
    borderColor: "#293F51",
    borderWidth: 1,
    marginLeft: 8,
  },
  buttonText: {
    color: "white",
  },

  statusText: {
    alignSelf: "flex-end",
    color: "#293F51",
    fontWeight: "500",
  },

  textRejected: {
    color: "red",
    fontWeight: "500",
  },
  textAccepted: {
    color: "green",
  },
});
