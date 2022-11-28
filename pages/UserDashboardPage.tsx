import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectMyRequest, selectUser } from "../store/user/selector";
import { MyRequests, UserType } from "../typed";
import ListingSmallCard from "../componants/ListingCard";

export const UserDashboardPage = () => {
  const dispatch = useAppDispatch();

  const myRequestData = useAppSelector(selectMyRequest);
  const userData: UserType = useAppSelector(selectUser);

  //   console.log("this is my requst data", myRequestData);

  return (
    <View>
      <Text>
        <View style={styles.userContainer}>
          <Image style={styles.avatarImage} source={{ uri: userData?.image }} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{userData?.name}</Text>
            <Text>
              {userData?.zip_code} {userData?.street_name}
            </Text>
            <Text style={styles.description}>
              {`Dear neighbours, I will need this item for couple of days, thank you`}
            </Text>
          </View>
        </View>
      </Text>
      <ScrollView>
        {!myRequestData ? (
          <Text>loading...</Text>
        ) : (
          myRequestData.map((req) => {
            return req.listings.map((listing) => (
              // <ListingSmallCard key={listing.id} listing={listing} />
              <View key={listing.id}>
                <Text>{req.id}</Text>
                <Text>{listing.title}</Text>
                <Image
                  style={styles.avatarImage}
                  source={{ uri: listing.user.image }}
                />
                <Image style={styles.image} source={{ uri: listing?.image }} />
                <Text>{listing.order?.status}</Text>
              </View>
            ));
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
  image: {
    width: 80,
    height: 80,
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
