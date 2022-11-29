import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  selectMyListing,
  selectMyRequest,
  selectUser,
} from "../store/user/selector";
import { EnrichedRequest, UserType } from "../typed";
import ListingSmallCard from "../componants/ListingSmallCard";

export const UserDashboardReqPage = () => {
  const dispatch = useAppDispatch();

  const myRequestData: EnrichedRequest[] = useAppSelector(selectMyRequest);
  const myListingData = useAppSelector(selectMyListing);
  const userData: UserType = useAppSelector(selectUser);

  console.log("this is mylisting data", myListingData);

  return (
    <View>
      <Text style={styles.title}>Welcome to your dashboard</Text>
      <View>
        <View style={styles.userContainer}>
          <Image style={styles.avatarImage} source={{ uri: userData?.image }} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{userData?.name}</Text>
            <Text>
              {userData?.zip_code} {userData?.street_name}
            </Text>
            <Text style={styles.description}></Text>
          </View>
        </View>
      </View>
      <ScrollView>
        {!myRequestData ? (
          <Text>loading...</Text>
        ) : (
          myRequestData.map((req) => {
            return (
              <View style={styles.cardContainer}>
                <Text style={styles.title}>{req.title}</Text>
                {/* <Text>{req.start_date?.toISOString()}</Text>
                <Text>{req.end_date?.toISOString()}</Text> */}
                <Text>{req.description}</Text>
                {req?.listings?.map((listing) => (
                  <ListingSmallCard key={listing.id} listing={listing} />
                ))}
              </View>
            );

            // if (req.listings) {
            //   return <Text>{req?.listing.listing.user.name}</Text>;
            // } else return <Text>loading list data...</Text>;
          })
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    margin: 16,
  },
  container: {
    padding: 16,
    width: "100%",
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
    fontSize: 18,
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
});
