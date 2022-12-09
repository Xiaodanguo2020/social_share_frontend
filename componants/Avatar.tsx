import { Image, Text, View, StyleSheet } from "react-native";

type UserType = {
  name: string;
  image: string;
};
export default function Avatar({ user }: { user: UserType }) {
  if (!user) return <></>;
  return (
    <View style={styles.userContainer}>
      <Image style={styles.avatarImage} source={{ uri: user.image }} />
      <Text style={styles.name}>{user.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
		marginLeft: 8,
  },
  userContainer: {
		flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    padding: 16,
  },
});
