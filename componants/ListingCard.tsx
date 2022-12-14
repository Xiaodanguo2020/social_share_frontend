import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Listing } from "../typed";

export default function ListingCard<FC>(props: { listing: Listing }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.listing?.image }} />
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <Text numberOfLines={1} style={styles.title}>
            {props.listing.title}
          </Text>
          <Text numberOfLines={1} style={styles.description}>
            {props.listing.description}
          </Text>
        </View>
        <View style={styles.userContainer}>
          <Image
            style={styles.avatarImage}
            source={{ uri: props.listing?.user?.image }}
          />
          <Text style={styles.name}>{props.listing?.user?.name}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 164,
    height: 228,
    borderRadius: 8,
    backgroundColor: "white",
    margin: 8,
    shadowColor: "grey",
    shadowOpacity: 0.15,
    alignSelf: "center",
  },
  imageContainer: {},
  image: {
    width: 164,
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: "cover",
    backgroundColor: "blue",
  },
  bottomContainer: {
    marginTop: 8,
    padding: 8,
  },
  title: {
    fontSize: 14,
    color: "#293F51",
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#657D90",
    fontWeight: "400",
    opacity: 0.8,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    color: "#657D90",
    fontWeight: "400",
    marginBottom: 8,
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 99,
    resizeMode: "cover",
    backgroundColor: "blue",
    marginRight: 8,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
