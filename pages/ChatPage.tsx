import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Avatar from '../componants/Avatar'
import { useAppSelector } from '../hooks'
import { selectUser } from '../store/user/selector'
import { ChatPageProps, MessageType } from '../typed'
import MessageInput from '../componants/MessageInput';
import { socket } from '../socket/socket';
import Message from '../componants/Message'

export default function ChatPage({route}: ChatPageProps) {
	const user = route.params?.user || {}
	const me = useAppSelector(selectUser)

	const [messages,setMessages] = useState<MessageType[]>([])

	useEffect(()=>{
		socket.on(`message_received`, (newMsg: MessageType)=> {
			console.log('message_received')
				setMessages((prev) => [...prev, newMsg])
		})
		return () => {
			socket.off('message_received')
		}
	},[])

	return (
		<View style={styles.modalView}>
			<View style={styles.header}>
				<Avatar user={me}></Avatar>
			</View>
			<View style={styles.messagesContainer}>
				{messages.map((msg, index) => {
					return <Message key={index} message={msg} fromMe={msg.user.id === me.id}/>
				})}
			</View>

			<MessageInput user={user}/>
		</View>)
}

const styles = StyleSheet.create({
	header: {
		marginTop: 24,
		width: "100%",
		flexDirection: "row",
		justifyContent: "flex-end"
	},
	messagesContainer: {
		width: "100%"
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
