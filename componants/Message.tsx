import { View, Text, StyleSheet, Image } from 'react-native'
import { MessageType } from '../typed'
type Props = {
	message:MessageType,
	fromMe: boolean,
}
export default function Message({message, fromMe}: Props) {
	return (
		<View style={fromMe ? styles.containerFromMe: styles.container}>
			{fromMe ? null : <View style={styles.userContainer}>
      <Image style={styles.avatarImage} source={{ uri: message.user.image }} />
    </View>}
			<Text>{message.message}</Text>
		</View>
	)
}

const styles=StyleSheet.create({
	containerFromMe: {
		padding: 8,
		backgroundColor: "rgba(0, 221, 102, 0.2)",
		alignSelf: "flex-end",
		marginBottom: 16,

	},
	container: {
		padding: 8,
		backgroundColor: "rgba(0, 194, 243, 0.2)",
		alignSelf: "flex-start",
		marginBottom: 16,
		flexDirection:"row",
		alignItems: "center"
	},
	avatarImage: {
    width: 24,
    height: 24,
    borderRadius: 9999,
    resizeMode: "cover",
    backgroundColor: "blue",
  },
  userContainer: {
		flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
		marginRight: 8
  },
})
