import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { listingFetched } from "../store/listing/slice";

import { Listing } from "../typed";

export default function ListingCard<FC>(props: { listing: Listing }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.listing.image }} />
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
            source={{ uri: props.listing.user.image }}
          />
          <Text style={styles.description}>{props.listing.user.name}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 164,
    height: 264,
    borderRadius: 8,
    // shadowColor:"black",
    // shadowOpacity:0.2,
    // backgroundColor : "#0000",
    // shadowOffset: {
    //     width: 2,
    //     height: 2,
    // },
    margin: 8,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 164,
    height: 164,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: "cover",
    backgroundColor: "blue",
  },
  bottomContainer: {
    // flexDirection: "row"
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
