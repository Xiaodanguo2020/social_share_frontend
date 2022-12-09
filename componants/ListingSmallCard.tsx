import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { Listing } from "../typed";

export default function ListingSmallCard<FC>(props: { listing: Listing }) {
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
        <View style={styles.oneContainer}>
          <View style={styles.userContainer}>
            <Image
              style={styles.avatarImage}
              source={{ uri: props.listing?.user?.image }}
            />
            <Text style={styles.description}>{props.listing?.user?.name}</Text>
          </View>
          <Text numberOfLines={1} style={styles.title}>
            {props.listing.order?.status}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: 310,
    height: 120,
    borderRadius: 8,
    padding: 8,

    flexDirection: "row",
    alignItems: "center",
    shadowColor: "grey",
    shadowOpacity: 0.15,
    // backgroundColor: "rgba(41,63,81,0.05)",
    backgroundColor: "white",
    // shadowOffset: {
    //     width: 2,
    //     height: 2,
    // },
    // margin: 4,
  },
  imageContainer: {
    // flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    // borderRadius: 8,
    resizeMode: "cover",
    backgroundColor: "blue",
  },
  bottomContainer: {
    padding: 16,
    width: "100%",
    // flexDirection: "row"
  },
  title: {
    fontSize: 14,
    color: "#293F51",
    fontWeight: "600",
    marginBottom: 4,
    width: "64%",
  },
  description: {
    fontSize: 14,
    color: "#657D90",
    fontWeight: "400",
    opacity: 0.8,
    marginBottom: 8,
    width: "64%",
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

  oneContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 140,
    justifyContent: "flex-start",
  },
});
