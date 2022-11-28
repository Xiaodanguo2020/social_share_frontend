import { Image, Text, View, StyleSheet } from "react-native";

type UserType = {
  name: string;
  zip_code: string;
  street_name: string;
  image: string;
};
export default function UserInfo({ user }: { user: UserType }) {
  if (!user) return <></>;
  return (
    <View style={styles.userContainer}>
      <Image style={styles.avatarImage} source={{ uri: user.image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user.name}</Text>
        <Text>
          {user.zip_code} {user.street_name}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarImage: {
    alignSelf: "flex-start",
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
