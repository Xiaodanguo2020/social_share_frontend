import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { useAppSelector } from '../hooks';
import { selectUser } from '../store/user/selector';
import { socket } from '../socket/socket';
import { UserType } from '../typed';

type Props = {
	user: UserType
}

const MessageInput = ({ user } : Props) => {
	const me = useAppSelector(selectUser)
	const [message, setMessage] = useState("")
	return (
		<View style={styles.container}>

			<TextInput
				style={styles.input}
				value={message}
				onChangeText={setMessage}
			/>
			<TouchableOpacity
				onPress={() => {
					socket.emit("send_message", {
						message,
						senderId: me.id,
						receiverId: user.id,
						timestamp: new Date(),
						user: me
					})
					setMessage("")
				}}
			>
				<FontAwesome style={styles.icon} name="send-o" size={24} color="black" />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	input: {
    backgroundColor: "rgba(41,63,81,0.1)",
    height: 40,
    borderRadius: 999,
    marginBottom: 16,
    width: "60%",
  },
	icon: {
		marginBottom:16,
		marginLeft: 16,
	}
})

export default MessageInput
