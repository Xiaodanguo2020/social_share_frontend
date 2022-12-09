import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import { AntDesign } from "@expo/vector-icons";
import Avatar from './Avatar'
import { useAppSelector } from '../hooks'
import { selectUser } from '../store/user/selector'
import { UserType } from '../typed'
import MessageInput from './MessageInput';
import { socket } from '../socket/socket';
type Props = {
	user: UserType,
	visible: boolean,
	onClose: () => void
}

type Message = {
	message: string,
	senderId: number,
	receiverId: number,
	timestamp: Date,
}
export default function ChatModal({ visible, user, onClose }: Props) {

	const me = useAppSelector(selectUser)

	const [messages,setMessages] = useState<Message[]>([])

	useEffect(()=>{
		socket.on(`message_received`, (newMsg: Message)=> {
			if (newMsg.senderId === me.id || newMsg.senderId === user.id) {
				setMessages([...messages, newMsg])
			}
		})
		return () => {
			socket.off('message_received')
		}
	},[])



	return (
	<Modal
		visible={visible}
		onRequestClose={onClose}
	>
		<View style={styles.modalView}>
			<AntDesign
				style={styles.modalCloseIcon}
				name="close"
				size={24}
				color="black"
				onPress={onClose}
			/>
			<View style={styles.header}>
				<Avatar user={me}></Avatar>
				<Avatar user={user}></Avatar>
			</View>
			{messages.map((msg, index) => {
				return <Text key={index}>{msg.message}</Text>
			})}

			<MessageInput user={user}/>
		</View>
	</Modal>
	)
}

const styles = StyleSheet.create({
	header: {
		marginTop: 24,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	modalView: {
    padding: 24,
    backgroundColor: "white",
    borderRadius: 0,
    paddingTop: 48,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
	modalCloseIcon: {
    position: "absolute",
    right: 24,
    top: 40,
  },
})
