import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { Request } from "../typed/Listing";
import moment from "moment";

export default function RequestCard<FC>(props: { request: Request }) {
  return (
    <View style={styles.container}>
      <View style={styles.topInfoContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{props.request?.title}</Text>
          <Text style={styles.description}>{props.request?.description}</Text>
        </View>
        {!props.request.image ? (
          <Text></Text>
        ) : (
          <Image
            style={styles.imageContainer}
            source={{ uri: props.request?.image }}
          />
        )}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.userContainer}>
          <Image
            style={styles.avatarImage}
            source={{ uri: props.request?.user?.image }}
          />

          <Text>{props.request?.user?.name}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.description}>
            from {moment(props.request?.start_date).format("DD-MM-YY")}
          </Text>
          <Text style={styles.description}>
            to {moment(props.request?.end_date).format("DD-MM-YY")}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonSec}
          // color="black"
          // backgroundColor="#293F51"
        >
          <Text>I have it</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 99,
    resizeMode: "cover",
    backgroundColor: "blue",
    marginRight: 8,
  },
  description: {
    fontSize: 14,
    color: "#657D90",
    fontWeight: "400",
    opacity: 1,
  },
  title: {
    fontSize: 14,
    color: "#293F51",
    fontWeight: "600",
    marginBottom: 4,
    width: "64%",
  },

  container: {
    width: 340,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "white",
    margin: 8,
    shadowColor: "grey",
    shadowOpacity: 0.05,
  },

  infoContainer: {
    paddingBottom: 16,
    paddingTop: 8,
  },

  dateContainer: {
    alignSelf: "flex-end",
    justifyContent: "space-between",
    alignItems: "flex-end",
    // flexDirection: "row",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: 56,
    height: 56,
    resizeMode: "cover",

    // marginBottom: 16,
    alignItems: "flex-end",
  },

  topInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
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
});
