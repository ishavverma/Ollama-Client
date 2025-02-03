import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { ServerContext } from '../App';

const ChatScreen = ({ route }) => {
  const { server } = useContext(ServerContext);
  const { model } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: 'user', content: input };
    // Append the user's message to the chat
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInput('');

    try {
      const response = await fetch(`http://${server}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages: [...messages, newMessage],
          stream: false, // Non-streaming response
        }),
      });

      const data = await response.json();
      // Check if the API returned a valid message from the assistant
      if (data.message && data.message.content) {
        setMessages(prevMessages => [
          ...prevMessages,
          { role: 'assistant', content: data.message.content },
        ]);
      } else {
        console.error('Unexpected API response:', data);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[
            styles.messageContainer,
            item.role === 'user' ? styles.userMessageContainer : styles.aiMessageContainer,
          ]}>
            <Text
              style={[
                styles.message,
                item.role === 'user' ? styles.userMessage : styles.aiMessage,
              ]}
            >
              {item.content}
            </Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type a message..."
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 25,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  aiMessageContainer: {
    justifyContent: 'flex-start',
  },
  message: {
    padding: 15,
    borderRadius: 20,
    maxWidth: '75%',
    fontSize: 16,
  },
  userMessage: {
    backgroundColor: '#007aff',
    color: '#fff',
    borderBottomRightRadius: 0,
  },
  aiMessage: {
    backgroundColor: '#e5e5ea',
    color: '#000',
    borderBottomLeftRadius: 0,
  },
});

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <Text
//             style={[
//               styles.message,
//               item.role === 'user' ? styles.userMessage : styles.aiMessage,
//             ]}
//           >
//             {item.content}
//           </Text>
//         )}
//       />
//       <TextInput
//         style={styles.input}
//         value={input}
//         onChangeText={setInput}
//         placeholder="Type a message..."
//       />
//       <Button title="Send" onPress={sendMessage} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   input: {
//     borderWidth: 1,
//     padding: 10,
//     marginVertical: 10,
//     borderRadius: 8,
//   },
//   message: {
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 8,
//     maxWidth: '80%',
//   },
//   userMessage: { backgroundColor: '#cce5ff', alignSelf: 'flex-end' },
//   aiMessage: { backgroundColor: '#f1f1f1', alignSelf: 'flex-start' },
// });



export default ChatScreen;
