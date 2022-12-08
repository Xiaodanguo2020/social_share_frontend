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
    <View>
      <Text>{props.request.user.name}</Text>
      <Image
        style={styles.avatarImage}
        source={{ uri: props.request.user.image }}
      />
      <Text>{props.request.title}</Text>
      <Text>{props.request.description}</Text>

      <Text style={styles.description}>
        start {moment(props.request.start_date).format("DD-MM-YY")}
      </Text>
      <Text style={styles.description}>
        end {moment(props.request.end_date).format("DD-MM-YY")}
      </Text>
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
    opacity: 0.8,
    marginBottom: 8,
  },
});
