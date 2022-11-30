import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
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

export const UserDashboardListingPage = () => {
  const dispatch = useAppDispatch();
  const myListingData = useAppSelector(selectMyListing);
  const userData: UserType = useAppSelector(selectUser);
  console.log("this is mylisting data", myListingData);

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
          <View style={styles.cardContainer}>
            <ListingSmallCard
              key={list.id}
              listing={{ ...list, user: userData }}
            />
            {list.requests.map((req) => (
              <View key={req.id} style={styles.requestContainer}>
                <Text style={styles.title}>{req.title}</Text>

                <View style={styles.userContainer}>
                  <Image
                    style={styles.avatarImage}
                    source={{ uri: req.user.image }}
                  />
                  <Text style={styles.description}>{req.user.name}</Text>
                </View>
                <Text style={styles.description}>{req.description}</Text>

                {/* <Text>{req.start_date?.toISOString()}</Text>
        <Text>{req.end_date?.toISOString()}</Text> */}
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
    padding: 8,
    paddingBottom: 16,
    width: "100%",
    margin: 8,
    // borderBottomWidth: 1,
    // borderBottomColor: "#657D90",
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
    fontSize: 16,
    color: "#293F51",
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: "#657D90",
    fontWeight: "500",
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
    width: "100%",
    justifyContent: "flex-start",
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});
